import { useStore, showMessage } from "../../Store";
import { Stack, Text } from "office-ui-fabric-react";
import React, { useEffect, CSSProperties } from "react";
import { service } from "../../Service";
import { useLocalStore, useObserver } from "mobx-react-lite";

import playIcon from "../../images/play.svg";
import coinIcon from "../../images/coin.svg";
import collectIcon from "../../images/collect.svg";
import commentIcon from "../../images/comment.svg";
import dmIcon from "../../images/dm.svg";
import likeIcon from "../../images/like.svg";
import shareIcon from "../../images/share.svg";
import moment from "moment";

export const HistoryVideo: React.FunctionComponent = () => {
  const store = useStore();

  const localState = useLocalStore(() => ({
    data: {} as any,
  }));

  const style = {
    block: {
      minWidth: 80,
    },
    icon: {
      height: 16,
      width: 16,
      verticalAlign: "middle",
    },
    text: {
      margin: "6px",
      fontSize: 12,
      verticalAlign: "middle",
      color: "#999999",
    },
  };

  const fetchData = async () => {
    try {
      const res = await service.get("/api/data", {
        params: {
          id: store.user.id,
        },
      });
      localState.data = res.data;
    } catch (err) {
      if (err.response && err.response.Msg) {
        showMessage(store, "获取数据失败：" + err.response.Msg);
      } else {
        showMessage(store, "获取数据失败：" + err);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getDuration = (d: number) => {
    const hour = Math.floor(d / 60);
    const min = d % 60;
    return (hour < 10 ? "0" : "") + hour + ":" + (min < 10 ? "0" : "") + +min;
  };

  const videoCard = () => {
    if (!localState.data.BV) {
      return (
        <div
          style={{
            marginTop: 24,
          }}
        >
          <Text variant="xLarge">数据加载中...</Text>
        </div>
      );
    }

    const videos = [];
    for (const i in localState.data.BV) {
      videos.push({
        id: i,
        data: localState.data.BV[i],
      });
    }

    return videos.map((v) => {
      return (
        <Stack
          key={v.data.Archive.bvid}
          horizontal
          verticalAlign="center"
          gap={12}
          style={
            {
              background: "#fff",
              boxShadow:
                "0 5px 5px 0 rgba(154,160,185,.05), 0 5px 30px 0 rgba(166,173,201,.22)",

              transition: "all .2s",
              cursor: "pointer",
              borderRadius: 4,
              margin: "16px 0",
              minWidth: 540,
              padding: 12,
            } as CSSProperties
          }
        >
          <Stack.Item
            styles={{
              root: {
                position: "relative",
              },
            }}
          >
            <img
              referrerPolicy="no-referrer"
              src={v.data.Archive.cover}
              style={{
                height: 96,
                width: 154,
                borderRadius: 4,
              }}
            />
            <span
              style={{
                position: "absolute",
                bottom: 4,
                right: 0,
                background: "rgba(0,0,0,0.7)",
                color: "#fff",
                fontSize: 10,
                borderRadius: 4,
                padding: "2px 4px",
                userSelect: "none",
              }}
            >
              {getDuration(v.data.Archive.duration)}
            </span>
          </Stack.Item>
          <Stack.Item
            grow={1}
            styles={{
              root: {
                height: 100,
              },
            }}
          >
            <p
              style={{
                marginTop: 0,
                marginBottom: 6,
                fontSize: 16,
                width: 340,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                fontWeight: "bold",
              }}
            >
              {v.data.Archive.title}
            </p>
            <p
              style={{
                margin: "0 0 0 6px",
                fontSize: 12,
                color: "#999",
              }}
            >
              {moment(v.data.Archive.ptime * 1000).format(
                "YYYY-MM-DD HH:mm:ss"
              )}
            </p>
            <Stack
              horizontal
              wrap
              style={{
                padding: 8,
              }}
            >
              <Stack.Item styles={{ root: style.block }}>
                <img src={playIcon} style={style.icon} />
                <Text style={style.text}>{v.data.stat.view}</Text>
              </Stack.Item>
              <Stack.Item styles={{ root: style.block }}>
                <img src={dmIcon} style={style.icon} />
                <Text style={style.text}>{v.data.stat.danmaku}</Text>
              </Stack.Item>
              <Stack.Item styles={{ root: style.block }}>
                <img src={commentIcon} style={style.icon} />
                <Text style={style.text}>{v.data.stat.reply}</Text>
              </Stack.Item>
              <Stack.Item styles={{ root: style.block }}>
                <img src={coinIcon} style={style.icon} />
                <Text style={style.text}>{v.data.stat.coin}</Text>
              </Stack.Item>
              <Stack.Item styles={{ root: style.block }}>
                <img src={collectIcon} style={style.icon} />
                <Text style={style.text}>{v.data.stat.favorite}</Text>
              </Stack.Item>
              <Stack.Item styles={{ root: style.block }}>
                <img src={likeIcon} style={style.icon} />
                <Text style={style.text}>{v.data.stat.like}</Text>
              </Stack.Item>
              <Stack.Item styles={{ root: style.block }}>
                <img src={shareIcon} style={style.icon} />
                <Text style={style.text}>{v.data.stat.share}</Text>
              </Stack.Item>
            </Stack>
          </Stack.Item>
        </Stack>
      );
    });
  };

  return useObserver(() => (
    <Stack
      gap={15}
      style={{
        padding: 16,
      }}
    >
      <Stack.Item>
        <Text
          variant="xLargePlus"
          style={{
            color: "#fb7299",
          }}
        >
          视频数据分析
        </Text>
      </Stack.Item>
      <Stack.Item>{videoCard()}</Stack.Item>
    </Stack>
  ));
};
