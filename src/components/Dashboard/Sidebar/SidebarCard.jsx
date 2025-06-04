"use client";
import { sidebarMobileToggle } from "@/redux/features/adminSiteBerSlice";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Collapse } from "react-collapse";
import { FaChevronRight } from "react-icons/fa";
import { useDispatch } from "react-redux";

const SidebarCard = ({ item, setActiveSidebar, activeSidebar }) => {
  const pathname = usePathname();
  const dispatch = useDispatch();

  // Check if the current item or any sub-item is active
  const isActive =
    pathname === item.path ||
    item.sub?.some((subItem) => subItem.path === pathname);

  // Handle click to open or close collapsible items
  const handleClick = () => {
    // If the clicked item is already active, close it
    if (activeSidebar === item?.id) {
      setActiveSidebar(null); // Close if clicked again
    } else {
      setActiveSidebar(item?.id); // Open this one and close others
    }
  };

  return (
    <div>
      {item?.sub?.length > 0 ? (
        <div>
          {/* Parent item with collapsible sub-items */}
          <div
            onClick={handleClick}
            className={` flex items-center  justify-between hover:bg-[#111217] gap-2 ${
              isActive || activeSidebar === item?.id
                ? "active-sidebar "
                : "active-sidebar"
            }  gap-3 duration-300 p-2 my-2 rounded cursor-pointer`}
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <div className="flex items-center  gap-3">
              <span className={`text-lg text-[#3A3B44] transition duration-75`}>
                {item.Icon}
              </span>
              <span
                className={`text-[16px] text-[#b5b7c8] capitalize whitespace-nowrap`}
              >
                {item?.name}
              </span>
            </div>

            {/* Chevron icon toggle based on open/close state */}
            <FaChevronRight
              size={14}
              className={`duration-300 text-[#3A3B44] ${
                activeSidebar === item?.id ? "rotate-90" : "rotate-0"
              } `}
            />
          </div>

          {/* Collapse component for sub-items */}
          <Collapse isOpened={activeSidebar === item?.id}>
            <div className=" ml-4 border-l border-[#26272F]">
              {item?.sub
                ?.sort((a, b) => a?.name.localeCompare(b?.name))
                ?.map((subItem, index) => (
                  <div className="pl-4 mb-2  border-gray-600" key={index}>
                    <Link
                      onClick={() => dispatch(sidebarMobileToggle())}
                      className={`px-3 py-2 flex items-center gap-2 rounded text-sm capitalize hover:bg-[#111217] hover:text-white duration-200 ${
                        pathname == subItem.path
                          ? "active-sidebar active-sidebar-active"
                          : "active-sidebar"
                      }`}
                      href={subItem?.path}
                    >
                      <span className="text-[#b5b7c8]">{subItem?.name}</span>
                    </Link>
                  </div>
                ))}
            </div>
          </Collapse>
        </div>
      ) : (
        // Single item without sub-items
        <Link
          href={item.path}
          onClick={() => {
            dispatch(sidebarMobileToggle()), setActiveSidebar(item?.id);
          }}
        >
          <div
            className={`flex items-center justify-between gap-10 ${
              isActive
                ? "text-white active-sidebar active-sidebar-active"
                : "active-sidebar"
            } hover:text-white duration-300 hover:bg-[#111217] p-2 my-2 rounded cursor-pointer`}
          >
            <div className="flex items-center gap-3">
              <span
                className={` ${
                  isActive ? "text-white" : "text-[#3A3B44]"
                } text-[24px]  transition duration-75`}
              >
                {item.Icon}
              </span>
              <span
                className={`text-[16px] text-[#b5b7c8] capitalize whitespace-nowrap`}
              >
                {item?.name}
              </span>
            </div>
          </div>
        </Link>
      )}
    </div>
  );
};

export default SidebarCard;
