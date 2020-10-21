package main

import (
	"bufio"
	"fmt"
	"github.com/ZhenlyChen/BiliBiliStatistics/api"
	"github.com/ZhenlyChen/BiliBiliStatistics/lib"
	"github.com/gin-contrib/static"
	"github.com/gin-gonic/gin"
	"log"
	"os"
	"os/exec"
	"syscall"
	"io/ioutil"
)

type LocalServer struct {
	controller lib.Controller
}

func InitLocalServer() LocalServer {
	server := LocalServer{}
	// 生成目录文件
	lib.MakeToc("./data")
	// 加载登录状态
	cookies := lib.Cookies{}
	cookies.LoadFromFile()
	// 请求控制器
	server.controller = lib.NewController(cookies)

	return server
}

func (s *LocalServer) Run() {
	r := gin.Default()
	r.GET("/api/user", api.LoginRequestHandler(&s.controller))
	r.GET("/api/stat", api.StatRequestHandler(&s.controller))
	r.GET("/api/data", api.GetDataHandler(&s.controller))
	r.POST("/api/login", api.LoginHandler(&s.controller))
	r.POST("/api/logout", api.LogoutHandler(&s.controller))
	r.POST("/api/task", api.TaskHandler(&s.controller))
	r.Use(static.Serve("/", static.LocalFile("./web/dist", true)))
	r.Use(static.Serve("/data", static.LocalFile("./data", true)))

	chromePath := "chrome"
	
	// 读取配置路径配
	if b, err := ioutil.ReadFile("./chrome.ini"); err == nil &&  len(b) > 0 {
		chromePath =  string(b) 
	}
	fmt.Println(chromePath)

	cmd := exec.Command(`cmd`, `/c`, `start`, ``, chromePath, `--app=http://localhost:8081/#/welcome`)
	cmd.SysProcAttr = &syscall.SysProcAttr{HideWindow: true}
	if err := cmd.Start(); err != nil {
		log.Println("调用系统浏览器失败", err)
	}
	if err := r.Run(":8081"); err != nil {
		fmt.Println("启动服务器失败", err)
	}
	input, _ := bufio.NewReader(os.Stdin).ReadString('\n')
	fmt.Println(input)
	//go r.Run(":8081")
	// ShowUI()
}

//func ShowUI() {
// 编译参数：-ldflags="-H windowsgui"
//	w := webview.New(true)
//	defer w.Destroy()
//	w.SetTitle("BiliBili Tool")
//	w.SetSize(1024, 600, webview.HintNone)
//	// time.Sleep(time.Second * 2)
//	w.Navigate("http://localhost:8081/#/welcome")
//	w.Run()
//}
