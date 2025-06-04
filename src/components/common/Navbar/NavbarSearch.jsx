import React from "react";
import { IoSearch } from "react-icons/io5";

const NavbarSearch = () => {
  return (
    <>
      <div className="w-[550px] md:col-span-1 xl:col-span-1 relative">
        <input
          type=""
          className="px-4 py-3 bg-neutral-muted border border-[#26272F] text-[#B5B7C8] text-[14px]  rounded-lg placeholder:text-[#929394] w-full outline-none"
          placeholder="Search here..."
        />
        <IoSearch className="absolute top-3.5 right-4 text-base text-[#0064F7]" />
      </div>
    </>
  );
};

export default NavbarSearch;
