"use client";

import React from "react";
import { MdOutlineDashboardCustomize } from "react-icons/md";
// import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { RiSignpostLine } from "react-icons/ri";
import { GiHumanTarget } from "react-icons/gi";
import Link from "next/link";

const WorkingModule = () => {
  const dispatch = useDispatch();
  // const { module } = useSelector((state) => state.module);

  return (
    <div className="space-y-4">
      <Link
        href={"/"}
        className={`px-3 py-2 flex items-center text-[#ADB5BD] gap-2 rounded text-sm capitalize active-sidebar  hover:bg-[#111217]  duration-200  cursor-pointer `}
      >
        <MdOutlineDashboardCustomize className="text-lg md:text-[22px]" />
        <span className="text-[16px] capitalize whitespace-nowrap">
          {" "}
          Dashboard{" "}
        </span>
      </Link>

      {module?.module_id === 0 && (
        <div
          onClick={
            () => dispatch()
            // addModule({
            //   module_id: 1,
            //   module_name: "Pos Module",
            //   module_color: "text-red-500",
            //   module_description:
            //     "This module is designed to manage and track sales, inventory, and customer data.",
            //   module_icon: "/assets/images/pos.png",
            // })
          }
          className={`px-3 py-2 flex items-center gap-2 rounded text-sm capitalize active-sidebar hover:bg-[#111217]  text-[#b5b7c8] duration-200  cursor-pointer
            `}
        >
          <RiSignpostLine className="text-lg" />
          <span className="text-[16px] capitalize whitespace-nowrap">
            {" "}
            POS Module{" "}
          </span>
        </div>
      )}
      {module?.module_id === 0 && (
        <div
          onClick={
            () => dispatch()
            // addModule({
            //   module_id: 2,
            //   module_name: "HR Module",
            //   module_color: "text-green-500",
            //   module_description:
            //     "This module streamlines human resource management by handling employee data, payroll, attendance, recruitment, and performance tracking efficiently.",
            //   module_icon: "/assets/images/pos.png",
            // })
          }
          className={`px-3 py-2 flex items-center active-sidebar  text-[#ADB5BD] hover:bg-[#111217] gap-2 rounded text-sm capitalize   duration-200  cursor-pointer
                `}
        >
          <GiHumanTarget className="text-lg" />
          <span className="text-[16px] capitalize whitespace-nowrap">
            HR Payroll
          </span>
        </div>
      )}
    </div>
  );
};

export default WorkingModule;
