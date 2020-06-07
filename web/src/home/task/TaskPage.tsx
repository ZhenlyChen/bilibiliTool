import { useStore, showMessage } from "../../Store";
import {
  Stack,
  Text,
  MessageBarType,
  Button,
  PrimaryButton,
} from "office-ui-fabric-react";
import React, { useEffect } from "react";
import { useLocalStore, useObserver } from "mobx-react-lite";
import moment from "moment";
import { service } from "../../Service";

export const TaskPage: React.FunctionComponent = () => {
  const store = useStore();
  const localState = useLocalStore(() => ({
    date: {
      base: "",
      video: "",
      inc: "",
    } as any,
    loading: true,
    today: moment().format("YYYY-MM-DD"),
  }));
  const tasks = [
    {
      title: "基础数据",
      key: "base",
      des: "用户信息、游客画像、总体数据统计、粉丝数据统计",
    },
    {
      title: "增量数据",
      key: "inc",
      des: "各属性(播放量/点赞数...)的增量数据、来源稿件",
    },
    {
      title: "视频数据",
      key: "video",
      des: "所有投稿视频的数据",
    },
  ];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const userPath = "/data/" + store.user.id;
      const res = await service.get(userPath + "/toc.json");
      let lastDate = {
        inc: "",
        video: "",
        base: "",
      };
      for (const file of res.data.reverse()) {
        if (file.isDir) {
          if (
            lastDate.inc === "" ||
            file.name > lastDate.inc ||
            lastDate.video === "" ||
            file.name > lastDate.video ||
            lastDate.base === "" ||
            file.name > lastDate.base
          ) {
            // 检查数据完整性
            const files = (
              await service.get(userPath + "/" + file.name + "/toc.json")
            ).data;
            let incData = false;
            let baseData = false;
            let videoData = false;
            for (const data of files) {
              const name = data.name;
              if (name.indexOf("增量数据_") === 0) {
                incData = true;
              } else if (name.indexOf("视频列表数据") === 0) {
                videoData = true;
              } else if (
                name === "粉丝.json" ||
                name === "浏览量.json" ||
                name === "浏览设备来源.json" ||
                name === "倾向.json" ||
                name === "新增粉丝.json" ||
                name === "用户信息.json" ||
                name === "总体数据.json"
              ) {
                baseData = true;
              }
              if (incData && videoData && baseData) {
                break;
              }
            }
            if (incData && file.name > lastDate.inc) {
              localState.date.inc = file.name;
              lastDate.inc = file.name;
            }
            if (videoData && file.name > lastDate.video) {
              localState.date.video = file.name;
              lastDate.video = file.name;
            }
            if (baseData && file.name > lastDate.base) {
              localState.date.base = file.name;
              lastDate.base = file.name;
            }
          }
        }
      }
      localState.loading = false;
    } catch (err) {
      if (err.response && err.response.status === 404) {
        // 没有数据
        localState.date.base = "不存在数据";
        localState.date.video = "不存在数据";
        localState.date.inc = "不存在数据";
      } else {
        showMessage(store, "获取数据状态失败:" + err, MessageBarType.error);
      }
      localState.loading = false;
    }
  };

  const getAllHandler = async () => {
    for (const task of tasks) {
      if (localState.date[task.key] !== localState.today) {
        await runTask(task.key);
      }
    }
    showMessage(store, "已获取最新数据");
  };

  const getHandler = (type: string) => {
    return () => {
      runTask(type);
    };
  };

  const runTask = async (type: string) => {
    try {
      localState.loading = true;
      localState.date[type] = "更新中...";
      const res = await service.post("/api/task?type=" + type);
      if (res.data.Code !== 0) {
        showMessage(
          store,
          "执行任务失败:" + res.data.Msg,
          MessageBarType.error
        );
      } else {
        await fetchData();
      }
    } catch (err) {
      showMessage(store, "执行任务失败:" + err, MessageBarType.error);
      localState.loading = false;
    }
  };

  const taskBox = () => {
    const color = {
      success: "#17a05d",
      loading: "#ffce45",
      wait: "#da5247",
    };
    return tasks.map((v, i) => {
      const date = localState.date[v.key];
      let cardStatus = "数据获取中";
      let cardColor = color.loading;
      if (date === localState.today) {
        cardColor = color.success;
        cardStatus = "数据已最新";
      } else if (date !== "更新中..." && date !== "") {
        cardColor = color.wait;
        cardStatus = "数据待更新";
      }
      return (
        <div
          key={v.key}
          style={{
            background: "#ffffff",
            width: "100%",
            margin: 16,
            padding: "8px 16px",
            transition: "all .2s",
            boxShadow: "0 0 20px rgba(43,45,56,.08)",
            borderLeft: "4px solid " + cardColor,
          }}
        >
          <p
            style={{
              margin: "4px auto",
              userSelect: "none",
            }}
          >
            <Text
              style={{
                color: "#282c34",
                fontSize: 18,
              }}
            >
              {v.title}
            </Text>

            <Text
              style={{
                marginLeft: 8,
                fontSize: 14,
                background: cardColor,
                padding: "4px 8px",
                color: "#fff",
                borderRadius: 4,
              }}
            >
              {cardStatus}
            </Text>
          </p>
          <p
            style={{
              color: "#7da5bf",
            }}
          >
            {v.des}
          </p>
          <Stack
            horizontal
            style={{
              paddingBottom: 12,
            }}
          >
            <Stack.Item>
              <Text>
                {localState.date[v.key] === ""
                  ? "正在查询本地数据..."
                  : "最近更新时间：" + localState.date[v.key]}
              </Text>
            </Stack.Item>
            <Stack.Item
              grow={1}
              styles={{
                root: {
                  textAlign: "right",
                },
              }}
            >
              <Button disabled={localState.loading} onClick={getHandler(v.key)}>
                {date === localState.today ? "再次获取" : "获取数据"}
              </Button>
            </Stack.Item>
          </Stack>
        </div>
      );
    });
  };

  return useObserver(() => (
    <Stack gap={15}>
      <Stack.Item>
        <Stack horizontal>
          <Stack.Item>
            <Text
              variant="xLargePlus"
              style={{
                padding: 16,
                color: "#fb7299",
              }}
            >
              获取当日数据
            </Text>
          </Stack.Item>
          <Stack.Item
            grow={1}
            styles={{
              root: {
                textAlign: "right",
                paddingRight: 12,
                paddingTop: 2,
              },
            }}
          >
            <PrimaryButton
              disabled={localState.loading}
              text="一键获取全部数据"
              onClick={getAllHandler}
            />
          </Stack.Item>
        </Stack>
      </Stack.Item>
      <Stack.Item>
        <Stack wrap horizontal>
          {taskBox()}
        </Stack>
      </Stack.Item>
    </Stack>
  ));
};
