package entity


type PandectData struct {
	BaseData
	Data    []struct {
		DateKey  int `json:"date_key"`
		TotalInc int `json:"total_inc"`
	} `json:"data"`
}
