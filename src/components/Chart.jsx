import React from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const formatChartData = (comparisonData) => {
  const timestamps = comparisonData[0]?.data.list.map((item) => item.dt_txt) || [];
  return timestamps.map((timestamp, index) => {
    const entry = { time: timestamp };
    comparisonData.forEach(({ city, data }) => {
      entry[city] = data.list[index]?.main?.temp;
    });
    return entry;
  });
};

const Chart = ({ data }) => {
  const chartData = formatChartData(data);

  const colors = ["#8884d8", "#82ca9d", "#ff7300"];

  return (
    <div style={{ width: "100%", height: 400 }}>
      <ResponsiveContainer>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" tickFormatter={(t) => t.slice(11, 16)} />
          <YAxis domain={["auto", "auto"]} />
          <Tooltip />
          <Legend />
          {data.map((cityData, i) => (
            <Line
              key={cityData.city}
              type="monotone"
              dataKey={cityData.city}
              stroke={colors[i % colors.length]}
              strokeWidth={2}
              dot={false}
              animationDuration={700}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
