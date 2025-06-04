"use client";
import { MdMenuOpen } from "react-icons/md";
import Link from "next/link";
import { useState } from "react";
import SidebarCard from "./SidebarCard";
import { useDispatch, useSelector } from "react-redux";
import { sidebarToggle } from "@/redux/features/adminSiteBerSlice";
import { SidebarItemsData } from "@/utils/dashboardSidebarData";
import WorkingModule from "./WorkingModule";

const Sidebar = ({ sidebarRef, sidebarMobileStatus }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [activeSidebar, setActiveSidebar] = useState(null);
  // const { module } = useSelector((state) => state.module);
  const dispatch = useDispatch();
  const handleToggle = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };
  const { sidebarStatus } = useSelector((state) => state.adminTree);

  return (
    <div
      ref={sidebarRef}
      className={`overflow-hidden bottom-0 w-[300px] h-screen top-0 text-[#E7EEF8] text-sm font-medium`}
    >
      <div
        className={`fixed bottom-0 top-[67px] lg:top-0 bg-primary-base left-0 w-[300px] ${
          sidebarStatus
            ? "-translate-x-full  duration-500  ease-in-out"
            : "-translate-x-0 duration-500  ease-in-out"
        }`}
      >
        <div className="border-t-2 border-t-[#131517]">
          {/* Logo and Sidebar Toggle Icon */}
          {!sidebarMobileStatus ? (
            <div className="border-b-[2px] border-[#131517] px-6 py-[26.5px]">
              <div className="flex items-center justify-between">
                <Link href="/">
                  <h2 className="logo">POS</h2>
                </Link>
                <MdMenuOpen
                  onClick={() => dispatch(sidebarToggle())}
                  className="text-2xl text-primary-muted cursor-pointer transition-transform duration-500 ease-in-out"
                />
              </div>
            </div>
          ) : (
            <div></div>
          )}
          {/* Sidebar Content */}
          <div className="px-2 pt-2 h-[90vh] sidebarScroll overflow-y-auto">
            <WorkingModule />
            {SidebarItemsData?.map((item, index) => (
              <SidebarCard
                key={index}
                index={index}
                item={item}
                activeSidebar={activeSidebar}
                setActiveSidebar={setActiveSidebar}
                onToggle={handleToggle}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
