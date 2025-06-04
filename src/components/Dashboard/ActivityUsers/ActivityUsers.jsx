"use client";

import { HiArrowSmUp, HiDotsVertical } from "react-icons/hi";
import UserData from "./UserData";
import { FaTabletAlt, FaTv } from "react-icons/fa";
import { FaMobileRetro } from "react-icons/fa6";

const ActivityUsers = () => {
  // Array of percentages for each progress bar
  const percentages = [20, 30, 40, 50, 60, 70, 80, 90, 95]; // Adjust these values as needed

  // Function to calculate strokeDashoffset based on percentage
  const calculateStrokeDashoffset = (percentage) => {
    const radius = 100; // Radius of the circle
    const circumference = 2 * Math.PI * radius; // Full circumference
    return circumference - (circumference * percentage) / 100;
  };

  // Dynamic percentage value for the circular progress bar
  const circularProgressPercentage = 95; // Adjust this as needed or make it dynamic

  return (
    <main className="grid lg:grid-cols-4 md:grid-cols-2 gap-5">
      {/* Device Type with Dynamic Circular Progress */}
      <div className="bg-[#0b0c10] card px-4 py-4 rounded-lg ">
        <div className="z-50 w-full px-1">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold">Device Type</h1>
            <HiDotsVertical className="text-2xl font-semibold" />
          </div>
          <p className="pt-1 text-lg">Total Users</p>

          <div className="pt-4 flex items-center justify-center relative">
            <svg width="250" height="250" className="transform rotate-90">
              {/* First color segment */}
              <circle
                cx="120"
                cy="120"
                r="100"
                stroke="#D91656" // First color
                strokeWidth="30"
                fill="none"
                strokeDasharray="212.06 636.17" // Adjusted for 25%
                strokeDashoffset="0"
              />
              {/* Second color segment */}
              <circle
                cx="120"
                cy="120"
                r="100"
                stroke="#FEEC37" // Second color
                strokeWidth="30"
                fill="none"
                strokeDasharray="212.06 636.17"
                strokeDashoffset="-212.06" // Offset to start after the first segment
              />
              {/* Third color segment */}
              <circle
                cx="120"
                cy="120"
                r="100"
                stroke="#41B3A2" // Third color
                strokeWidth="30"
                fill="none"
                strokeDasharray="212.06 636.17"
                strokeDashoffset="-424.12" // Offset to start after the second segment
              />
              {/* Fourth color segment */}
              <circle
                cx="120"
                cy="120"
                r="100"
                stroke="#6A5ACD" // Fourth color
                strokeWidth="30"
                fill="none"
                strokeDasharray="212.06 636.17"
                strokeDashoffset="-636.18" // Offset to start after the third segment
              />
            </svg>

            {/* Centered dynamic percentage text */}
            <span className="absolute text-xl font-semibold text-[#fff]">
              <div className="text-center">
                <p className="text-2xl font-bold">70%</p>
                <p>Total Views</p>
              </div>
            </span>
          </div>

          <div className="pt-1 text-lg">
            <div className="flex space-x-4 items-center">
              <div>
                <FaTv className="text-[#D91656] text-lg" />
              </div>
              <div>
                {" "}
                <div className="w-52 bg-gray-700 rounded  h-2">
                  <div
                    // className="bg-[#5497FA] h-1 rounded"
                    className="bg-[#e4365e] h-2 rounded"
                    style={{ width: "30%" }}
                  ></div>
                </div>
              </div>
              <div>30%</div>
            </div>
            <div className="flex space-x-4 items-center">
              <div>
                <FaTabletAlt className="text-[#FEEC37] text-lg" />
              </div>
              <div>
                {" "}
                <div className="w-52 bg-gray-700 rounded  h-2">
                  <div
                    // className="bg-[#5497FA] h-1 rounded"
                    className="bg-[#FEEC37] h-2 rounded"
                    style={{ width: "40%" }}
                  ></div>
                </div>
              </div>
              <div>40%</div>
            </div>
            <div className="flex space-x-4 items-center">
              <div>
                <FaMobileRetro className="text-[#6A5ACD] text-lg" />
              </div>
              <div>
                {" "}
                <div className="w-52 bg-gray-700 rounded  h-2">
                  <div
                    // className="bg-[#5497FA] h-1 rounded"
                    className="bg-[#6A5ACD] h-2 rounded"
                    style={{ width: "60%" }}
                  ></div>
                </div>
              </div>
              <div>60%</div>
            </div>
          </div>
        </div>
      </div>

      {/* Active Users */}
      <div className="py-5 box px-4 bg-[#0b0c10] rounded-lg">
        <div className="z-50  w-full px-1">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold">42.5K</h1>
            <HiDotsVertical className="text-2xl font-semibold" />
          </div>
          <p className="pt-1 text-lg">Active Users</p>
          <div className="grid grid-cols-9  space-x-2">
            {percentages.map((percentage, index) => (
              <div key={index} className="flex flex-col items-center gap-1">
                <div className="h-60 w-3 rounded mt-2 flex items-end">
                  <div
                    className="bg-gradient-to-t from-indigo-500 to-[#e4365e] w-full rounded"
                    style={{ height: `${percentage}%` }}
                  ></div>
                </div>
                <HiArrowSmUp className="text-indigo-500" />
                <span className="text-gray-300">{percentage}%</span>
              </div>
            ))}
          </div>
          <p className="pt-3 text-lg">24k users increased from last month</p>
        </div>
      </div>

      {/* Total Users */}
      <div className="bg-[#0b0c10] card px-2 py-2 rounded-lg ">
        <div className="z-50 p-1 w-full ">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold">55.5K</h1>
            <HiDotsVertical className="text-2xl font-semibold" />
          </div>
          <p className="pt-1 text-lg">Total Users</p>
          <UserData />
          <p className="pt-2 text-lg">
            <span className="text-[#41B3A2]">1.24% </span> from last month
          </p>
        </div>
      </div>

      {/* Monthly Revenue with Dynamic Circular Progress */}
      <div className="bg-[#0b0c10] box rounded-lg w-full">
        <div className="z-50 p-4 w-full">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold">Monthly Review</h1>
            <HiDotsVertical className="text-2xl font-semibold" />
          </div>
          <p className="pt-1 text-lg">Total Users</p>

          <div className="pt-4 flex items-center justify-center relative">
            <svg width="250" height="250" className="transform -rotate-0">
              <defs>
                <linearGradient id="circleGradient">
                  <stop offset="0%" stopColor="#D91656" />
                  <stop offset="100%" stopColor="#FEEC37" />
                </linearGradient>
              </defs>
              {/* Background Circle */}
              <circle
                cx="120"
                cy="120"
                r="100"
                stroke="none"
                strokeWidth="30"
                fill="none"
              />
              {/* Foreground Circle */}
              <circle
                cx="120"
                cy="120"
                r="100"
                stroke="url(#circleGradient)"
                strokeWidth="30"
                fill="none"
                strokeDasharray="628.32" // Circumference for r = 100
                strokeDashoffset={calculateStrokeDashoffset(
                  circularProgressPercentage
                )}
              />
              {/* Centered dynamic percentage text */}
              <text
                x="50%"
                y="50%"
                textAnchor="middle"
                fill="#fff"
                fontSize="24px"
                fontWeight="bold"
                dy=".3em"
              >
                {circularProgressPercentage}%
              </text>
            </svg>
          </div>

          <p className="pt-3 text-lg">
            <span className="text-[#41B3A2]">1.24% </span> from last month
          </p>
        </div>
      </div>
      {/* <div className="my-44 bdy">
        <div className="containerRing">
          <div className="ring"></div>
          <div className="ring"></div>
          <div className="ring"></div>
        </div>
      </div> */}
    </main>
  );
};

export default ActivityUsers;
