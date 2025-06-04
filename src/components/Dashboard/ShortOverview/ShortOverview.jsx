import { cards } from "@/utils/cardData";
import OverviewCard from "./OverviewCard";

const ShortOverview = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards?.map((card) => (
        <OverviewCard
          key={card?.id}
          title={card?.title}
          value={card?.value}
          link={card?.link}
          gradient={card?.gradient}
          color={card?.color}
          bgColor={card?.bgColor}
          borderColor={card?.borderColor}
          icon={card?.icon}
        />
      ))}
    </div>
  );
};

export default ShortOverview;
