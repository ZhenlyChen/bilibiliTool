package entity

type TrendData struct {
	BaseData
	Data    struct {
		Fan struct {
			Tag map[int]string `json:"tag"`
			Ty  map[string]int `json:"ty"`
		} `json:"fan"`
		NotFan struct {
			Tag map[int]string `json:"tag"`
			Ty map[string]int `json:"ty"`
		} `json:"not_fan"`
	} `json:"data"`
}
