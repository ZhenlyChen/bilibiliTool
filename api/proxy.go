package api

import (
	"github.com/ZhenlyChen/BiliBiliStatistics/entity"
	"github.com/ZhenlyChen/BiliBiliStatistics/lib"
	"github.com/gin-gonic/gin"
)

func LoginRequestHandler(c *lib.Controller) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		data := entity.NavData{}
		c.Request("https://api.bilibili.com/x/web-interface/nav", &data, func() {
			ctx.JSON(200, data)
		})
	}
}