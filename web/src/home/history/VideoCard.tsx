import { Text, Stack, mergeStyleSets } from "office-ui-fabric-react";
import React, { CSSProperties } from "react";
import moment from "moment";

import playIcon from "../../images/play.svg";
import coinIcon from "../../images/coin.svg";
import collectIcon from "../../images/collect.svg";
import commentIcon from "../../images/comment.svg";
import dmIcon from "../../images/dm.svg";
import likeIcon from "../../images/like.svg";
import shareIcon from "../../images/share.svg";

const getDuration = (d: number) => {
  const hour = Math.floor(d / 60);
  const min = d % 60;
  return (hour < 10 ? "0" : "") + hour + ":" + (min < 10 ? "0" : "") + +min;
};

export const VideoCard = function (data: any, onClick: (id: string) => void) {
  if (data.BV === undefined) {
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
  for (const i in data.BV) {
    videos.push({
      id: i,
      data: data.BV[i],
    });
  }

  return videos.map((v) => {
    const style = mergeStyleSets({
      videoCard: {
        background: "#fff",
        boxShadow:
          "0 5px 5px 0 rgba(154,160,185,.05), 0 5px 20px 0 rgba(166,173,201,.11)",
        selectors: {
          ":hover": {
            boxShadow:
              "0 5px 5px 0 rgba(154,160,185,.05), 0 5px 30px 0 rgba(166,173,201,.22)",
          },
        },
        transition: "all .2s",
        cursor: v.data.Archive.state === 0 ? "pointer" : "auto",
        borderRadius: 4,
        margin: "16px 0",
        minWidth: 540,
        padding: 12,
      },
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
    });

    return (
      <Stack
        key={v.data.Archive.bvid}
        horizontal
        verticalAlign="center"
        gap={12}
        className={style.videoCard}
        onClick={() => {
          onClick(v.data.Archive.bvid);
        }}
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
              color: v.data.Archive.state !== 0 ? "#999" : "#000",
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
            {moment(v.data.Archive.ptime * 1000).format("YYYY-MM-DD HH:mm:ss")}
            {v.data.Archive.state !== 0 && (
              <Text
                style={{
                  marginLeft: 12,
                }}
              >
                {v.data.Archive.state_desc}
              </Text>
            )}
          </p>
          <Stack
            horizontal
            wrap
            style={{
              padding: 8,
            }}
          >
            <Stack.Item className={style.block}>
              <img src={playIcon} className={style.icon} />
              <Text className={style.text}>{v.data.stat.view}</Text>
            </Stack.Item>
            <Stack.Item className={style.block}>
              <img src={dmIcon} className={style.icon} />
              <Text className={style.text}>{v.data.stat.danmaku}</Text>
            </Stack.Item>
            <Stack.Item className={style.block}>
              <img src={commentIcon} className={style.icon} />
              <Text className={style.text}>{v.data.stat.reply}</Text>
            </Stack.Item>
            <Stack.Item className={style.block}>
              <img src={coinIcon} className={style.icon} />
              <Text className={style.text}>{v.data.stat.coin}</Text>
            </Stack.Item>
            <Stack.Item className={style.block}>
              <img src={collectIcon} className={style.icon} />
              <Text className={style.text}>{v.data.stat.favorite}</Text>
            </Stack.Item>
            <Stack.Item className={style.block}>
              <img src={likeIcon} className={style.icon} />
              <Text className={style.text}>{v.data.stat.like}</Text>
            </Stack.Item>
            <Stack.Item className={style.block}>
              <img src={shareIcon} className={style.icon} />
              <Text className={style.text}>{v.data.stat.share}</Text>
            </Stack.Item>
          </Stack>
        </Stack.Item>
      </Stack>
    );
  });
};
