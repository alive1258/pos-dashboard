import Image from "next/image";
import React from "react";
import { AiOutlineMessage } from "react-icons/ai";
// import flags_us from "../../../app/assets/images/circle-flags_us-betsy-ross.png";
import { MdOutlineNightlight } from "react-icons/md";
import { IoNotificationsOutline } from "react-icons/io5";
// import profile from "../../../app/assets/images/profile.png";
import { IoIosArrowDown } from "react-icons/io";
import NavbarSearch from "./NavbarSearch";

const MobileScreenProfileModal = () => {
  return (
    <div className="fixed top-[76px] left-0 right-0 bg-primary-base w-full py-10 z-[1000] px-4 overflow-hidden animate-fadeIn">
      <div className="space-y-5">
        <div className="animate-slideIn delay-100">
          <div className="w-full flex gap-2 justify-between">
            <div className="flex items-center gap-2">
              {/* <Image
                src={profile}
                className="rounded-full"
                width={40}
                height={40}
                alt="profile"
              /> */}
              <div>
                <h6 className="text-sm font-semibold text-[#E7E8E8]">
                  Shamim Hossain
                </h6>
                <span className="text-[12px] text-primary-muted">Admin</span>
              </div>
            </div>
            <div>
              <IoIosArrowDown className="text-[22px]" />
            </div>
          </div>
        </div>

        {/* Notification, message, country, mode */}
        <div className="flex items-center gap-4 animate-slideIn delay-200">
          <span className="size-10 rounded-full cursor-pointer p-2 bg-black-base">
            {/* <Image src={flags_us} width={24} height={24} alt="flag" /> */}
          </span>
          <span className="size-10 rounded-full cursor-pointer p-2 bg-black-base">
            <MdOutlineNightlight className="text-2xl text-white" />
          </span>
          {/* notification */}
          <div className="relative size-10 rounded-full cursor-pointer p-2 bg-black-base">
            <IoNotificationsOutline className="text-2xl text-white" />
            <span className="absolute -top-2 -right-[2px] size-4 rounded-full text-white bg-[#FF4234] text-[10px] flex items-center justify-center">
              2
            </span>
          </div>
          {/* message */}
          <div className="relative size-10 rounded-full cursor-pointer p-2 bg-black-base">
            <AiOutlineMessage className="text-2xl text-white" />
            <span className="absolute -top-2 -right-[2px] size-4 rounded-full text-white bg-[#0064F7] text-[10px] flex items-center justify-center">
              5
            </span>
          </div>
        </div>

        {/* search component */}
        <div className="animate-slideIn delay-300">
          <NavbarSearch />
        </div>
      </div>
    </div>
  );
};

export default MobileScreenProfileModal;
