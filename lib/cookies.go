package lib

import (
	"bufio"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"os"
)

type CookieData struct {
	Domain         string `json:"domain"`
	ExpirationDate float32    `json:"expirationDate"`
	HostOnly       bool   `json:"hostOnly"`
	HTTPOnly       bool   `json:"httpOnly"`
	Name           string `json:"name"`
	Path           string `json:"path"`
	SameSite       string `json:"sameSite"`
	Secure         bool   `json:"secure"`
	Session        bool   `json:"session"`
	StoreID        string `json:"storeId"`
	Value          string `json:"value"`
	ID             int64    `json:"id"`
}

type Cookies struct {
	data []CookieData
	header string
}

func (c *Cookies) GetCookies() []CookieData {
	return c.data
}

func (c *Cookies) GetCookiesHeader() string {
	if c.header == "" {
		for _, data := range c.data {
			if c.header != "" {
				c.header += "; "
			}
			c.header += data.Name + "=" + data.Value
		}
	}
	return c.header
}

func ClearCookies() {
	_ = ioutil.WriteFile("./cookies.txt", []byte(""), 0644)
}

func LoadCookies() Cookies  {
	fileName := "./cookies.txt"
	cookies := Cookies{}
	if ExistsFile(fileName) {
		data, err := ioutil.ReadFile(fileName)
		if err == nil && len(data) > 0 {
			cookies.header = string(data)
			return cookies
		}
	}
	fmt.Print("请输入Cookies：")
	cookiesStr := ""
	input := bufio.NewScanner(os.Stdin)
	cookieType := 0
	for input.Scan() {
		line := input.Text()
		if cookieType == 0 && len(line) > 0 && line[0] == '[' {
			cookieType = 1
		}
		cookiesStr += line
		if cookieType == 1 {
			cookiesStr += "\n"
		}
		if cookieType == 0 || line == "]" {
			break
		}
	}
	if cookieType == 1 {
		if err := json.Unmarshal([]byte(cookiesStr), &cookies.data); err != nil {
			fmt.Print("解析失败：", err)
		}
	} else {
		cookies.header = cookiesStr
	}
	if err := ioutil.WriteFile(fileName, []byte(cookies.GetCookiesHeader()),0644); err != nil {
		fmt.Print("写入文件错误：", err)
	}
	return cookies
}
