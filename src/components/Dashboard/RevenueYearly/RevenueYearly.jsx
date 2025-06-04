"use client";

import dynamic from "next/dynamic";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const data = [
  { name: "Online Sales", value: 32000 },
  { name: "In-Store Sales", value: 18000 },
];

const COLORS = ["#38B2AC", "#F56565"]; // teal-500, red-500

const RevenueYearly = () => (
  <div className="bg-primary-base box px-4 py-6 rounded-lg w-full">
    <div className="z-50 p-2 w-full">
      <h3 className="text-[22px] text-white mb-4">Revenue Breakdown</h3>
      <div className="flex flex-col items-center">
        <div className="w-full text-center text-white">
          <ResponsiveContainer width="100%" height={182}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                startAngle={90}
                endAngle={450}
                paddingAngle={0}
                dataKey="value"
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-6 mt-6 w-full px-4">
          {data.map((item, index) => (
            <div key={index} className="w-full">
              <div className="bg-gray-700 rounded h-1 mb-1">
                <div
                  className="h-1 rounded"
                  style={{
                    backgroundColor: COLORS[index],
                    width: `${
                      (item.value /
                        data.reduce((acc, cur) => acc + cur.value, 0)) *
                      100
                    }%`,
                  }}
                ></div>
              </div>
              <span className="text-xs text-secondary-base block">
                {item.name}
              </span>
              <p className="text-base text-primary-muted font-medium">
                ${item.value.toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default dynamic(() => Promise.resolve(RevenueYearly), { ssr: false });
