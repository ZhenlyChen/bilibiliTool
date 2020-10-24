import { Chart, Legend, Axis, Tooltip, Geom } from "bizcharts";
import React from "react";

export const VideoQuitChart = function (source: any, id: string) {
  let data = [] as any[];
  let keys = [] as number[];
  for (let date in source.Data) {
    const baseText = source.Data[date]["视频基本数据_" + id + ".json"];
    if (baseText) {
      const valueData = JSON.parse(baseText);
      for (const video of valueData.videos) {
        if (!keys.includes(video.cid)) {
          keys.push(video.cid);
        }
      }
      for (const i in keys) {
        const text = source.Data[date]["视频留存率数据_" + keys[i] + ".json"];
        if (text) {
          const quitData = JSON.parse(text);
          if (quitData !== null) {
            data.push({
              date: date,
              id: "P" + (parseInt(i) + 1).toString(),
              value: quitData[0] / 100,
            });
          }
        }
      }
    }
  }

  if (data.length < 1) {
    return null;
  }

  return (
    <Chart
      height={300}
      data={data}
      forceFit
      scale={{
        date: {
          range: [0, 1],
        },
        value: {
          type: "linear",
          formatter: (val) => {
            return val + "%";
          },
          tickCount: 5,
          ticks: ["0", "25", "50", "75", "100"],
        },
      }}
    >
      <Legend />
      <Axis name="date" />
      <Axis name="value" />
      <Tooltip
        crosshairs={{
          type: "y",
        }}
      />
      <Geom
        type="line"
        position="date*value"
        size={2}
        shape={"smooth"}
        color={["value","#ffeeee-#ff6565"]}
      />
      <Geom
        type="point"
        position="date*value"
        size={4}
        shape={"circle"}
        color={["value","#ffeeee-#ff6565"]}
        style={{
          stroke: "#fff",
          lineWidth: 1,
        }}
      />
    </Chart>
  );
};
