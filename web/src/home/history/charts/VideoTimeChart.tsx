import { Chart, Line, Point } from "bizcharts";
import React from "react";

export const VideoTimeChart = function (source: any, id: string, type: string) {
  let data = [];
  for (let date in source.Data) {
    const text = source.Data[date]["视频数据_" + id + ".json"];
    if (text) {
      const valueData = JSON.parse(text);
      data.push({
        date: date,
        value: valueData.stat[type],
      });
    }
  }

  if (data.length < 1) {
    return null;
  }

  return (
    <Chart
      key={type}
      autoFit
      height={300}
      data={data}
      padding={[10, 40, 50, 40]}
    >
      <Line shape="smooth" position="date*value" />
      <Point position="date*value" />
      <div
        style={{
          display: "none",
        }}
      >
        {type}
      </div>
    </Chart>
  );
};
