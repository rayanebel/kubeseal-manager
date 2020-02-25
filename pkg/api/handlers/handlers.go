package api

import (
	"encoding/json"
	"fmt"
	"net/http"
	"sync"

	"github.com/rayanebel/kubeseal-manager/pkg/api/models"
	"github.com/rayanebel/kubeseal-manager/pkg/kubeseal"
	"github.com/rayanebel/kubeseal-manager/third_party/kube"
	log "github.com/sirupsen/logrus"
	v1 "k8s.io/api/core/v1"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
)

const kubesealLabel = "app.kubernetes.io/name=kubeseal"

func (api *APIManager) GetControllers(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Connection", "close")
	defer r.Body.Close()

	serviceList := &models.Controllers{}
	serviceList.Controllers = []models.ControllerCollection{}

	if !api.Config.AllNamespaces {
		getControllerRestrictedNamespaced(api.Config.KubernetesClient, serviceList, api.Config.Namespaces)
	} else {
		getControllerAllNamespaces(api.Config.KubernetesClient, serviceList)
	}

	payload, err := json.Marshal(serviceList)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.WriteHeader(http.StatusOK)
	w.Write(payload)
}

func (api *APIManager) Seal(w http.ResponseWriter, r *http.Request) {
	r.ParseForm()
	fmt.Println(r.Form)
	secret := r.FormValue("secret")
	controllerName := r.FormValue("controller-name")
	controllerNamespace := r.FormValue("controller-namespace")
	controllerOutput := r.FormValue("controller-output")

	if controllerName == "" {
		controllerName = "kubeseal-controller"
	}

	if controllerNamespace == "" {
		controllerNamespace = "default"
	}

	if controllerOutput == "" {
		controllerOutput = "yaml"
	}

	cmd := kubeseal.NewCmd()
	cmd.Args.ControllerName = controllerName
	cmd.Args.ControllerNamespace = controllerNamespace
	cmd.Args.OutputFormat = controllerOutput

	ssecret, err := cmd.Seal(secret)
	if err != nil {
		log.WithFields(log.Fields{
			"message": err.Error(),
		}).Error("Error something went wrong")
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
	w.Write(ssecret)
}

func getControllerAllNamespaces(k8sclient *kube.KubernetesClient, serviceList *models.Controllers) {
	services, err := k8sclient.GetServices(metav1.ListOptions{LabelSelector: kubesealLabel}, "")
	if err != nil {
		log.WithFields(log.Fields{
			"message": err,
		}).Error("Unable to fetch services")
		serviceList = nil
		return
	}

	controllersByNamespace := make(map[string][]models.ControllerService)

	for _, s := range services.Items {
		service := models.ControllerService{}
		service.Namespace = s.Namespace
		service.Name = s.Name
		service.Status = "running"

		if !controllerServiceIsHealthy(k8sclient, s.Name, s.Namespace) {
			service.Status = "failed"
		}
		service.ServiceInternalURL = fmt.Sprintf("%s.%s.svc.cluster.local", s.Name, s.Namespace)

		serviceEndpoints := getControllerFromService(k8sclient, s.Name, s.Namespace)
		for _, subset := range serviceEndpoints {
			for _, address := range subset.Addresses {
				if address.TargetRef == nil {
					continue
				}
				app := models.ControllerApplication{}
				app.Name = address.TargetRef.Name
				app.Namespace = address.TargetRef.Namespace
				service.Applications = append(service.Applications, app)
			}
		}
		controllersByNamespace[s.Namespace] = append(controllersByNamespace[s.Namespace], service)
	}
	for namespace, controller := range controllersByNamespace {
		collection := models.ControllerCollection{}
		collection.Namespace = namespace
		collection.Controllers = controller
		serviceList.Controllers = append(serviceList.Controllers, collection)
	}
}

func getControllerRestrictedNamespaced(k8sclient *kube.KubernetesClient, serviceList *models.Controllers, namespaces []string) {
	var wg sync.WaitGroup
	serviceChannel := make(chan models.ControllerCollection)
	errorChannel := make(chan string)
	notification := make(chan struct{})
	done := make(chan struct{})

	defer close(notification)
	defer close(serviceChannel)
	defer close(errorChannel)

	go func() {
		for {
			select {
			case serviceCollection := <-serviceChannel:
				serviceList.Controllers = append(serviceList.Controllers, serviceCollection)
			case err := <-errorChannel:
				log.WithFields(log.Fields{
					"message": err,
				}).Error("Error something went wrong")
				wg.Done()
			case <-notification:
				done <- struct{}{}
				close(done)
				return
			}
		}
	}()

	for _, ns := range namespaces {
		log.WithFields(log.Fields{
			"namespace": ns,
		}).Info("Processing namespace")

		wg.Add(1)
		go func(namespace string) {
			services, err := k8sclient.GetServices(metav1.ListOptions{LabelSelector: kubesealLabel}, namespace)
			controllerCollection := models.ControllerCollection{}
			controllerCollection.Namespace = namespace
			controllerCollection.Controllers = []models.ControllerService{}

			if err != nil {
				errorChannel <- err.Error()
				return
			}

			for _, s := range services.Items {
				service := models.ControllerService{}
				service.Namespace = s.Namespace
				service.Name = s.Name

				service.Status = "running"
				if !controllerServiceIsHealthy(k8sclient, s.Name, s.Namespace) {
					service.Status = "failed"
				}
				service.ServiceInternalURL = fmt.Sprintf("%s.%s.svc.cluster.local", s.Name, s.Namespace)

				serviceEndpoints := getControllerFromService(k8sclient, s.Name, s.Namespace)
				for _, subset := range serviceEndpoints {
					for _, address := range subset.Addresses {
						if address.TargetRef == nil {
							continue
						}
						app := models.ControllerApplication{}
						app.Name = address.TargetRef.Name
						app.Namespace = address.TargetRef.Namespace
						service.Applications = append(service.Applications, app)
					}
				}
				controllerCollection.Controllers = append(controllerCollection.Controllers, service)
			}
			serviceChannel <- controllerCollection
			wg.Done()
		}(ns)
	}
	// Wait for all jobs to finish
	wg.Wait()
	notification <- struct{}{}
	<-done
}

func controllerServiceIsHealthy(k8sclient *kube.KubernetesClient, serviceName string, namespace string) bool {
	endpoint, err := k8sclient.GetEndpoint(serviceName, namespace)
	if err != nil {
		return false
	}
	if len(endpoint.Subsets) == 0 {
		return false
	}
	return true
}

func getControllerFromService(k8sclient *kube.KubernetesClient, serviceName string, namespace string) []v1.EndpointSubset {
	endpoint, err := k8sclient.GetEndpoint(serviceName, namespace)
	if err != nil {
		return nil
	}
	if len(endpoint.Subsets) == 0 {
		return nil
	}
	return endpoint.Subsets
}

func init() {
	log.SetFormatter(&log.JSONFormatter{})
}
