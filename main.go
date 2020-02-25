package main

import (
	"net/http"
	"os"
	"path/filepath"
	"time"

	"github.com/gorilla/mux"

	internalapi "github.com/rayanebel/kubeseal-manager/pkg/api/handlers"
	"github.com/rayanebel/kubeseal-manager/third_party/kube"
	log "github.com/sirupsen/logrus"
	flag "github.com/spf13/pflag"
)

var (
	kubeconfigPath = flag.String("kubeconfig", "", "Path for kubeconfig")
	incluster      = flag.Bool("incluster", true, "Running API in kubernetes cluster or in local")
	allNamespaces  = flag.Bool("all-namespaces", true, "fetch in all namespaces")
	namespaces     = flag.StringSlice("namespaces", []string{}, "list of namespaces")
)

func homeDir() string {
	if h := os.Getenv("HOME"); h != "" {
		return h
	}
	return os.Getenv("USERPROFILE") // windows
}

func GetDefaultKubeconfigPath() string {
	homePath := homeDir()
	return filepath.Join(homePath, ".kube", "config")
}

func main() {

	r := mux.NewRouter().StrictSlash(false)

	api := r.PathPrefix("/api").Subrouter()

	apiManager := &internalapi.APIManager{
		Config: internalapi.Config{},
	}

	if !*incluster {
		if *kubeconfigPath == "" {
			*kubeconfigPath = GetDefaultKubeconfigPath()
		}
		client, err := kube.NewClient(false, *kubeconfigPath)
		if err != nil {
			log.WithFields(log.Fields{"message": err.Error, "inCluster": incluster}).Fatal("Unable to init kubernetes client")
		}
		apiManager.Config.KubernetesClient = client
	} else {
		client, err := kube.NewClient(true, "")
		if err != nil {
			log.WithFields(log.Fields{"message": err.Error, "inCluster": incluster}).Fatal("Unable to init kubernetes client")
		}
		apiManager.Config.KubernetesClient = client
	}

	if *allNamespaces {
		apiManager.Config.AllNamespaces = *allNamespaces
		apiManager.Config.Namespaces = nil
	} else {
		apiManager.Config.Namespaces = *namespaces
	}

	api.HandleFunc("/controllers", apiManager.GetControllers).Methods("GET")
	api.HandleFunc("/seal", apiManager.Seal).Methods("POST")

	srv := &http.Server{
		Handler:      r,
		Addr:         "0.0.0.0:8000",
		WriteTimeout: 5 * time.Second,
		ReadTimeout:  10 * time.Second,
	}

	log.WithFields(log.Fields{"port": 8000}).Info("Starting HTTP server")
	log.Fatal(srv.ListenAndServe())
	log.WithFields(log.Fields{"port": 8000}).Info("HTTP server is running")
}

func init() {
	log.SetFormatter(&log.JSONFormatter{})
	flag.Parse()
}
