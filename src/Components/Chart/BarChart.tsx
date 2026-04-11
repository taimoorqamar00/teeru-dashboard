import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
} from "recharts";

// Define the structure of each data point in the chart
interface ChartData {
  name: string;
  uv: number;
}

const data: ChartData[] = [
  { name: "Jan", uv: 80 },
  { name: "Feb", uv: 70 },
  { name: "Mar", uv: 50 },
  { name: "Apr", uv: 60 },
  { name: "May", uv: 30 },
  { name: "Jun", uv: 20 },
  { name: "Jul", uv: 45 },
  { name: "Aug", uv: 36 },
  { name: "Sep", uv: 53 },
  { name: "Oct", uv: 69 },
  { name: "Nov", uv: 78 },
  { name: "Dec", uv: 36 },
];

interface CustomTooltipProps {
  active?: boolean;
  payload?: { payload: ChartData; uv: number }[];
}

const Bar_Chart: React.FC = () => {
  // Custom tooltip to display the information
  const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white shadow-md p-2 rounded-md border border-gray-300">
          <p className="text-sm font-semibold text-gray-800">
            {payload[0].payload.name}
          </p>
          <p className="text-xs text-gray-600">
            Total Income:{" "}
            <span className="font-semibold">${payload[0].uv}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  // Custom tick style for X and Y axes
  const tickStyle = { fill: "#222222" };

  return (
    <div className="w-full h-80">
      <ResponsiveContainer>
        <BarChart
          data={data}
          margin={{
            top: 10,
            right: 20,
            left: 0,
            bottom: 0,
          }}
          barCategoryGap={30} // Adjust the gap between bars if necessary
        >
          <RechartsTooltip content={<CustomTooltip />} />
          <XAxis dataKey="name" tick={{ ...tickStyle }} tickMargin={6} />
          <YAxis
            tick={{ ...tickStyle }}
            axisLine={{
              stroke: "#0861C500", // Y-axis line color
              strokeWidth: 2,
              strokeDasharray: "7 7",
            }}
            tickMargin={16}
          />
          {/* Add several horizontal black lines using ReferenceLine */}
          <ReferenceLine y={10} stroke="#E5E5EF" />
          <ReferenceLine y={20} stroke="#E5E5EF" />
          <ReferenceLine y={30} stroke="#E5E5EF" />
          <ReferenceLine y={40} stroke="#E5E5EF" />
          <ReferenceLine y={50} stroke="#E5E5EF" />
          <ReferenceLine y={60} stroke="#E5E5EF" />
          <Bar
            dataKey="uv"
            fill="url(#incomeGradient)" // Bar color
            barSize={20} // Width of each bar
            radius={[10, 10, 10, 10]} // Rounded corners for bars
          />

          <defs>
            <linearGradient id="incomeGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#6A0DAD" />
              <stop offset="100%" stopColor="#8F59F9" />
            </linearGradient>
          </defs>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Bar_Chart;
