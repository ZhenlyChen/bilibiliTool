package lib

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"os"
)

type TocData struct {
	IsDir bool `json:"isDir"`
	Name string `json:"name"`
}

// 生成目录
func MakeToc(path string) {
	files := GetDirs(path)
	var data []TocData
	for _, file := range files {
		if file.IsDir() {
			MakeToc(path + "/" + file.Name())
		}
		if file.Name() != "toc.json" {
			data = append(data, TocData{
				IsDir: file.IsDir(),
				Name: file.Name(),
			})
		}
	}
	b, err := json.Marshal(data)
	if err != nil {
		fmt.Println("序列化目录失败", err)
		return
	}
	if err := ioutil.WriteFile(path + "/toc.json", b, 0644); err != nil {
		fmt.Println("写入文件失败", err)
	}
}

func GetDirs(path string) []os.FileInfo{
	files, err := ioutil.ReadDir(path)
	if err != nil {
		fmt.Println("找不到数据目录")
	}
	return files
}

func ExistsFile(path string) bool {
	_, err := os.Stat(path) //os.Stat获取文件信息
	if err != nil {
		if os.IsExist(err) {
			return true
		}
		return false
	}
	return true
}

func createDir(filePath string)  error {
	if !ExistsFile(filePath) {
		err := os.MkdirAll(filePath, os.ModePerm)
		return err
	}
	return nil
}

func SaveData(path, name string, data []byte) {
	if err := createDir(path); err != nil {
		fmt.Println("创建文件夹失败：", err)
	}
	if err := ioutil.WriteFile(path+"/" + name, data, 0644); err != nil {
		fmt.Println("写入文件失败：", err)
	}
}
