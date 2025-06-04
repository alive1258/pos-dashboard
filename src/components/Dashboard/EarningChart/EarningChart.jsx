"use client";

import React, { PureComponent } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Brush,
  AreaChart,
  Area,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Sat",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Sun",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Mon",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Tue",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Wed",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Thu",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Fri",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

export default class EarningChart extends PureComponent {
  render() {
    return (
      <div style={{ width: "100%" }}>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart
            width={800}
            height={300}
            data={data}
            syncId="anyId"
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid vertical={false} strokeDasharray=".2" />
            <XAxis dataKey="name" />
            <YAxis axisLine={false} />
            <Tooltip />

            <Area
              type="monotone"
              dataKey="pv"
              stroke="#1E3A8A"
              fill="url(#blueGradient)"
              fillOpacity={0.6}
              activeDot={{ r: 0 }}
            />

            <Area
              type="monotone"
              dataKey="uv"
              stroke="#FF4234"
              fill="url(#redGradient)"
              fillOpacity={0.6}
              activeDot={{ r: 0 }}
            />

            <defs>
              <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1E3A8A" stopOpacity={0.6} />
                <stop offset="100%" stopColor="#1E3A8A" stopOpacity={0} />
              </linearGradient>

              <linearGradient id="redGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FF4234" stopOpacity={0.6} />
                <stop offset="100%" stopColor="#FF4234" stopOpacity={0} />
              </linearGradient>
            </defs>
          </AreaChart>
        </ResponsiveContainer>
      </div>
    );
  }
}
