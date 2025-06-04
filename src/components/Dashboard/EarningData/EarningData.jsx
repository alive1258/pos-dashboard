import { FaChevronDown } from "react-icons/fa";
import EarningChart from "../EarningChart/EarningChart";

const EarningData = () => {
  return (
    <>
      <div className="bg-[#0b0c10] box py-1.5 rounded-lg w-full">
        <div className="z-50 p-1.5 w-full">
          <h1 className="text-[22px] font-medium text-white pb-2">Earnings</h1>
          <div className="flex items-start mb-8">
            <div className="w-[179px]">
              <p className="text-[#787f90]">Total Collections</p>
              <h3 className="text-xl font-medium text-[#0064F7]">$14500</h3>
            </div>
            <div className="w-[179px]">
              <p className="text-[#787f90]">Total Collections</p>
              <h3 className="text-xl font-medium text-[#FF4234]">$5025</h3>
            </div>
            <div className="w-[179px] flex items-center gap-2">
              <p className="text-[#787f90] text-sm">Sep 05, 2024</p>
              <FaChevronDown className="text-[#787f90]" />
            </div>
          </div>

          <EarningChart />
        </div>
      </div>
    </>
  );
};

export default EarningData;
