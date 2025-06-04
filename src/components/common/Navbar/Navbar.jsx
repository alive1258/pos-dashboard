"use client";
import { IoNotificationsOutline, IoClose } from "react-icons/io5";
import { AiOutlineMessage } from "react-icons/ai";
import Profile from "./Profile";
import { useState } from "react";
import MobileNavbar from "./MobileNavbar";
import { useDispatch, useSelector } from "react-redux";
import { sidebarToggle } from "@/redux/features/adminSiteBerSlice";
import MobileScreenProfileModal from "./MobileScreenProfileModal";
import NavbarSearch from "./NavbarSearch";

const Navbar = ({ user }) => {
  const [navbar, setNavbar] = useState(false);
  const { sidebarStatus } = useSelector((state) => state.adminTree);
  const dispatch = useDispatch();

  return (
    <>
      <div className="w-full top-0 sticky z-[500] border-b border-b-[#26272F] duration-300  transition-transform transform  bg-[#0b0c10] md:flex">
        <div className=" flex  w-full  items-center">
          {/* logo and sidebar handle icon  */}

          {sidebarStatus && (
            <div
              onClick={() => dispatch(sidebarToggle())}
              className={`size-10 bg-black-muted ml-2
               rounded-full flex items-center justify-center z-50
               `}
            >
              <IoClose className="text-2xl text-white cursor-pointer " />
            </div>
          )}

          {/* nav for mobile  */}
          <MobileNavbar navbar={navbar} setNavbar={setNavbar} />

          <div
            className={` hidden px-6 py-4 lg:flex 
             items-center  w-full`}
          >
            <div
              className={` mt-24 md:mt-0 flex justify-between w-full gap-y-6 `}
            >
              {/* search box  */}
              <div>
                <NavbarSearch />
              </div>

              {/* notification message  and profile  */}
              <div className="flex justify-end ">
                <div className=" flex justify-end  w-full ">
                  <div className="flex items-center gap-6">
                    {/* notification, message, country, mode   */}
                    <div className="flex items-center gap-4">
                      {/* <span className="size-10 rounded-full p-2 bg-black-base border border-[#26272F]">
                        <Image
                          src={"/assets/images/flag.png"}
                          className="flex justify-center items-center"
                          width={20}
                          height={20}
                          alt="flag"
                        />
                      </span> */}

                      {/* notification */}
                      <div className="relative size-10 border border-[#26272F] rounded-full flex justify-center items-center bg-black-base">
                        <IoNotificationsOutline className="text-xl text-white/70" />
                        <span className="absolute -top-3 -right-[2px] size-5 rounded-full text-white bg-[#FF4234] text-[12px] flex items-center justify-center">
                          2
                        </span>
                      </div>
                      {/* message */}
                      <div className="relative size-10 border border-[#26272F] rounded-full flex justify-center items-center bg-black-base">
                        <AiOutlineMessage className="text-xl text-white/70" />
                        <span className="absolute -top-3 -right-[2px] size-5 rounded-full text-white bg-[#0064F7] text-[12px] flex items-center justify-center">
                          5
                        </span>
                      </div>
                    </div>
                    {/* profile  */}
                    <Profile user={user} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" w-full overflow-hidden">
        {navbar && <MobileScreenProfileModal user={user} />}
      </div>
    </>
  );
};

export default Navbar;
