import React from "react";
import { HiArrowSmUp } from "react-icons/hi";

const SellChart = () => {
  return (
    <main>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
        {/* Card 1 - Research Hours */}
        <div className="py-5 px-6 bg-[#111217] card-gradient rounded-lg">
          <div className="w-full">
            <div className="flex items-center justify-between space-x-6">
              <h1
                style={{
                  background: "linear-gradient(to right, #3B82F6, #4F46E5)", // from-blue-500 to-indigo-600
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontSize: "1.875rem", // text-3xl
                  fontWeight: "bold",
                }}
              >
                ৳1,24,000
              </h1>

              <div className="bg-[#484949] py-1 px-4 flex items-center rounded-md">
                <HiArrowSmUp className="text-[#41B3A2]" />
                <p className="text-sm  font-semibold ml-1">+12%</p>
              </div>
            </div>
            <p className="pt-1 text-start">Total Sales This Month</p>
            <div className="pt-10">
              <div className="flex justify-between">
                <h1>260 hrs to Goal</h1>
                <p>83%</p>
              </div>
              <div className="w-full bg-gray-700 rounded mt-2 h-1">
                <div
                  className="bg-gradient-to-r from-blue-500 to-indigo-600 h-1 rounded"
                  style={{ width: "83%" }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2 - Papers Published */}
        <div className="py-5 px-6 bg-[#111217] card-gradient rounded-lg">
          <div className="w-full">
            <div className="flex items-center justify-between space-x-6">
              <h1
                style={{
                  background: "linear-gradient(to right, #06B6D4, #3B82F6)", // cyan-500 to blue-500
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontSize: "1.875rem", // text-3xl
                  fontWeight: "bold",
                }}
              >
                162 Customers
              </h1>

              <div className="bg-[#484949] py-1 px-4 flex items-center rounded-md">
                <HiArrowSmUp className="text-[#41B3A2]" />
                <p className="text-sm text-[#41B3A2] font-semibold ml-1">
                  +50%
                </p>
              </div>
            </div>
            <p className="pt-1 text-start">New Customers This Month</p>
            <div className="pt-10">
              <div className="flex justify-between">
                <h1>2 More to Goal</h1>
                <p>75%</p>
              </div>
              <div className="w-full bg-gray-700 rounded mt-2 h-1">
                <div
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 h-1 rounded"
                  style={{ width: "75%" }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Card 3 - Lab Experiments */}
        <div className="py-5 px-6 bg-[#111217] card-gradient rounded-lg">
          <div className="w-full">
            <div className="flex items-center justify-between space-x-6">
              <h1
                style={{
                  background: "linear-gradient(to right, #2563EB, #EC4899)", // from-blue-600 to-pink-500
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontSize: "1.875rem", // text-3xl
                  fontWeight: "bold",
                }}
              >
                320 Products
              </h1>

              <div className="bg-[#484949] py-1 px-4 flex items-center rounded-md">
                <HiArrowSmUp className="text-[#41B3A2]" />
                <p className="text-sm text-[#41B3A2] font-semibold ml-1">+8%</p>
              </div>
            </div>
            <p className="pt-1 text-start">Stock Updated This Month</p>
            <div className="pt-10">
              <div className="flex justify-between">
                <h1>3 Left to Goal</h1>
                <p>86%</p>
              </div>
              <div className="w-full bg-gray-700 rounded mt-2 h-1">
                <div
                  className="bg-gradient-to-r from-blue-600 to-pink-500 h-1 rounded"
                  style={{ width: "86%" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SellChart;
