package maker

import (
	"bytes"
	"fmt"
	"github.com/ZhenlyChen/BiliBiliStatistics/entity"
	"golang.org/x/text/encoding/simplifiedchinese"
	"golang.org/x/text/transform"
	"io/ioutil"
	"strconv"
)

type ArchiveMaker struct {
	id   string
	data map[string][]entity.ArchiveData
	BV   map[string]string
}

func NewArchiveMaker(id string) ArchiveMaker {
	return ArchiveMaker{
		id:   id,
		data: map[string][]entity.ArchiveData{},
		BV:   map[string]string{},
	}
}

func (m *ArchiveMaker) AddList(data entity.ArchivesData) {
	for _, archive := range data.Data.ArcAudits {
		m.BV[archive.Archive.Bvid] = archive.Archive.Title
	}
}

func (m *ArchiveMaker) AddData(date string, data entity.ArchiveData) {
	m.data[date] = append(m.data[date], data)
}

func (m *ArchiveMaker) MakeData() {
	for bv, title := range m.BV {
		text := "日期, 点赞, 投币, 收藏, 分享, 弹幕, 平均播放时间,"+
			"播放量, 手机播放, PC播放, 站外播放, 其他播放, 粉丝播放, 游客播放, 再次播放, 充电\n"
		// 遍历所有日期
		for s, archives := range m.data {
			// 遍历所有视频
			for _, archive := range archives {
				if archive.Data.Play.Bvid == bv {
					text += s + ", "
					text += strconv.Itoa(archive.Data.Stat.Like) + ", "
					text += strconv.Itoa(archive.Data.Stat.Coin) + ", "
					text += strconv.Itoa(archive.Data.Stat.Fav) + ","
					text += strconv.Itoa(archive.Data.Stat.Share) + ","
					text += strconv.Itoa(archive.Data.Stat.Dm) + ","
					text += strconv.Itoa(archive.Data.Play.AvgDuration) + ","
					text += strconv.Itoa(archive.Data.Stat.Play) + ","
					text += strconv.Itoa(archive.Data.Source.Mobile) + ","
					text += strconv.Itoa(archive.Data.Source.Mainsite) + ","
					text += strconv.Itoa(archive.Data.Source.Outsite) + ","
					text += strconv.Itoa(archive.Data.Source.Others) + ","
					text += strconv.Itoa(archive.Data.Group.Fans) + ","
					text += strconv.Itoa(archive.Data.Group.Guest) + ","
					text += strconv.Itoa(archive.Data.Stat.Reply) + ","
					text += strconv.Itoa(archive.Data.Stat.Elec)
					text += "\n"
					break
				}
			}
		}
		fileName := "./data/"+m.id+"/视频数据_"+title+".csv"
		gbk, err := Utf8ToGbk([]byte(text))
		if err != nil {
			fmt.Println("编码文件失败", err)
			return
		}
		if err := ioutil.WriteFile(fileName, gbk, 0644); err != nil {
			fmt.Println("写入文件失败：", err)
		} else {
			fmt.Println("成功生成文件：", fileName)
		}
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