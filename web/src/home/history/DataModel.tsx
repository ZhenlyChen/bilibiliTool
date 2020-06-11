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
import { VideoTimeChart } from "./charts/VideoTimeChart";
import { NoDataChart } from "./charts/NoDataChart";
import { VideoRatioChart } from "./charts/VideoRatioChart";
import { VideoQuitChart } from "./charts/VideoQuitChart";
import { VideoIncChart } from "./charts/VideoIncChart";
import { VideoIncRatioChart } from "./charts/VideoIncRatioChart";

const options: IDropdownOption[] = [
  { key: "play", text: "视频播放量" },
  { key: "like", text: "点赞数" },
  { key: "fav", text: "收藏数" },
  { key: "coin", text: "投币数" },
  { key: "likeToPlay", text: "点赞播放比" },
  { key: "favToPlay", text: "收藏播放比" },
  { key: "coinToPlay", text: "投币播放比" },
  { key: "quit", text: "前30s留存率" },
  { key: "addPlay", text: "新增播放量" },
  { key: "addLike", text: "新增点赞" },
  { key: "addFav", text: "新增收藏" },
  { key: "addCoin", text: "新增投币" },
  { key: "playRatio", text: "新增播放比例" },
];

export const DataModel = (
  data: any,
  id: string,
  isOpen: boolean,
  close: () => void
) => {
  const localState = useLocalStore(() => ({
    type: "play",
  }));

  const chartView = (type: string) => {
    switch (type) {
      case "play":
        return VideoTimeChart(data, id, "play") || NoDataChart();
      case "like":
        return VideoTimeChart(data, id, "like") || NoDataChart();
      case "fav":
        return VideoTimeChart(data, id, "fav") || NoDataChart();
      case "coin":
        return VideoTimeChart(data, id, "coin") || NoDataChart();
      case "likeToPlay":
        return VideoRatioChart(data, id, "like") || NoDataChart();
      case "coinToPlay":
        return VideoRatioChart(data, id, "coin") || NoDataChart();
      case "favToPlay":
        return VideoRatioChart(data, id, "fav") || NoDataChart();
      case "quit":
        return VideoQuitChart(data, id) || NoDataChart();
      case "addPlay":
        return VideoIncChart(data, id, "播放量") || NoDataChart();
      case "addLike":
        return VideoIncChart(data, id, "点赞") || NoDataChart();
      case "addCoin":
        return VideoIncChart(data, id, "硬币") || NoDataChart();
      case "addFav":
        return VideoIncChart(data, id, "收藏") || NoDataChart();
      case "playRatio":
        return VideoIncRatioChart(data, id, "播放量") || NoDataChart();
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
  if (id == "" || data.BV[id] == undefined) {
    return <div></div>;
  }
  const videoData = data.BV[id];

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
          <span id={titleId}>{videoData.Archive.title}</span>
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
                {videoData.stat.view}
              </Text>
            </Stack.Item>
            <Stack.Item className={contentStyles.iconBlock}>
              <img src={dmIcon} className={contentStyles.icon} />
              <Text className={contentStyles.iconText}>
                {videoData.stat.danmaku}
              </Text>
            </Stack.Item>
            <Stack.Item className={contentStyles.iconBlock}>
              <img src={commentIcon} className={contentStyles.icon} />
              <Text className={contentStyles.iconText}>
                {videoData.stat.reply}
              </Text>
            </Stack.Item>
            <Stack.Item className={contentStyles.iconBlock}>
              <img src={coinIcon} className={contentStyles.icon} />
              <Text className={contentStyles.iconText}>
                {videoData.stat.coin}
              </Text>
            </Stack.Item>
            <Stack.Item className={contentStyles.iconBlock}>
              <img src={collectIcon} className={contentStyles.icon} />
              <Text className={contentStyles.iconText}>
                {videoData.stat.favorite}
              </Text>
            </Stack.Item>
            <Stack.Item className={contentStyles.iconBlock}>
              <img src={likeIcon} className={contentStyles.icon} />
              <Text className={contentStyles.iconText}>
                {videoData.stat.like}
              </Text>
            </Stack.Item>
            <Stack.Item className={contentStyles.iconBlock}>
              <img src={shareIcon} className={contentStyles.icon} />
              <Text className={contentStyles.iconText}>
                {videoData.stat.share}
              </Text>
            </Stack.Item>
            <Stack.Item className={contentStyles.iconBlockW}>
              <img src={playIcon} className={contentStyles.icon} />/
              <img src={likeIcon} className={contentStyles.icon} />
              <Text className={contentStyles.iconText}>
                {(videoData.stat.view / videoData.stat.like).toFixed(2)}
              </Text>
            </Stack.Item>
            <Stack.Item className={contentStyles.iconBlockW}>
              <img src={playIcon} className={contentStyles.icon} />/
              <img src={coinIcon} className={contentStyles.icon} />
              <Text className={contentStyles.iconText}>
                {(videoData.stat.view / videoData.stat.coin).toFixed(2)}
              </Text>
            </Stack.Item>
            <Stack.Item className={contentStyles.iconBlockW}>
              <img src={playIcon} className={contentStyles.icon} />/
              <img src={collectIcon} className={contentStyles.icon} />
              <Text className={contentStyles.iconText}>
                {(videoData.stat.view / videoData.stat.favorite).toFixed(2)}
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
