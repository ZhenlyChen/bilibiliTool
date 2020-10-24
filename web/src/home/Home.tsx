import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import { AppMenu } from "./Menu";
import { useStore, showMessage } from "../Store";
import { MessageBarType, Stack } from "office-ui-fabric-react";
import { RealTimeData } from "./realTime/RealTimeData";
import { HistoryData } from "./history/HistoryData";
import { TaskPage } from "./task/TaskPage";
import { HistoryVideo } from "./history/HistoryVideo";
import { HistoryDynamics } from "./history/HistoryDynamics";

export const Home: React.FunctionComponent = () => {
  const store = useStore();
  if (store.user.id === 0) {
    window.location.href = "/#/welcome";
  }
  return (
    <Stack
      horizontal
      style={{
        minWidth: 700,
      }}
    >
      <Stack.Item>
        <AppMenu />
      </Stack.Item>
      <Stack.Item
        grow={1}
        styles={{
          root: {
            overflowY: "auto",
            height: "100vh",
            padding: "0 16px",
            background: "#fbfbfb",
          },
        }}
      >
        <Switch>
          <Route path="/history" component={HistoryData} />
          <Route path="/video" component={HistoryVideo} />
          <Route path="/dynamics" component={HistoryDynamics} />
          <Route path="/task" component={TaskPage} />
          <Route path="/" component={RealTimeData} />
        </Switch>
      </Stack.Item>
    </Stack>
  );
};
