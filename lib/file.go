package lib

import (
	"fmt"
	"io/ioutil"
	"os"
)

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
