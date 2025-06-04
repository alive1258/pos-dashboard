import ActivityUsers from "@/components/Dashboard/ActivityUsers/ActivityUsers";
import SellChart from "@/components/Dashboard/ActivityUsers/SellChart";
import EarningData from "@/components/Dashboard/EarningData/EarningData";
import Expenses from "@/components/Dashboard/Expenses/Expenses";
import ShortOverview from "@/components/Dashboard/ShortOverview/ShortOverview";
import RevenueYearly from "@/components/Dashboard/RevenueYearly/RevenueYearly";

export default function Home() {
  return (
    <div className="p-4">
      <div className="mt-5">
        <ShortOverview />
      </div>
      <div className="flex flex-col md:flex-row gap-5 mt-5">
        <div className="w-full">
          <EarningData />
        </div>

        <div className="w-full flex flex-col md:flex-row items-center gap-6">
          <Expenses />
          <RevenueYearly />
        </div>
      </div>

      <div className="mt-5">
        <ActivityUsers />
      </div>

      <div className="mt-5">
        <SellChart />
      </div>
    </div>
  );
}
