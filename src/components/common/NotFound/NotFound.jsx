import Image from "next/image";
import React from "react";
import not_found from "../../../../public/assets/images/not_found_box.png";
const NotFound = () => {
  return (
    <>
      <div className="flex items-center justify-center py-5 w-full">
        <div className="max-h-[250px]">
          <Image
            className=" h-full w-full min-h-[110px] opacity-50 "
            src={not_found}
            alt="image"
          />
        </div>
      </div>
    </>
  );
};

export default NotFound;
