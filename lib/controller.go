package lib

import (
	"encoding/json"
	"fmt"
	"github.com/gocolly/colly/v2"
)

type Controller struct {
	cookies Cookies
}

func NewController(cookies Cookies) Controller {
	req := Controller{
		cookies: cookies,
	}
	return req
}

type ResponseCallback func()

func (c *Controller) Request(url string, data interface{}, callback ResponseCallback) {
	req := colly.NewCollector()
	req.OnRequest(func(r *colly.Request) {
		r.Headers.Set("Cookie", c.cookies.GetCookiesHeader())
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
