package entity

// 用户状态信息
type StatData struct {
	BaseData
	Data    struct {
		Time int64 `json:"time"`
		FanRecentThirty struct {
			Follow   map[string]int `json:"follow"`
			Unfollow map[string]int `json:"unfollow"`
		} `json:"fan_recent_thirty"`
		IncCoin    int `json:"inc_coin"`
		IncElec    int `json:"inc_elec"`
		IncFav     int `json:"inc_fav"`
		IncLike    int `json:"inc_like"`
		IncShare   int `json:"inc_share"`
		IncrClick  int `json:"incr_click"`
		IncrDm     int `json:"incr_dm"`
		IncrFans   int `json:"incr_fans"`
		IncrReply  int `json:"incr_reply"`
		TotalClick int `json:"total_click"`
		TotalCoin  int `json:"total_coin"`
		TotalDm    int `json:"total_dm"`
		TotalElec  int `json:"total_elec"`
		TotalFans  int `json:"total_fans"`
		TotalFav   int `json:"total_fav"`
		TotalLike  int `json:"total_like"`
		TotalReply int `json:"total_reply"`
		TotalShare int `json:"total_share"`
	} `json:"data"`
}
