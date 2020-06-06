import { useStore } from "../../Store";
import { Stack } from "office-ui-fabric-react";
import React from "react";

export const RealTimeData: React.FunctionComponent = () => {
  const store = useStore();

  return (
    <Stack>
      <Stack.Item>实时数据</Stack.Item>
    </Stack>
  );
};
