package api

import (
	"github.com/ZhenlyChen/BiliBiliStatistics/lib"
	"github.com/gin-gonic/gin"
	"time"
)

func GetDataHandler(c *lib.Controller) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		userID := ctx.DefaultQuery("id", "0")
		if userID == "0" {
			ctx.JSON(403, BaseRes{10000, "请先登录"})
			return
		}
		if c.DataMaker.ID != userID {
			c.DataMaker.ID = userID
			c.DataMaker.Time = 0
		}
		if ctx.DefaultQuery("force", "false") == "true" {
			c.DataMaker.Time = 0
		}
		if time.Unix(c.DataMaker.Time, 0).Add(time.Hour * 24).Before(time.Now()) {
			// 刷新数据
			c.DataMaker.LoadData()
		}
		ctx.JSON(200, c.DataMaker)
	}
}