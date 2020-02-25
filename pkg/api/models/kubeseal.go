package models

// Controllers is a collection of multiple controller

type Controllers struct {
	Controllers []ControllerCollection `json:"controllers"`
}

type ControllerCollection struct {
	Namespace string `json:"namespace"`
	Controllers []ControllerService `json:"items"`
}

type ControllerService struct {
	Name               string                  `json:"name"`
	ServiceInternalURL string                  `json:"service_url"`
	Namespace          string                  `json:"namespace"`
	Status             string                  `json:"status"`
	Applications       []ControllerApplication `json:"application"`
}

type ControllerApplication struct {
	Name      string `json:"name"`
	Namespace string `json:"namespace"`
}
