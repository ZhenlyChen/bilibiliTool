package entity

type ArchiveData struct {
	BaseData
	Data    struct {
		Stat struct {
			Play  int `json:"play"`
			Dm    int `json:"dm"`
			Reply int `json:"reply"`
			Like  int `json:"like"`
			Coin  int `json:"coin"`
			Elec  int `json:"elec"`
			Fav   int `json:"fav"`
			Share int `json:"share"`
		} `json:"stat"`
		Source struct {
			Mainsite int `json:"mainsite"`
			Outsite  int `json:"outsite"`
			Mobile   int `json:"mobile"`
			Others   int `json:"others"`
		} `json:"source"`
		Group struct {
			Fans  int `json:"fans"`
			Guest int `json:"guest"`
		} `json:"group"`
		Play struct {
			Aid         int    `json:"aid"`
			Bvid        string `json:"bvid"`
			View        int    `json:"view"`
			Rate        int    `json:"rate"`
			Ctime       int    `json:"ctime"`
			Duration    int    `json:"duration"`
			AvgDuration int    `json:"avg_duration"`
			Title       string `json:"title"`
		} `json:"play"`
		Area []struct {
			Location string `json:"location"`
			Count    int    `json:"count"`
		} `json:"area"`
	} `json:"data"`
}

type ArchivesData struct {
	BaseData
	Data    struct {
		Class struct {
			Pubed    int `json:"pubed"`
			NotPubed int `json:"not_pubed"`
			IsPubing int `json:"is_pubing"`
		} `json:"class"`
		ApplyCount struct {
			Neglected int `json:"neglected"`
			Pending   int `json:"pending"`
			Processed int `json:"processed"`
		} `json:"apply_count"`
		Type []struct {
			Tid   int    `json:"tid"`
			Name  string `json:"name"`
			Count int    `json:"count"`
		} `json:"type"`
		Archives  interface{} `json:"archives"`
		ArcAudits []struct {
			Archive struct {
				Aid          int    `json:"aid"`
				Bvid         string `json:"bvid"`
				Mid          int    `json:"mid"`
				Tid          int    `json:"tid"`
				Title        string `json:"title"`
				Author       string `json:"author"`
				Cover        string `json:"cover"`
				RejectReason string `json:"reject_reason"`
				Tag          string `json:"tag"`
				Duration     int    `json:"duration"`
				Copyright    int    `json:"copyright"`
				NoReprint    int    `json:"no_reprint"`
				Ugcpay       int    `json:"ugcpay"`
				OrderID      int    `json:"order_id"`
				OrderName    string `json:"order_name"`
				AdorderID    int    `json:"adorder_id"`
				AdorderName  string `json:"adorder_name"`
				Desc         string `json:"desc"`
				MissionID    int    `json:"mission_id"`
				MissionName  string `json:"mission_name"`
				Attribute    int    `json:"attribute"`
				State        int    `json:"state"`
				StateDesc    string `json:"state_desc"`
				StatePanel   int    `json:"state_panel"`
				Source       string `json:"source"`
				DescFormatID int    `json:"desc_format_id"`
				Attrs        struct {
					IsCoop    int `json:"is_coop"`
					IsOwner   int `json:"is_owner"`
					IsDynamic int `json:"is_dynamic"`
					NoPublic  int `json:"no_public"`
				} `json:"attrs"`
				Porder       interface{} `json:"porder"`
				Dynamic      string      `json:"dynamic"`
				PoiObject    interface{} `json:"poi_object"`
				Dtime        int         `json:"dtime"`
				Ptime        int         `json:"ptime"`
				Ctime        int         `json:"ctime"`
				UgcpayInfo   interface{} `json:"ugcpay_info"`
				Staffs       interface{} `json:"staffs"`
				Vote         interface{} `json:"vote"`
				Activity     interface{} `json:"activity"`
				Interactive  int         `json:"interactive"`
				Hl           interface{} `json:"hl"`
				NoBackground int         `json:"no_background"`
				DynamicVideo int         `json:"dynamic_video"`
				NoPublic     int         `json:"no_public"`
				BsEditor     int         `json:"bs_editor"`
			} `json:"Archive"`
			Videos []interface{} `json:"Videos"`
			Stat   struct {
				Aid      int `json:"aid"`
				View     int `json:"view"`
				Danmaku  int `json:"danmaku"`
				Reply    int `json:"reply"`
				Favorite int `json:"favorite"`
				Coin     int `json:"coin"`
				Share    int `json:"share"`
				NowRank  int `json:"now_rank"`
				HisRank  int `json:"his_rank"`
				Like     int `json:"like"`
				Dislike  int `json:"dislike"`
			} `json:"stat"`
			StatePanel  int           `json:"state_panel"`
			ParentTname string        `json:"parent_tname"`
			Typename    string        `json:"typename"`
			OpenAppeal  int           `json:"open_appeal"`
			Activity    interface{}   `json:"activity"`
			AppRules    interface{}   `json:"app_rules"`
			Hl          interface{}   `json:"hl"`
			Honors      interface{}   `json:"honors"`
			BsEditor    []interface{} `json:"bs_editor"`
		} `json:"arc_audits"`
		Page struct {
			Pn    int `json:"pn"`
			Ps    int `json:"ps"`
			Count int `json:"count"`
		} `json:"page"`
		Tip          string      `json:"tip"`
		InteractTest bool        `json:"interact_test"`
		RichTip      interface{} `json:"rich_tip"`
	} `json:"data"`
}