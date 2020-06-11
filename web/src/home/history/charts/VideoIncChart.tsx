import { Chart, Line, Point } from "bizcharts";
import React from "react";

export const VideoIncChart = function (source: any, id: string, type: string) {
  let data = [] as any;
  for (let date in source.Data) {
    const text = source.Data[date]["增量来源_" + type + ".json"];
    if (text) {
      const valueData = JSON.parse(text);
      for (const obj in valueData) {
        let hasData = false;
        for (const v of valueData[obj].arc_inc) {
          if (v.bvid === id) {
            data.push({
              date: date,
              value: v.incr,
            });
            hasData = true;
            break;
          }
        }
        if (!hasData) {
          data.push({
            date: date,
            value: 0,
          });
        }
        break;
      }
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
