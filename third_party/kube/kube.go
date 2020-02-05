package kube

import (
	log "github.com/sirupsen/logrus"
	v1 "k8s.io/api/core/v1"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/client-go/kubernetes"
	"k8s.io/client-go/rest"
	"k8s.io/client-go/tools/clientcmd"
)

func NewClient(inCluster bool, kubeconfig string) (*KubernetesClient, error) {
	if !inCluster {
		log.WithFields(log.Fields{
			"kubeconfig": kubeconfig,
		}).Info("Init kubernetes external client")
		client, err := newExternalClient(kubeconfig)
		if err != nil {
			return nil, err
		}
		return client, nil
	}

	log.WithFields(log.Fields{
		"kubeconfig": kubeconfig,
	}).Info("Init kubernetes internal client")
	client, err := newInternalClient()
	if err != nil {
		return nil, err
	}

	return client, nil
}

func newInternalClient() (*KubernetesClient, error) {
	config, err := rest.InClusterConfig()
	if err != nil {
		return nil, err
	}

	clientset, err := kubernetes.NewForConfig(config)
	if err != nil {
		return nil, err
	}

	return &KubernetesClient{Client: clientset}, nil
}

func newExternalClient(kubeconfig string) (*KubernetesClient, error) {
	config, err := clientcmd.BuildConfigFromFlags("", kubeconfig)
	if err != nil {
		return nil, err
	}

	clientset, err := kubernetes.NewForConfig(config)
	if err != nil {
		return nil, err
	}

	return &KubernetesClient{Client: clientset}, nil
}

func (m *KubernetesClient) GetServices(opts metav1.ListOptions, namespace string) (*v1.ServiceList, error) {
	services, err := m.Client.CoreV1().Services(namespace).List(opts)
	if err != nil {
		return nil, err
	}
	return services, nil
}

func (m *KubernetesClient) GetEndpoint(serviceName, namespace string) (*v1.Endpoints, error) {
	endpoint, err := m.Client.CoreV1().Endpoints(namespace).Get(serviceName, metav1.GetOptions{})
	if err != nil {
		return nil, err
	}
	return endpoint, nil
}

func (m *KubernetesClient) GetPods() {
	return
}

func init() {
	log.SetFormatter(&log.JSONFormatter{})
}
