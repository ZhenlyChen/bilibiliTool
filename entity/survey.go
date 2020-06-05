package entity

type SurveyData struct {
	BaseData
	Data map[string]struct {
		ArcInc []struct {
			Aid         int    `json:"aid"`
			Bvid        string `json:"bvid"`
			Incr        int    `json:"incr"`
			Title       string `json:"title"`
			Daytime     int    `json:"daytime"`
			Ptime       int    `json:"ptime"`
			Interactive int    `json:"interactive"`
		} `json:"arc_inc"`
		TotalInc int `json:"total_inc"`
		TypeRank map[string]int `json:"type_rank"`
	} `json:"data"`
}
