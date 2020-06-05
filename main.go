package main

import (
	"github.com/ZhenlyChen/BiliBiliStatistics/lib"
)

func main() {
	task := MakeRunner(lib.NewController(lib.LoadCookies()))
	task.GetData()
}