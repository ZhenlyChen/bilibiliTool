import { useStore, showMessage } from "../../Store";
import { Stack, Text, Button } from "office-ui-fabric-react";
import React, { useEffect } from "react";
import { service } from "../../Service";
import { useLocalStore, useObserver } from "mobx-react-lite";

import moment from "moment";
import { VideoCard } from "./VideoCard";
import { DataModel } from "./DataModel";

export const HistoryVideo: React.FunctionComponent = () => {
  const store = useStore();

  const localState = useLocalStore(() => ({
    isOpen: false,
    selectId: "",
    data: {} as any,
  }));

  const refreshHandler = () => {
    fetchData(true);
  };

  const fetchData = async (force = false) => {
    try {
      const res = await service.get("/api/data", {
        params: {
          id: store.user.id,
          force: force,
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

  const onClickVideo = (id: string) => {
    if (localState.data.BV[id].Archive.state !== 0) {
      return;
    }
    localState.selectId = id;
    localState.isOpen = true;
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
              视频数据分析
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
        {localState.data.Time && (
          <Text
            style={{
              fontSize: 14,
              color: "#6999a7",
            }}
          >
            更新时间:
            {moment(localState.data.Time * 1000).format(
              "  YYYY-MM-DD HH:mm:ss"
            )}
          </Text>
        )}
      </Stack.Item>
      <Stack.Item>{VideoCard(localState.data, onClickVideo)}</Stack.Item>
      {DataModel(
        localState.data,
        localState.selectId,
        localState.isOpen,
        () => {
          localState.isOpen = false;
        }
      )}
    </Stack>
  ));
};
