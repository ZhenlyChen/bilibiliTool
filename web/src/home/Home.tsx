import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import { AppMenu } from "./Menu";
import { useStore, showMessage } from "../Store";
import { MessageBarType, Stack } from "office-ui-fabric-react";
import { RealTimeData } from "./realTime/RealTimeData";
import { HistoryData } from "./history/HistoryData";
import { TaskPage } from "./task/TaskPage";

export const Home: React.FunctionComponent = () => {
  const store = useStore();

  return (
    <Stack horizontal>
      <Stack.Item>
        <AppMenu />
      </Stack.Item>
      <Stack.Item
        grow={1}
        styles={{
          root: {
            padding: 16,
          },
        }}
      >
        <Switch>
          <Route path="/history" component={HistoryData} />
          <Route path="/task" component={TaskPage} />
          <Route path="/" component={RealTimeData} />
        </Switch>
      </Stack.Item>
    </Stack>
  );
};
