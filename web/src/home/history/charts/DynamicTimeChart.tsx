import { Chart, Line, Point } from "bizcharts";
import React from "react";

export const DynamicTimeChart = function (source: any, id: string, type: string) {
  let data = [];
  for (let date in source.Data) {
    for (let fileName in source.Data[date]) {
        if (fileName.indexOf('动态列表数据_') !== 0) {
            continue
        }
        const text =  source.Data[date][fileName]
        const valueData = JSON.parse(text)
        let hasData = false
        for (let card of valueData.cards) {
            if (card.desc.dynamic_id_str === id) {
                hasData = true
                data.push({
                  date: date,
                  value: card.desc[type]
                });
                break
            }
        }
        if (hasData) {
            break
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
