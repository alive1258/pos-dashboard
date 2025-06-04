"use client";

import dynamic from "next/dynamic";
import React, { PureComponent } from "react";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const data = [
  {
    name: "Jan",
    jan: 1200,
  },
  {
    name: "Feb",
    feb: 1000,
  },
  {
    name: "Mar",
    mar: 800,
  },
];

const Expenses = () => {
  return (
    <>
      <div className="bg-[#0b0c10] card px-1 py-1 rounded-lg w-full">
        <div className="z-50 p-1 w-full">
          <h3 className="text-[22px] mb-[34px text-white">Expenses</h3>
          <div className="flex flex-col items-center gap-8">
            {/* progress bar  */}
            <div className="w-full flex items-center justify-between">
              <div className="p-4 w-full rounded">
                <div>
                  <span className="text-xs text-[#787f90]">Jan</span>
                  <p className="text-base text-primary-muted font-medium">
                    $1200
                  </p>
                </div>
                <div className="w-full bg-gray-700 rounded h-1 mt-1">
                  <div
                    className="bg-[#5497FA] h-1 rounded"
                    style={{ width: "100%" }}
                  ></div>
                </div>
              </div>
              <div className="p-4 w-full rounded">
                <div>
                  <span className="text-xs text-text-[#787f90]">Feb</span>
                  <p className="text-base text-primary-muted font-medium">
                    $1000
                  </p>
                </div>
                <div className="w-full bg-gray-700 rounded h-1 mt-1">
                  <div
                    className="bg-[#FFB554] h-1 rounded"
                    style={{ width: "100%" }}
                  ></div>
                </div>
              </div>
              <div className="p-4 w-full rounded">
                <div>
                  <span className="text-xs text-text-[#787f90]">Mar</span>
                  <p className="text-base text-primary-muted font-medium">
                    $800
                  </p>
                </div>
                <div className="w-full bg-gray-700 rounded h-1 mt-1">
                  <div
                    className="bg-[#FF8077] h-1 rounded"
                    style={{ width: "100%" }}
                  ></div>
                </div>
              </div>
            </div>

            {/* chart  */}
            <ResponsiveContainer width="100%" height={272}>
              <BarChart width={300} height={272} data={data} barSize={40}>
                <CartesianGrid vertical={false} strokeDasharray=".2" />
                <YAxis axisLine={false} />
                <Bar dataKey="jan" fill="#4C8EFF" />
                <Bar dataKey="feb" fill="#FFA94D" />
                <Bar dataKey="mar" fill="#FF6B6B" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </>
  );
};

// export default Expenses;
export default dynamic(() => Promise.resolve(Expenses), { ssr: false });
