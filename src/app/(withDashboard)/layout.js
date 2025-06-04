"use client";

import Footer from "@/components/common/Footer/Footer";
import Navbar from "@/components/common/Navbar/Navbar";
import Sidebar from "@/components/Dashboard/Sidebar/Sidebar";
import { useGetMyProfileQuery } from "@/redux/api/authApi";
import { sidebarMobileToggle } from "@/redux/features/adminSiteBerSlice";
import { storeUser } from "@/redux/features/authSlice";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
const DashboardLayout = ({ children }) => {
  const sidebarRef = useRef(null);
  const dispatch = useDispatch();
  // Add your custom styles here and return the layout component.
  const { sidebarMobileStatus, sidebarStatus } = useSelector(
    (state) => state.adminTree
  );

  const { user: userData } = useSelector((state) => state?.auth);

  // get my information
  const { data: myInfo } = useGetMyProfileQuery();
  const user = myInfo?.data?.user;

  useEffect(() => {
    if (user && !userData) {
      dispatch(storeUser({ email: user?.email, role: user?.role }));
    }
  }, [user, userData, dispatch]);
  // Handle clicking outside to close the dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        dispatch(sidebarMobileToggle());
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dispatch]);

  return (
    <>
      <div className={`bg-[#0D0E12] text-[#b5b7c8] `}>
        <div className="flex items-start lg:gap-1  duration-300">
          <div>
            <div
              className={`border-r border-[#26272F] ${
                sidebarStatus
                  ? "-translate-x-full  duration-500  ease-in-out"
                  : " duration-500  ease-in-out"
              }`}
            >
              {!sidebarStatus && (
                <div className="hidden lg:block ">
                  <Sidebar role={user?.role} />
                </div>
              )}
            </div>

            {sidebarMobileStatus && (
              <div className=" lg:hidden  top-16 fixed bg-[#0B0C10]  h-full overflow-y-auto w-full z-[999]  ">
                <Sidebar
                  role={user?.role}
                  sidebarMobileStatus={sidebarMobileStatus}
                  sidebarRef={sidebarRef}
                />
              </div>
            )}
          </div>
          <div className="w-full min-h-screen flex flex-col">
            <Navbar user={user} />
            <div className="flex-grow min-h-[1000px]">{children}</div>
            <Footer className="bottom-0 " />
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
