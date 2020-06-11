import { useStore, showMessage } from "../../Store";
import {
  Stack,
  Text,
  StackItem,
  MessageBarType,
  mergeStyles,
  Shimmer,
  Button,
} from "office-ui-fabric-react";
import React, { useEffect, CSSProperties } from "react";
import { useLocalStore, useObserver } from "mobx-react-lite";
import axios from "axios";
import Radium from "radium";
import moment from "moment";

export const RealTimeData: React.FunctionComponent = Radium(() => {
  const store = useStore();
  const localState = useLocalStore(() => ({
    statData: {} as any,
  }));

  useEffect(() => {
    fetchStat();
  }, []);

  const refreshHandler = () => {
    fetchStat(true);
  };

  const fetchStat = async (force = false) => {
    try {
      const res = await axios.get("/api/stat", {
        params: {
          force: force,
        },
      });
      if (res.data.code == 0) {
        localState.statData = res.data.data;
        console.log(localState.statData);
      } else {
        showMessage(
          store,
          "获取实时数据失败:" + res.data.msg,
          MessageBarType.error
        );
      }
    } catch (err) {
      showMessage(store, "获取实时数据失败：" + err, MessageBarType.error);
      console.log(err);
    }
  };

  const renderDataCard = () => {
    if (localState.statData.total_click === undefined) {
      return <Shimmer />;
    }

    const items = [
      {
        title: "粉丝数",
        key: "fans",
        incKey: "incr_fans",
      },
      {
        title: "播放量",
        key: "click",
        incKey: "incr_click",
      },
      {
        title: "评论数",
        key: "reply",
        incKey: "incr_reply",
      },
      {
        title: "弹幕数",
        key: "dm",
        incKey: "incr_dm",
      },
      {
        title: "点赞数",
        key: "like",
        incKey: "inc_like",
      },
      {
        title: "分享数",
        key: "share",
        incKey: "inc_share",
      },
      {
        title: "硬币数",
        key: "coin",
        incKey: "inc_coin",
      },
      {
        title: "充电数",
        key: "elec",
        incKey: "inc_elec",
      },
      {
        title: "收藏数",
        key: "fav",
        incKey: "inc_fav",
      },
    ];

    return items.map((v) => (
      <div
        key={v.key}
        style={
          {
            background: "#ffffff",
            minWidth: 100,
            margin: "16px 16px 16px 0",
            padding: "8px 16px",
            boxShadow: "0 0 20px rgba(43,45,56,.08)",
            ":hover": {
              boxShadow:
                "0 5px 5px 0 rgba(154,160,185,.05), 0 5px 30px 0 rgba(166,173,201,.22)",
            },
            transition: "all .2s",
          } as CSSProperties
        }
      >
        <p
          style={{
            color: "#282c34",
            margin: "4px auto",
            userSelect: "none",
          }}
        >
          {v.title}
        </p>
        <p
          style={{
            color: "#00a1d7",
            fontSize: 26,
            margin: "12px auto",
            fontWeight: "bold",
          }}
        >
          {localState.statData["total_" + v.key]}
          <span
            style={{
              color: "#00a1d7",
              fontSize: 16,
              fontWeight: "normal",
              marginLeft: 8,
            }}
          >
            ↑{localState.statData[v.incKey]}
          </span>
        </p>
      </div>
    ));
  };

  return useObserver(() => (
    <Stack
      gap={8}
      style={{
        padding: 16,
      }}
    >
      <Stack.Item>
        <Stack horizontal>
          <Stack.Item>
            <Text
              variant="xLargePlus"
              style={{
                color: "#fb7299",
              }}
            >
              实时数据
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
            <Button text="刷新数据" onClick={refreshHandler} />
          </Stack.Item>
        </Stack>
      </Stack.Item>

      <Stack.Item>
        {localState.statData.time && (
          <Text
            style={{
              fontSize: 14,
              color: "#6999a7",
            }}
          >
            更新时间:
            {moment(localState.statData.time * 1000).format(
              "  YYYY-MM-DD HH:mm:ss"
            )}
          </Text>
        )}
      </Stack.Item>

      <StackItem>
        <Stack horizontal wrap>
          {renderDataCard()}
        </Stack>
      </StackItem>
    </Stack>
  ));
});
