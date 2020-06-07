package lib

import (
	"encoding/json"
	"fmt"
	"github.com/ZhenlyChen/BiliBiliStatistics/entity"
	"github.com/gocolly/colly/v2"
	"time"
)

type CacheData struct {
	UserData entity.NavData
	UserTime time.Time

	StatData entity.StatData
	StatTime time.Time
}

func (c *CacheData) Clear() {
	c.UserTime = time.Unix(0, 0)
	c.StatTime = time.Unix(0, 0)
}

func (c *CacheData) IsTimeout(cacheTime time.Time) bool {
	// 缓存策略：同一天内12小时
	return cacheTime.Add(time.Hour * 12).Before(time.Now()) ||
		cacheTime.Day() != time.Now().Day()
}

type Controller struct {
	Cookies   Cookies
	Cache     CacheData
	DataMaker ArchiveMaker
}

func NewController(cookies Cookies) Controller {
	req := Controller{
		Cookies: cookies,
		Cache: CacheData{
			UserTime: time.Unix(0,0),
			StatTime: time.Unix(0,0),
		},
		DataMaker: NewArchiveMaker(""),
	}
	return req
}

type ResponseCallback func()

func (c *Controller) Request(url string, data interface{}, callback ResponseCallback) {
	req := colly.NewCollector()
	req.OnRequest(func(r *colly.Request) {
		r.Headers.Set("Cookie", c.Cookies.GetHeader())
	})
	req.OnError(func(r *colly.Response, err error) {
		fmt.Println("Request URL:", r.Request.URL, "failed with response:", r, "\nError:", err)
	})
	req.OnResponse(func(r *colly.Response) {
		if err := json.Unmarshal(r.Body, data); err != nil {
			fmt.Println("解析错误", err)
			fmt.Println(string(r.Body))
		}
		callback()
	})
	if err := req.Visit(url); err != nil {
		fmt.Println("访问错误：", err)
	}
}
