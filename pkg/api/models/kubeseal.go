package models

// Controllers is a collection of multiple controller
type Controllers struct {
	Controllers map[string][]ControllerService `json:"controllers"`
}

type ControllerService struct {
	Name               string                  `json:"name"`
	ServiceInternalURL string                  `json:"service_url"`
	Namespace          string                  `json:"namespace"`
	Status             bool                    `json:"status"`
	Applications       []ControllerApplication `json:"application"`
}

type ControllerApplication struct {
	Name      string `json:"name"`
	Namespace string `json:"namespace"`
	//Status    bool   `json:"status"`
}
