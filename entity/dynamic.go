package entity

type DynamicData struct {
	UID         int   `json:"uid"`
	Type        int   `json:"type"`
	Rid         int   `json:"rid"`
	ACL         int   `json:"acl"`
	View        int   `json:"view"`
	Repost      int   `json:"repost"`
	Comment     int   `json:"comment"`
	Like        int   `json:"like"`
	IsLiked     int   `json:"is_liked"`
	DynamicID   int64 `json:"dynamic_id"`
	Timestamp   int   `json:"timestamp"`
	PreDyID     int   `json:"pre_dy_id"`
	OrigDyID    int   `json:"orig_dy_id"`
	OrigType    int   `json:"orig_type"`
	UserProfile struct {
		Info struct {
			UID   int    `json:"uid"`
			Uname string `json:"uname"`
			Face  string `json:"face"`
		} `json:"info"`
		Card struct {
			OfficialVerify struct {
				Type int    `json:"type"`
				Desc string `json:"desc"`
			} `json:"official_verify"`
		} `json:"card"`
		Vip struct {
			VipType       int    `json:"vipType"`
			VipDueDate    int64  `json:"vipDueDate"`
			DueRemark     string `json:"dueRemark"`
			AccessStatus  int    `json:"accessStatus"`
			VipStatus     int    `json:"vipStatus"`
			VipStatusWarn string `json:"vipStatusWarn"`
			ThemeType     int    `json:"themeType"`
			Label         struct {
				Path string `json:"path"`
			} `json:"label"`
		} `json:"vip"`
		Pendant struct {
			Pid          int    `json:"pid"`
			Name         string `json:"name"`
			Image        string `json:"image"`
			Expire       int    `json:"expire"`
			ImageEnhance string `json:"image_enhance"`
		} `json:"pendant"`
		DecorateCard struct {
			Mid          int    `json:"mid"`
			ID           int    `json:"id"`
			CardURL      string `json:"card_url"`
			CardType     int    `json:"card_type"`
			Name         string `json:"name"`
			ExpireTime   int    `json:"expire_time"`
			CardTypeName string `json:"card_type_name"`
			UID          int    `json:"uid"`
			ItemID       int    `json:"item_id"`
			ItemType     int    `json:"item_type"`
			BigCardURL   string `json:"big_card_url"`
			JumpURL      string `json:"jump_url"`
			Fan          struct {
				IsFan   int    `json:"is_fan"`
				Number  int    `json:"number"`
				Color   string `json:"color"`
				NumDesc string `json:"num_desc"`
			} `json:"fan"`
			ImageEnhance string `json:"image_enhance"`
		} `json:"decorate_card"`
		Rank      string `json:"rank"`
		Sign      string `json:"sign"`
		LevelInfo struct {
			CurrentLevel int    `json:"current_level"`
			CurrentMin   int    `json:"current_min"`
			CurrentExp   int    `json:"current_exp"`
			NextExp      string `json:"next_exp"`
		} `json:"level_info"`
	} `json:"user_profile"`
	UIDType      int    `json:"uid_type"`
	Stype        int    `json:"stype"`
	RType        int    `json:"r_type"`
	InnerID      int    `json:"inner_id"`
	Status       int    `json:"status"`
	DynamicIDStr string `json:"dynamic_id_str"`
	PreDyIDStr   string `json:"pre_dy_id_str"`
	OrigDyIDStr  string `json:"orig_dy_id_str"`
	RidStr       string `json:"rid_str"`
}

type DynamicCard struct {
	Desc       DynamicData `json:"desc,omitempty"`
	Card       string      `json:"card"`
	ExtendJSON string      `json:"extend_json"`
	Extra      struct {
		IsSpaceTop int `json:"is_space_top"`
	} `json:"extra"`
	Display struct {
		EmojiInfo struct {
			EmojiDetails []struct {
				EmojiName string `json:"emoji_name"`
				ID        int    `json:"id"`
				PackageID int    `json:"package_id"`
				State     int    `json:"state"`
				Type      int    `json:"type"`
				Attr      int    `json:"attr"`
				Text      string `json:"text"`
				URL       string `json:"url"`
				Meta      struct {
					Size int `json:"size"`
				} `json:"meta"`
				Mtime int `json:"mtime"`
			} `json:"emoji_details"`
		} `json:"emoji_info"`
		Relation struct {
			Status     int `json:"status"`
			IsFollow   int `json:"is_follow"`
			IsFollowed int `json:"is_followed"`
		} `json:"relation"`
	} `json:"display,omitempty"`
	ActivityInfos struct {
		Details []struct {
			Type   int    `json:"type"`
			Detail string `json:"detail"`
		} `json:"details"`
	} `json:"activity_infos,omitempty"`
}

type DynamicList struct {
	BaseData
	Data struct {
		HasMore    int `json:"has_more"`
		Attentions struct {
			Uids []int `json:"uids"`
		} `json:"attentions"`
		Cards      []DynamicCard `json:"cards"`
		NextOffset int64         `json:"next_offset"`
		Gt         int           `json:"_gt_"`
	} `json:"data"`
}
