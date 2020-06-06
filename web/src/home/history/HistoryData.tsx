import { useStore } from "../../Store";
import { Stack } from "office-ui-fabric-react";
import React from "react";

export const HistoryData: React.FunctionComponent = () => {
  const store = useStore();

  return (
    <Stack>
      <Stack.Item>历史数据</Stack.Item>
    </Stack>
  );
};
