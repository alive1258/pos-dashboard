import Image from "next/image";

const OverviewCard = ({
  icon,
  title,
  value,
  gradient,
  bgColor,
  borderColor,
  color,
}) => {
  return (
    <div className="relative bg-[#111217] border border-[#26272F] rounded-lg pl-5 pr-6 py-2.5 flex items-center justify-between overflow-hidden">
      {/* Top gradient border */}
      <div
        className={`absolute top-0 left-1/2 transform -translate-x-1/2 w-1/2 h-[2px] bg-gradient-to-r ${gradient}`}
      />
      {/* Bottom gradient border */}
      <div
        className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/2 h-[2px] bg-gradient-to-r ${gradient}`}
      />

      {/* Icon background */}
      <div
        className="size-16 bg-no-repeat bg-cover flex items-center justify-center"
        style={{
          backgroundImage: "url(/assets/images/Polygon.png)",
        }}
      >
        {icon && <Image src={icon} width={36} height={36} alt="icon" />}
      </div>

      {/* Title and Value */}
      <div className="flex flex-col items-end">
        <p className={`${color} text-secondary-base text-xl font-semibold`}>
          {title}
        </p>
        <div
          style={{
            backgroundColor: bgColor,
            borderColor: borderColor,
          }}
          className="border px-4 py-2 rounded-lg mt-2 flex justify-center items-center"
        >
          <h1 className={`text-2xl text-primary-muted font-semibold`}>
            {value}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default OverviewCard;
