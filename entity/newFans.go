package entity

type NewFansData struct {
	BaseData
	Data    struct {
		RelationFansDay struct {
			Follow map[string]int `json:"follow"`
			Unfollow map[string]int `json:"unfollow"`
		} `json:"relation_fans_day"`
		RelationFansHistory interface{} `json:"relation_fans_history"`
		RelationFansMonth   struct {
			Follow map[string]int `json:"follow"`
			Unfollow map[string]int `json:"unfollow"`
		} `json:"relation_fans_month"`
	} `json:"data"`
}