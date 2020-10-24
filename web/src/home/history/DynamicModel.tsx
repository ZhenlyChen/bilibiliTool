import * as React from "react";
import { useId } from "@uifabric/react-hooks";
import {
  Modal,
  getTheme,
  mergeStyleSets,
  FontWeights,
  IconButton,
  IIconProps,
  Stack,
  Dropdown,
  IDropdownOption,
  Text,
} from "office-ui-fabric-react";
import { useLocalStore } from "mobx-react-lite";

const cancelIcon: IIconProps = { iconName: "Cancel" };

import playIcon from "../../images/play.svg";
import coinIcon from "../../images/coin.svg";
import collectIcon from "../../images/collect.svg";
import commentIcon from "../../images/comment.svg";
import dmIcon from "../../images/dm.svg";
import likeIcon from "../../images/like.svg";
import shareIcon from "../../images/share.svg";
import { DynamicTimeChart } from "./charts/DynamicTimeChart";
import { NoDataChart } from "./charts/NoDataChart";
import { VideoRatioChart } from "./charts/VideoRatioChart";
import { VideoQuitChart } from "./charts/VideoQuitChart";
import { VideoIncChart } from "./charts/VideoIncChart";
import { VideoIncRatioChart } from "./charts/VideoIncRatioChart";

const options: IDropdownOption[] = [
  { key: "view", text: "浏览量" },
  { key: "like", text: "点赞数" },
  { key: "comment", text: "回复数" },
  { key: "repost", text: "转发数" }
];

export const DynamicModel = (
  data: any,
  id: string,
  isOpen: boolean,
  close: () => void
) => {
  const localState = useLocalStore(() => ({
    type: "view",
  }));

  const chartView = (type: string) => {
    switch (type) {
      case "view":
        return DynamicTimeChart(data, id, "view") || NoDataChart();
      case "like":
        return DynamicTimeChart(data, id, "like") || NoDataChart();
      case "comment":
        return DynamicTimeChart(data, id, "comment") || NoDataChart();
      case "repost":
        return DynamicTimeChart(data, id, "repost") || NoDataChart();
      default:
        return <div></div>;
    }
  };

  const onChangeItem = (
    event: React.FormEvent<HTMLDivElement>,
    option?: IDropdownOption,
    index?: number
  ) => {
    localState.type = option!.key as string;
  };

  const titleId = useId("title");
  if (id == "" || data.Dynamics[id] == undefined) {
    return <div></div>;
  }
  const dynamicData = data.Dynamics[id];

  return (
    <Modal
      titleAriaId={titleId}
      isOpen={isOpen}
      onDismiss={() => {
        isOpen = false;
      }}
      containerClassName={contentStyles.container}
    >
      <Stack
        gap={8}
        style={{
          minHeight: "80vh",
          minWidth: "80vw",
        }}
      >
        <Stack.Item className={contentStyles.header}>
          <span id={titleId}>动态数据详情</span>
          <IconButton
            styles={iconButtonStyles}
            iconProps={cancelIcon}
            onClick={close}
          />
        </Stack.Item>
        <Stack.Item>
          <Stack
            horizontal
            wrap
            style={{
              marginLeft: 28,
            }}
          >
            <Stack.Item className={contentStyles.iconBlock}>
              <img src={playIcon} className={contentStyles.icon} />
              <Text className={contentStyles.iconText}>
                {dynamicData.desc.view}
              </Text>
            </Stack.Item>
            <Stack.Item className={contentStyles.iconBlock}>
              <img src={shareIcon} className={contentStyles.icon} />
              <Text className={contentStyles.iconText}>
                {dynamicData.desc.repost}
              </Text>
            </Stack.Item>
            <Stack.Item className={contentStyles.iconBlock}>
              <img src={commentIcon} className={contentStyles.icon} />
              <Text className={contentStyles.iconText}>
              {dynamicData.desc.comment}
              </Text>
            </Stack.Item>
            <Stack.Item className={contentStyles.iconBlock}>
              <img src={likeIcon} className={contentStyles.icon} />
              <Text className={contentStyles.iconText}>
              {dynamicData.desc.like}
              </Text>
            </Stack.Item>
          </Stack>
        </Stack.Item>
        <Stack.Item
          styles={{
            root: {
              padding: "0 28px",
            },
          }}
        >
          <Dropdown
            defaultSelectedKey={localState.type}
            label="请选择需要分析的数据"
            options={options}
            onChange={onChangeItem}
          />
        </Stack.Item>
        <Stack.Item grow={1} className={contentStyles.body}>
          {chartView(localState.type)}
        </Stack.Item>
      </Stack>
    </Modal>
  );
};

const theme = getTheme();
const contentStyles = mergeStyleSets({
  container: {
    minWidth: 600,
    display: "flex",
    flexFlow: "column nowrap",
    alignItems: "stretch",
  },
  header: [
    // tslint:disable-next-line:deprecation
    theme.fonts.xLargePlus,
    {
      borderTop: `4px solid #ff709f`,
      color: "#ff709f",
      display: "flex",
      alignItems: "center",
      fontWeight: FontWeights.semibold,
      padding: "12px 12px 14px 24px",
    },
  ],
  body: {
    flex: "4 4 auto",
    padding: "0 24px 24px 24px",
    overflowY: "hidden",
    selectors: {
      p: { margin: "14px 0" },
      "p:first-child": { marginTop: 0 },
      "p:last-child": { marginBottom: 0 },
    },
  },
  icon: {
    height: 16,
    width: 16,
    verticalAlign: "middle",
  },
  iconBlock: {
    minWidth: 60,
  },
  iconBlockW: {
    minWidth: 120,
  },
  iconText: {
    margin: "6px",
    fontSize: 12,
    verticalAlign: "middle",
    color: "#999999",
  },
});
const iconButtonStyles = {
  root: {
    color: theme.palette.neutralPrimary,
    marginLeft: "auto",
    marginTop: "4px",
    marginRight: "2px",
  },
  rootHovered: {
    color: theme.palette.neutralDark,
  },
};
