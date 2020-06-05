package entity

type PlayAnalysisData struct {
	BaseData
	Data    struct {
		ArcPlayList []struct {
			Aid         int    `json:"aid"`
			Bvid        string `json:"bvid"`
			View        int    `json:"view"`
			Rate        int    `json:"rate"`
			Ctime       int    `json:"ctime"`
			Duration    int    `json:"duration"`
			AvgDuration int    `json:"avg_duration"`
			Title       string `json:"title"`
		} `json:"arc_play_list"`
	} `json:"data"`
}
