import { Chart, Line, Point } from "bizcharts";
import React from "react";

export const BaseDataChart = function (source: any, name: string) {
  let data = [
    {
      date: "很久很久以前",
      value: 0,
    },
  ];
  for (let date in source.Data) {
    const text = source.Data[date]["总体数据.json"];
    if (text) {
      const valueData = JSON.parse(text);
      data.push({
        date: date,
        value: valueData[name],
      });
    }
  }

  if (data.length <= 1) {
    return null;
  }

  return (
    <Chart scale={{ value: { min: 0 } }} autoFit height={400} data={data}>
      <Line shape="smooth" position="date*value" />
      <Point position="date*value" />
    </Chart>
  );
};
