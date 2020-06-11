package api

import (
	"context"
	"fmt"
	"github.com/ZhenlyChen/BiliBiliStatistics/lib"
	"github.com/chromedp/chromedp"
	"github.com/gin-gonic/gin"
	"io/ioutil"
)

func TaskHandler(controller *lib.Controller) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		task := MakeRunner(*controller)

		taskType := ctx.DefaultQuery("type", "none")

		var tasks =  []lib.TaskRunner {
			getUserData(&task),
		}

		switch taskType {
		case "base":
			// 获取基本信息（用户信息、总体数据、游客画像、粉丝数据）
			tasks = append(tasks, getStatData(&task))
			tasks = append(tasks, getBaseData(&task))
			tasks = append(tasks, getTrendData(&task))
			tasks = append(tasks, getNewFansData(&task))
			tasks = append(tasks, getFansData(&task))
			tasks = append(tasks, getPlaySourceData(&task))
		case "inc":
			// 增量数据 (增量数据/来源稿件)
			tasks = append(tasks, getAllIncData(&task))
			tasks = append(tasks, getAllSurveyData(&task))
		case "video":
			// 视频数据
			tasks = append(tasks, getVideoListData(&task))
		default:
			ctx.JSON(200, BaseRes{10000, "无效的任务类型"})
			return
		}
		flow := lib.MakeFlow(tasks)
		flow.FinishHandler = func() {
			lib.MakeToc("./data")
			controller.DataMaker.Time = 0
			ctx.JSON(200, BaseRes{0, "任务完成"})
		}
		flow.ErrorHandler = func(err string) {
			lib.MakeToc("./data")
			ctx.JSON(200, BaseRes{10000, err})
		}
		flow.Next()
	}
}

func LogoutHandler(c *lib.Controller) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		c.Cookies.Clear()
		c.Cache.Clear()
		ctx.JSON(200, BaseRes{0, "ok"})
	}
}

func LoginHandler(controller *lib.Controller) gin.HandlerFunc {
	return func(gCtx *gin.Context) {
		// 控制浏览器
		ctx := context.Background()
		options := []chromedp.ExecAllocatorOption{
			chromedp.WindowSize(1024, 600),
			chromedp.Flag("headless", false),
			chromedp.Flag("hide-scrollbars", false),
			chromedp.Flag("mute-audio", false),
			chromedp.UserAgent(`Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.103 Safari/537.36`),
		}

		// 读取配置路径配
		if b, err := ioutil.ReadFile("./chrome.ini"); err == nil &&  len(b) > 0 {
			options = append(options, chromedp.ExecPath(string(b)))
			fmt.Println(string(b))
		}

		options = append(chromedp.DefaultExecAllocatorOptions[:], options...)

		c, cc := chromedp.NewExecAllocator(ctx, options...)
		defer cc()
		// create context
		ctx, cancel := chromedp.NewContext(c)
		defer cancel()

		err := chromedp.Run(ctx,
			lib.SetCookies(controller.Cookies),
			chromedp.Navigate(`https://passport.bilibili.com/login`),
			lib.CheckLogin(),
			lib.SaveCookies(),
		)

		if err != nil || !controller.Cookies.LoadFromFile() {
			fmt.Println("登录失败：", err)
			gCtx.JSON(200, BaseRes{
				Code: 10000,
				Msg: "登录失败",
			})
		} else {
			gCtx.JSON(200, BaseRes{
				Code: 0,
				Msg: "登录成功",
			})
		}
	}
}
