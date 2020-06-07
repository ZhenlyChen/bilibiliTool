import { useStore, showMessage } from "../../Store";
import { Stack, Text } from "office-ui-fabric-react";
import React, { useEffect } from "react";
import { service } from "../../Service";

export const HistoryVideo: React.FunctionComponent = () => {
  const store = useStore();

  const fetchData = async () => {
    try {
      const res = await service.get("/api/data", {
        params: {
          id: store.user.id,
        },
      });
      console.log(res);
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

  return (
    <Stack gap={15}>
      <Stack.Item>
        <Text
          variant="xLargePlus"
          style={{
            padding: 16,
            color: "#fb7299",
          }}
        >
          视频数据分析
        </Text>
      </Stack.Item>
      <Stack.Item></Stack.Item>
    </Stack>
  );
};
