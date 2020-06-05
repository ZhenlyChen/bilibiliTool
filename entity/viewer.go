package entity

type ViewerData struct {
	BaseData
	Data struct {
		Period struct {
			ModuleOne   string `json:"module_one"`
			ModuleTwo   string `json:"module_two"`
			ModuleThree string `json:"module_three"`
			ModuleFour  string `json:"module_four"`
		} `json:"period"`
		ViewerArea struct {
			Fan    map[string]int `json:"fan"`
			NotFan map[string]int `json:"not_fan"`
		} `json:"viewer_area"`
		ViewerBase struct {
			Fan struct {
				Male         int `json:"male"`
				Female       int `json:"female"`
				AgeOne       int `json:"age_one"`
				AgeTwo       int `json:"age_two"`
				AgeThree     int `json:"age_three"`
				AgeFour      int `json:"age_four"`
				PlatPc       int `json:"plat_pc"`
				PlatH5       int `json:"plat_h5"`
				PlatOut      int `json:"plat_out"`
				PlatIos      int `json:"plat_ios"`
				PlatAndroid  int `json:"plat_android"`
				PlatOtherApp int `json:"plat_other_app"`
			} `json:"fan"`
			NotFan struct {
				Male         int `json:"male"`
				Female       int `json:"female"`
				AgeOne       int `json:"age_one"`
				AgeTwo       int `json:"age_two"`
				AgeThree     int `json:"age_three"`
				AgeFour      int `json:"age_four"`
				PlatPc       int `json:"plat_pc"`
				PlatH5       int `json:"plat_h5"`
				PlatOut      int `json:"plat_out"`
				PlatIos      int `json:"plat_ios"`
				PlatAndroid  int `json:"plat_android"`
				PlatOtherApp int `json:"plat_other_app"`
			} `json:"not_fan"`
		} `json:"viewer_base"`
	} `json:"data"`
}
