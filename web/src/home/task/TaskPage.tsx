import { useStore } from "../../Store";
import { Stack } from "office-ui-fabric-react";
import React from "react";

export const TaskPage: React.FunctionComponent = () => {
  const store = useStore();

  return (
    <Stack>
      <Stack.Item>任务</Stack.Item>
    </Stack>
  );
};
