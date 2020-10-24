import * as React from "react";
import {
  Nav,
  INavLink,
  INavStyles,
  INavLinkGroup,
} from "office-ui-fabric-react/lib/Nav";
import { Stack, Text, FontIcon, MessageBarType } from "office-ui-fabric-react";
import { useStore, showMessage } from "../Store";
import { UserInfo } from "../common/UserInfo";
import { useLocation } from "react-router";
import axios from "axios";

const navStyles: Partial<INavStyles> = {
  root: {
    height: "100%",
    width: 240,
    boxSizing: "border-box",
    overflowY: "auto",
  },
};

const navLinkGroups: INavLinkGroup[] = [
  {
    links: [
      {
        name: "实时数据",
        url: "/#/",
        key: "realTimeData",
      },
      {
        name: "个人数据分析",
        url: "/#/history",
        key: "history",
      },
      {
        name: "视频数据分析",
        url: "/#/video",
        key: "video",
      },
      {
        name: "动态数据分析",
        url: "/#/dynamics",
        key: "dynamics",
      },
      {
        name: "获取当日数据",
        url: "/#/task",
        key: "task",
      },
      {
        name: "退出当前账号",
        url: "/#/",
        key: "logout",
      },
    ],
  },
];

export const AppMenu: React.FunctionComponent = () => {
  const store = useStore();
  const location = useLocation();

  let key;
  if (location.pathname.indexOf("/history") === 0) {
    key = "history";
  } else if (location.pathname.indexOf("/task") === 0) {
    key = "task";
  } else if (location.pathname.indexOf("/video") === 0) {
    key = "video";
  } else if (location.pathname.indexOf("/dynamics") === 0) {
    key = "dynamics";
  } else {
    key = "realTimeData";
  }

  const logoutHandler = async () => {
    try {
      await axios.post("/api/logout");
      window.location.href = "/#/welcome";
    } catch (err) {
      showMessage(store, "退出登录失败" + err, MessageBarType.error);
      console.log(err);
    }
  };

  const _onLinkClick = (
    ev?: React.MouseEvent<HTMLElement>,
    item?: INavLink
  ) => {
    if (item && item.key === "logout") {
      logoutHandler();
    }
  };

  return (
    <Stack
      style={{
        height: "100vh",
        boxShadow: "0 0 20px rgba(43,45,56,.08)",
      }}
    >
      <Stack.Item
        styles={{
          root: {
            color: "#fb7299",
          },
        }}
      >
        <FontIcon
          iconName="CompassNW"
          style={{
            fontSize: 32,
            margin: "12px",
            verticalAlign: "middle",
            userSelect: "none",
          }}
        />
        <Text
          variant="large"
          style={{
            verticalAlign: "middle",
            marginLeft: 6,
            userSelect: "none",
          }}
        >
          B站数据统计工具
        </Text>
        {UserInfo(store.user.name, store.user.avatar)}
      </Stack.Item>
      <Stack.Item grow={1}>
        <Nav
          onLinkClick={_onLinkClick}
          selectedKey={key}
          styles={navStyles}
          groups={navLinkGroups}
        />
      </Stack.Item>
    </Stack>
  );
};
