package api

import (
	"github.com/rayanebel/kubeseal-manager/third_party/kube"
)

type APIManager struct {
	Config Config
}

type Config struct {
	KubernetesClient *kube.KubernetesClient
	AllNamespaces    bool
	Namespaces       []string
}
