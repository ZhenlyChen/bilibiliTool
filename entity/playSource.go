package entity

type PlaySourceData struct {
	BaseData
	Data    struct {
		PlayProportion struct {
			Android int `json:"android"`
			H5      int `json:"h5"`
			Ios     int `json:"ios"`
			Out     int `json:"out"`
			Pc      int `json:"pc"`
		} `json:"play_proportion"`
		PageSource struct {
			Dynamic      int `json:"dynamic"`
			Other        int `json:"other"`
			RelatedVideo int `json:"related_video"`
			Search       int `json:"search"`
			Space        int `json:"space"`
			Tenma        int `json:"tenma"`
		} `json:"page_source"`
	} `json:"data"`
}