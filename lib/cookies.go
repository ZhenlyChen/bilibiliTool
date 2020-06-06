package lib

import (
	"context"
	"encoding/json"
	"github.com/chromedp/cdproto/network"
	"github.com/chromedp/chromedp"
	"io/ioutil"
	"log"
)

type Cookies struct {
	Data []network.Cookie
	header string
}

func (c *Cookies) GetHeader() string {
	if c.header == "" {
		for _, data := range c.Data {
			if c.header != "" {
				c.header += "; "
			}
			c.header += data.Name + "=" + data.Value
		}
	}
	return c.header
}

func (c *Cookies) LoadFromFile() bool {
	fileName := "./Cookies.json"
	if ExistsFile(fileName) {
		data, err := ioutil.ReadFile(fileName)
		if err != nil && len(data) == 0 {
			return false
		}
		if err := json.Unmarshal(data, &c.Data); err != nil {
			log.Println("序列化Cookie失败", err)
			return false
		}
	}
	return true
}

func ClearCookies() {
	_ = ioutil.WriteFile("./Cookies.json", []byte(""), 0644)
}

func CheckLogin() chromedp.Action {
	return chromedp.WaitReady("#internationalHeader > div.mini-header.m-header > div > div.nav-user-center > div.user-con.signin > div:nth-child(7) > a > span")
}

func SaveCookies() chromedp.Action {
	return chromedp.ActionFunc(func(ctx context.Context) error {
		cookies, err := network.GetAllCookies().Do(ctx)
		if err != nil {
			return err
		}
		text, err := json.Marshal(cookies)
		if err != nil {
			log.Println("序列化登录态失败")
		}
		if err := ioutil.WriteFile("./Cookies.json", text, 0644); err != nil {
			log.Println("写入文件失败", err)
		}
		return nil
	})
}


func SetCookies(cookies Cookies) chromedp.Action {
	return chromedp.ActionFunc(func(ctx context.Context) error {
		// 读取Cookies
		for _, cookie := range cookies.Data {
			success, err := network.SetCookie(cookie.Name, cookie.Value).
				WithDomain(cookie.Domain).
				Do(ctx)
			if err != nil || !success {
				log.Println("设置Cookie失败", err)
				return err
			}
		}
		return nil
	})
}
