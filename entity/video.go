package entity

type VideosData struct {
	BaseData
	Data    struct {
		Archive struct {
			Aid   int    `json:"aid"`
			Bvid  string `json:"bvid"`
			Title string `json:"title"`
		} `json:"archive"`
		Videos []struct {
			Cid      int    `json:"cid"`
			Index    int    `json:"index"`
			Title    string `json:"title"`
			Duration int    `json:"duration"`
		} `json:"videos"`
	} `json:"data"`
}
