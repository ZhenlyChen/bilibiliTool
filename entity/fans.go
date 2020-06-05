package entity

type FansData struct {
	BaseData
	Data    struct {
		Summary struct {
			ActDiff    int `json:"act_diff"`
			Active     int `json:"active"`
			C          int `json:"c"`
			Co         int `json:"co"`
			Da         int `json:"da"`
			Dm         int `json:"dm"`
			Elec       int `json:"elec"`
			ElecDiff   int `json:"elec_diff"`
			Fv         int `json:"fv"`
			Inc        int `json:"inc"`
			Inter      int `json:"inter"`
			LiveCoin   int `json:"live_coin"`
			LiveDm     int `json:"live_dm"`
			Lk         int `json:"lk"`
			MdlDiff    int `json:"mdl_diff"`
			Medal      int `json:"medal"`
			NewAct     int `json:"new_act"`
			NewActDiff int `json:"new_act_diff"`
			NewCo      int `json:"new_co"`
			NewDa      int `json:"new_da"`
			NewFv      int `json:"new_fv"`
			NewInter   int `json:"new_inter"`
			NewLk      int `json:"new_lk"`
			NewRe      int `json:"new_re"`
			NewSh      int `json:"new_sh"`
			R          int `json:"r"`
			Re         int `json:"re"`
			Sh         int `json:"sh"`
			Total      int `json:"total"`
			V          int `json:"v"`
			Vv         int `json:"vv"`
		} `json:"summary"`
		RankList struct {
			DynamicAct []struct {
				Mid         int    `json:"mid"`
				Uname       string `json:"uname"`
				Photo       string `json:"photo"`
				Relation    int    `json:"relation"`
				ReceiveDate int    `json:"receive_date"`
			} `json:"dynamic_act"`
			VideoAct []struct {
				Mid         int    `json:"mid"`
				Uname       string `json:"uname"`
				Photo       string `json:"photo"`
				Relation    int    `json:"relation"`
				ReceiveDate int    `json:"receive_date"`
			} `json:"video_act"`
			VideoPlay []struct {
				Mid         int    `json:"mid"`
				Uname       string `json:"uname"`
				Photo       string `json:"photo"`
				Relation    int    `json:"relation"`
				ReceiveDate int    `json:"receive_date"`
			} `json:"video_play"`
		} `json:"rank_list"`
		RankMedal struct {
			Medal interface{} `json:"medal"`
		} `json:"rank_medal"`
		Source struct {
			Article   int `json:"article"`
			Audio     int `json:"audio"`
			Live      int `json:"live"`
			Main      int `json:"main"`
			MainOther int `json:"main_other"`
			Other     int `json:"other"`
			Space     int `json:"space"`
		} `json:"source"`
	} `json:"data"`
}