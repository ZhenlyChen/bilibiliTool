package main

import (
	"encoding/json"
	"fmt"
	"github.com/ZhenlyChen/BiliBiliStatistics/entity"
	"github.com/ZhenlyChen/BiliBiliStatistics/lib"
	"strconv"
	"time"
)

type Runner struct {
	c      lib.Controller
	userID int
}

func MakeRunner(c lib.Controller) Runner {
	return Runner{
		c:      c,
		userID: 0,
	}
}

// 获取用户信息
func getUserData(r *Runner) lib.TaskRunner {
	return func(t *lib.TaskFlow) {
		data := entity.NavData{}
		r.c.Request("https://api.bilibili.com/x/web-interface/nav", &data, func() {
			if data.Code == 0 {
				r.userID = data.Data.Mid
				fmt.Println("获取用户信息成功：" + data.Data.Uname)
			}
			if r.deal("用户信息", data.BaseData, &data.Data) {
				t.Next()
			}
		})
	}
}

// 获取基本信息
func getStatData(r *Runner) lib.TaskRunner {
	return func(t *lib.TaskFlow) {
		data := entity.StatData{}
		r.c.Request("https://member.bilibili.com/x/web/index/stat", &data, func() {
			if r.deal("总体数据", data.BaseData, &data.Data) {
				fmt.Println("获取总体数据成功")
				t.Next()
			}
		})
	}
}

func getBaseData(r *Runner) lib.TaskRunner {
	return func(t *lib.TaskFlow) {
		// 获取浏览总量信息
		data := entity.ViewerData{}
		r.c.Request("https://member.bilibili.com/x/web/data/base", &data, func() {
			if r.deal("浏览量", data.BaseData, &data.Data) {
				fmt.Println("获取浏览量数据成功")
				t.Next()
			}
		})
	}
}

func getTrendData(r *Runner) lib.TaskRunner {
	return func(t *lib.TaskFlow) {
		data := entity.TrendData{}
		r.c.Request("https://member.bilibili.com/x/web/data/trend", &data, func() {
			if r.deal("倾向", data.BaseData, &data.Data) {
				fmt.Println("获取倾向数据成功")
				t.Next()
			}
		})
	}
}

func getNewFansData(r *Runner) lib.TaskRunner {
	return func(t *lib.TaskFlow) {
		data := entity.NewFansData{}
		r.c.Request("https://member.bilibili.com/x/web/data/action", &data, func() {
			if r.deal("新增粉丝", data.BaseData, &data.Data) {
				fmt.Println("获取新增粉丝数据成功")
				t.Next()
			}
		})
	}
}

func getFansData(r *Runner) lib.TaskRunner {
	return func(t *lib.TaskFlow) {
		data := entity.FansData{}
		r.c.Request("https://member.bilibili.com/x/web/data/fan", &data, func() {
			if r.deal("粉丝", data.BaseData, &data.Data) {
				fmt.Println("获取粉丝数据成功")
				t.Next()
			}
		})
	}
}

func getIncData(r *Runner, index, pName string) lib.TaskRunner {
	return func(t *lib.TaskFlow) {
		data := entity.PandectData{}
		r.c.Request("https://member.bilibili.com/x/web/data/pandect?type="+index,
			&data, func() {
				if r.deal("增量数据_"+pName, data.BaseData, &data.Data) {
					fmt.Println("获取" + pName + "增量数据成功")
					t.Next()
				}
			})
	}
}

func getAllIncData(r *Runner) lib.TaskRunner {
	return func(t *lib.TaskFlow) {
		pandectType := []string{"播放量", "弹幕", "评论", "分享", "硬币", "收藏", "充电", "点赞"}
		for i, name := range pandectType {
			index := strconv.Itoa(i + 1)
			pName := name
			t.AddTask(getIncData(r, index, pName))
		}
		t.Next()
	}
}

func getSurveyData(r *Runner, index, pName string) lib.TaskRunner {
	return func(t *lib.TaskFlow) {
		data := entity.SurveyData{}
		r.c.Request("https://member.bilibili.com/x/web/data/survey?type="+index,
			&data, func() {
				if r.deal("增量来源_"+pName, data.BaseData, &data.Data) {
					fmt.Println("获取" + pName + "增量数据来源稿件列表成功")
					t.Next()
				}
			})
	}
}

func getAllSurveyData(r *Runner) lib.TaskRunner {
	return func(t *lib.TaskFlow) {
		surveyType := []string{"播放量", "弹幕", "评论", "分享", "硬币", "收藏", "充电", "点赞"}
		for i, name := range surveyType {
			index := strconv.Itoa(i + 1)
			pName := name
			t.AddTask(getSurveyData(r, index, pName))
		}
		t.Next()
	}
}

func getPlaySourceData(r *Runner) lib.TaskRunner {
	return func(t *lib.TaskFlow) {
		data := entity.PlaySourceData{}
		r.c.Request("https://member.bilibili.com/x/web/data/playsource", &data, func() {
			if r.deal("浏览设备来源", data.BaseData, &data.Data) {
				fmt.Println("获取浏览设备来源数据成功")
				t.Next()
			}
		})
	}
}

func getPlayAnalysisData(r *Runner, index, name string) lib.TaskRunner {
	return func(t *lib.TaskFlow) {
		data := entity.PlayAnalysisData{}
		r.c.Request("https://member.bilibili.com/x/web/data/playanalysis?copyright="+index, &data, func() {
			if r.deal("稿件播放量_"+name, data.BaseData, &data.Data) {
				fmt.Println("获取" + name + "稿件播放量数据成功")
				t.Next()
			}
		})
	}
}

func getAllPlayAnalysisData(r *Runner) lib.TaskRunner {
	return func(t *lib.TaskFlow) {
		surveyType := []string{"所有", "自制", "转载"}
		for i, name := range surveyType {
			index := strconv.Itoa(i)
			pName := name
			t.AddTask(getPlayAnalysisData(r, index, pName))
		}
		t.Next()
	}
}

func getArchiveData(r *Runner, BV string) lib.TaskRunner {
	return func(t *lib.TaskFlow) {
		vData := entity.ArchiveData{}
		r.c.Request("https://member.bilibili.com/x/web/data/archive?bvid="+BV, &vData, func() {
			if r.deal("视频数据_"+BV, vData.BaseData, &vData.Data) {
				fmt.Println("获取视频" + BV + "统计数据成功")
				t.Next()
			}
		})
	}
}

func getVideoQuitData(r *Runner, BV, cID string) lib.TaskRunner {
	return func(t *lib.TaskFlow) {
		qData := entity.VideoQuitData{}
		r.c.Request("https://member.bilibili.com/x/web/data/videoquit?cid="+cID, &qData, func() {
			if r.deal("视频留存率数据_"+cID, qData.BaseData, &qData.Data) {
				fmt.Println("获取视频" + BV + "-" + cID + "留存率数据成功")
				t.Next()
			}
		})
	}
}

func getVideoData(r *Runner, BV string) lib.TaskRunner {
	return func(t *lib.TaskFlow) {
		vData := entity.VideosData{}
		r.c.Request("https://member.bilibili.com/x/web/archive/videos?bvid="+BV, &vData, func() {
			if r.deal("视频基本数据_"+BV, vData.BaseData, &vData.Data) {
				fmt.Println("获取视频" + BV + "基本数据成功")
				for _, video := range vData.Data.Videos {
					cID := strconv.Itoa(video.Cid)
					t.AddTask(getVideoQuitData(r, BV, cID))
				}
				t.Next()
			}
		})
	}
}

func getAllVideoData(r *Runner, page string) lib.TaskRunner {
	return func(t *lib.TaskFlow) {
		cData := entity.ArchivesData{}
		r.c.Request("https://member.bilibili.com/x/web/archives?status=is_pubing%2Cpubed%2Cnot_pubed&pn="+page+"&ps=10&coop=1&interactive=1", &cData, func() {
			if r.deal("视频列表数据_"+page, cData.BaseData, &cData.Data) {
				fmt.Println("获取投稿视频第" + page + "页数据成功")
				for _, arc := range cData.Data.ArcAudits {
					BV := arc.Archive.Bvid
					t.AddTasks([]lib.TaskRunner{
						getVideoData(r, BV),
						getArchiveData(r, BV),
					})
				}
				t.Next()
			}
		})
	}
}

func getVideoListData(r *Runner) lib.TaskRunner {
	return func(t *lib.TaskFlow) {
		data := entity.ArchivesData{}
		r.c.Request("https://member.bilibili.com/x/web/archives?status=is_pubing%2Cpubed%2Cnot_pubed&pn=1&ps=10&coop=1&interactive=1", &data, func() {
			if data.Code == 0 {
				fmt.Println("我的视频数量：", data.Data.Page.Count)
				for page := 1; (page-1)*10 < data.Data.Page.Count; page += 1 {
					cPage := strconv.Itoa(page)
					t.AddTask(getAllVideoData(r, cPage))
				}
				t.Next()
			}
		})
	}
}

func (r *Runner) GetData() {
	taskFlow := lib.MakeFlow([]lib.TaskRunner{
		getUserData(r),
		getStatData(r),
		getBaseData(r),
		getTrendData(r),
		getNewFansData(r),
		getFansData(r),
		getAllIncData(r),
		getAllSurveyData(r),
		getPlaySourceData(r),
		getAllPlayAnalysisData(r),
		getVideoListData(r),
	})
	taskFlow.Next()
}

func (r *Runner) getDirPath() string {
	return "./data/" + strconv.Itoa(r.userID) + "/" + time.Now().Format("2006-01-02")
}

func (r *Runner) deal(name string, baseData entity.BaseData, data interface{}) bool {
	if baseData.Code != 0 {
		fmt.Println("请求失败", baseData.Code, baseData.Message)
		if baseData.Code == -101 {
			// 未登录
			lib.ClearCookies()
		}
		return false
	}
	// fmt.Println(data)
	b, err := json.Marshal(data)
	if err != nil {
		fmt.Println("解析错误：", err)
		return false
	}
	lib.SaveData(r.getDirPath(), name+".json", b)
	return true

}
