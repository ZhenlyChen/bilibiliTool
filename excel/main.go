package main

import (
	"encoding/json"
	"fmt"
	"github.com/ZhenlyChen/BiliBiliStatistics/entity"
	"github.com/ZhenlyChen/BiliBiliStatistics/excel/maker"
	"github.com/ZhenlyChen/BiliBiliStatistics/lib"
	"io/ioutil"
	"strings"
)

func main() {
	users := lib.GetDirs("./data")
	for _, user := range users {
		dates := lib.GetDirs("./data/" + user.Name())
		// 视频数据生成器
		archiveMaker := maker.NewArchiveMaker(user.Name())
		for _, date := range dates {
			if !date.IsDir() {
				continue
			}
			dirPath := "./data/" + user.Name() + "/" + date.Name()
			// 获取用户基本信息
			navData := entity.NavData{}
			loadData(dirPath, "用户信息.json", &navData.Data)
			fmt.Println("正在整合" + navData.Data.Uname + date.Name() + "的数据")

			files := lib.GetDirs(dirPath)
			for _, file := range files {
				// 获取视频列表
				if !file.IsDir() && strings.Contains(file.Name(), "视频数据_") && !strings.Contains(file.Name(), "视频数据_BV"){
					archivesData := entity.ArchivesData{}
					loadData(dirPath, file.Name(), &archivesData.Data)
					archiveMaker.AddList(archivesData)
				}
			}
			for _, file := range files {
				// 获取视频数据
				if !file.IsDir() && strings.Contains(file.Name(), "视频数据_BV") {
					archiveData := entity.ArchiveData{}
					loadData(dirPath, file.Name(), &archiveData.Data)
					archiveMaker.AddData(date.Name(), archiveData)
				}
			}
		}
		archiveMaker.MakeData()
	}
}

func loadData(path, name string, data interface{}) {
	jsonData, err := ioutil.ReadFile(path + "/" + name)
	if err != nil {
		fmt.Println("获取"+name+"失败：", err)
	}
	if err := json.Unmarshal(jsonData, &data); err != nil {
		fmt.Println("解析"+name+"失败：", err)
	}
}
