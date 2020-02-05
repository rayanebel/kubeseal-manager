package kube

import (
	"k8s.io/client-go/kubernetes"
)

type KubernetesClient struct {
	Client *kubernetes.Clientset
}
