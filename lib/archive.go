package lib

import (
	"bytes"
	"encoding/json"
	"fmt"
	"github.com/ZhenlyChen/BiliBiliStatistics/entity"
	"golang.org/x/text/encoding/simplifiedchinese"
	"golang.org/x/text/transform"
	"io/ioutil"
	"strings"
	"time"
)

type ArchiveMaker struct {
	ID   string
	Time int64
	Data map[string]map[string]string
	BV map[string]entity.ArchiveBaseData
}

func NewArchiveMaker(id string) ArchiveMaker {
	return ArchiveMaker{
		ID:   id,
		Time: 0,
		Data: map[string]map[string]string{},
		BV: map[string]entity.ArchiveBaseData{},
	}
}

func (m *ArchiveMaker) LoadData() {
	dates := GetDirs("./data/" + m.ID)
	// 视频数据生成器
	for _, date := range dates {
		if !date.IsDir() {
			continue
		}
		m.Data[date.Name()] = map[string]string{}
		dirPath := "./data/" + m.ID + "/" + date.Name()
		// 获取用户基本信息
		navData := entity.NavData{}
		loadData(dirPath, "用户信息.json", &navData.Data)

		files := GetDirs(dirPath)
		for _, file := range files {
			// 获取视频列表
			if !file.IsDir() && strings.Contains(file.Name(), "视频列表数据_") {
				archivesData := entity.ArchivesData{}
				loadData(dirPath, file.Name(), &archivesData.Data)
				m.AddList(archivesData)
			}
			if jsonData, err := ioutil.ReadFile(dirPath + "/" + file.Name()); err != nil {
				fmt.Println("读取文件"+file.Name()+"失败")
			} else {
				m.Data[date.Name()][file.Name()] = string(jsonData)
			}
		}
	}
	m.Time = time.Now().Unix()
}

func (m *ArchiveMaker) AddList(data entity.ArchivesData) {
	for _, archive := range data.Data.ArcAudits {
		m.BV[archive.Archive.Bvid] = archive
	}
}

func Utf8ToGbk(s []byte) ([]byte, error) {
	reader := transform.NewReader(bytes.NewReader(s), simplifiedchinese.GBK.NewEncoder())
	d, e := ioutil.ReadAll(reader)
	if e != nil {
		return nil, e
	}
	return d, nil
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
