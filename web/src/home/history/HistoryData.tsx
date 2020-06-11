import { useStore, showMessage } from "../../Store";
import {
  Stack,
  Text,
  Dropdown,
  IDropdownOption,
  Button,
} from "office-ui-fabric-react";
import React, { useEffect } from "react";
import { service } from "../../Service";
import { useLocalStore, useObserver } from "mobx-react-lite";
import { BaseDataChart } from "./charts/BaseDataChart";
import moment from "moment";
import { NoDataChart } from './charts/NoDataChart';

export const HistoryData: React.FunctionComponent = () => {
  const store = useStore();

  const localState = useLocalStore(() => ({
    type: "",
    data: {} as any,
  }));

  const fetchData = async (force = false) => {
    try {
      const res = await service.get("/api/data", {
        params: {
          id: store.user.id,
          force: force,
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

  const refreshHandler = () => {
    fetchData(true);
  };

  useEffect(() => {
    fetchData();
  }, []);

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
        return BaseDataChart(localState.data, "total_fans") || NoDataChart();
      case "newFans":
        return BaseDataChart(localState.data, "incr_fans") || NoDataChart();
      case "click":
        return BaseDataChart(localState.data, "total_click") || NoDataChart();
      case "newClick":
        return BaseDataChart(localState.data, "incr_click") || NoDataChart();
      default:
        return <div></div>;
    }
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
              个人数据分析
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
