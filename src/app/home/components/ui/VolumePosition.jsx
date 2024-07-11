import { BarChart } from "@mui/x-charts";
import React from "react";

const chartSetting = {
  yAxis: [
    {
      label: "Position Applications (apps)",
    },
  ],
};
const dataset = [
  { quantity: 25, position: "Developer" },
  { quantity: 12, position: "Marketing Manager" },
  { quantity: 8, position: "Sales Associate" },
  { quantity: 18, position: "Graphic Designer" },
  { quantity: 15, position: "Content Writer" },
  { quantity: 10, position: "Data Analyst" },
  { quantity: 7, position: "UX/UI Designer" },
  { quantity: 20, position: "Software Engineer" },
  { quantity: 3, position: "Human Resources" },
  { quantity: 13, position: "Product Manager" },
];
const valueFormatter = (value) => `${value} people`;

const VolumePosition = () => {
  return (
    <div className="w-full h-[400px]">
      <BarChart
        dataset={dataset}
        xAxis={[
          {
            scaleType: "band",
            dataKey: "position",
            categoryGapRatio: 0.3,
            barGapRatio: 0.1,
          },
        ]}
        borderRadius={8}
        series={[{ dataKey: "quantity", valueFormatter }]}
        {...chartSetting}
      />
    </div>
  );
};

export default VolumePosition;
