import React, { useEffect } from "react";
import {
  Stack,
  Text,
  PrimaryButton,
  MessageBarType,
} from "office-ui-fabric-react";
import { Spinner, SpinnerSize } from "office-ui-fabric-react/lib/Spinner";
import { useStore, showMessage } from "../Store";
import { useObserver } from "mobx-react-lite";
import axios from "axios";
import { UserInfo } from "../common/UserInfo";

export const WelcomePage: React.FunctionComponent = () => {
  const store = useStore();
  console.log(store.user.name);

  const fetchUser = async () => {
    try {
      const res = await axios.get("/api/user");
      if (res.data.code == 0) {
        store.user.name = res.data.data.uname;
        store.user.id = res.data.data.mid;
        store.user.avatar = res.data.data.face;
        setTimeout(() => {
          window.location.href = "/#/";
        }, 500);
      } else {
        store.user.id = -1;
      }
    } catch (err) {
      showMessage(store, "获取登录状态失败：" + err, MessageBarType.error);
      console.log(err);
    }
  };

  const loginHandler = async () => {
    try {
      const res = await axios.post("/api/login");
      if (res.data.Code === 0) {
        fetchUser();
      } else {
        showMessage(
          store,
          "调用登录接口失败：" + res.data.Msg,
          MessageBarType.error
        );
      }
    } catch (err) {
      showMessage(store, "调用登录接口失败：" + err, MessageBarType.error);
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return useObserver(() => (
    <Stack
      horizontalAlign="center"
      verticalAlign="center"
      verticalFill
      styles={{
        root: {
          height: "90vh",
          textAlign: "center",
          color: "#fb7299",
          userSelect: "none",
        },
      }}
      gap={15}
    >
      <Text
        variant="xLarge"
        styles={{
          root: {
            margin: "6px",
            userSelect: "none",
          },
        }}
      >
        B站创作中心数据统计工具
      </Text>
      <Text>
        {store.user.id === -1 ? (
          <PrimaryButton text="登录账号" onClick={loginHandler} />
        ) : (
          store.user.id !== 0 && UserInfo(store.user.name, store.user.avatar)
        )}
      </Text>

      {store.user.id !== -1 && <Spinner size={SpinnerSize.large} />}
    </Stack>
  ));
};
