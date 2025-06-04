import React from "react";
import { ImSpinner11 } from "react-icons/im";

const FetchLoading = ({ height = "min-h-[150px]" }) => {
  return (
    <div className={`flex justify-center items-center ${height}`}>
      <ImSpinner11 className="text-lg md:text-xl animate-spin text-info-base" />
    </div>
  );
};

export default FetchLoading;
