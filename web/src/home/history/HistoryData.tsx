import { useStore, showMessage } from "../../Store";
import { Stack, Text, Dropdown, IDropdownOption } from "office-ui-fabric-react";
import React, { useEffect } from "react";
import { service } from "../../Service";
import { useLocalStore, useObserver } from "mobx-react-lite";
import { BaseDataChart } from "./charts/BaseDataChart";

export const HistoryData: React.FunctionComponent = () => {
  const store = useStore();

  const localState = useLocalStore(() => ({
    type: "",
    data: {} as any,
  }));

  const fetchData = async () => {
    try {
      const res = await service.get("/api/data", {
        params: {
          id: store.user.id,
        },
      });
      localState.data = res.data;
      localState.type = "fans";
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

  const noData = () => {
    return (
      <div
        style={{
          textAlign: "center",
        }}
      >
        <Text variant="xLarge">还没有数据呢</Text>
      </div>
    );
  };

  const onChangeItem = (
    event: React.FormEvent<HTMLDivElement>,
    option?: IDropdownOption,
    index?: number
  ) => {
    localState.type = option!.key as string;
  };

  const options: IDropdownOption[] = [
    { key: "fans", text: "粉丝总数目" },
    { key: "newFans", text: "新增粉丝数" },
    { key: "click", text: "视频播放量" },
    { key: "newClick", text: "新增播放量" },
  ];

  const chartView = () => {
    switch (localState.type) {
      case "fans":
        return BaseDataChart(localState.data, "total_fans") || noData();
      case "newFans":
        return BaseDataChart(localState.data, "incr_fans") || noData();
      case "click":
        return BaseDataChart(localState.data, "total_click") || noData();
      case "newClick":
        return BaseDataChart(localState.data, "incr_click") || noData();
      default:
        return <div></div>;
    }
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
          个人数据分析
        </Text>
      </Stack.Item>
      <Stack.Item>
        <Dropdown
          defaultSelectedKey={localState.type}
          label="请选择需要分析的数据"
          options={options}
          onChange={onChangeItem}
        />
      </Stack.Item>
      <Stack.Item
        styles={{
          root: {
            paddingTop: 24,
          },
        }}
      >
        {localState.type && chartView()}
      </Stack.Item>
    </Stack>
  ));
};
