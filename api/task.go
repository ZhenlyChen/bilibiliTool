package api

import (
	"context"
	"github.com/ZhenlyChen/BiliBiliStatistics/lib"
	"github.com/chromedp/chromedp"
	"github.com/gin-gonic/gin"
)

func TaskHandler(controller *lib.Controller) gin.HandlerFunc {
	return func(c *gin.Context) {
		task := MakeRunner(*controller)
		task.GetData()
		c.JSON(200, BaseRes{200, "执行任务成功"})
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
			gCtx.JSON(200, BaseRes{
				Code: 10000,
				Msg: "登录失败",
			})
		} else {
			gCtx.JSON(200, BaseRes{
				Code: 200,
				Msg: "登录成功",
			})
		}
	}
}
