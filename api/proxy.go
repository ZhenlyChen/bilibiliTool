package api

import (
	"github.com/ZhenlyChen/BiliBiliStatistics/entity"
	"github.com/ZhenlyChen/BiliBiliStatistics/lib"
	"github.com/gin-gonic/gin"
	"time"
)

func StatRequestHandler(c *lib.Controller) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		if ctx.DefaultQuery("force", "false") == "true" {
			c.Cache.StatTime = time.Unix(0, 0)
		}
		if c.Cache.IsTimeout(c.Cache.StatTime) {
			data := entity.StatData{}
			c.Request("https://member.bilibili.com/x/web/index/stat", &data, func() {
				if data.Code == 0 {
					c.Cache.StatData = data
					c.Cache.StatData.Data.Time = time.Now().Unix()
					c.Cache.StatTime = time.Now()
				}
				ctx.JSON(200, c.Cache.StatData)
			})
		} else {
			ctx.JSON(200, c.Cache.StatData)
		}
	}
}


func LoginRequestHandler(c *lib.Controller) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		if ctx.DefaultQuery("force", "false") == "true" {
			c.Cache.UserTime = time.Unix(0, 0)
		}
		if c.Cache.IsTimeout(c.Cache.UserTime) {
			data := entity.NavData{}
			c.Request("https://api.bilibili.com/x/web-interface/nav", &data, func() {
				if data.Code == 0 {
					c.Cache.UserData = data
					c.Cache.UserTime = time.Now()
				}
				ctx.JSON(200, data)
			})
		} else {
			ctx.JSON(200, c.Cache.UserData)
		}
	}
}

