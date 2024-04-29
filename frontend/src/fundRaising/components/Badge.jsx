import React from "react";
import CountUp from "react-countup";

function Badge({
  containerStyles,
  icon,
  endCountNum,
  endCountText,
  startCountText,
  badgeText,
}) {
  return (
    <div
      className={`h-[68px] bg-gray-700 dark:backdrop-blur-[44px] shadow-2xl rounded-[10px] flex items-center gap-x-4 border ${containerStyles}`}
    >
      <div className="ml-3 text-3xl text-[#ec4899]">{icon}</div>
      <div className="flex items-center gap-x-2">
        <div className="text-4xl leading-none font-bold text-[#ec4899]">
          {startCountText}
          <CountUp end={endCountNum} delay={0} duration={2} />
          {endCountText}
        </div>
        <div className="max-w-[70px] leading-none text-[15px] font-medium">
          {badgeText}
        </div>
      </div>
    </div>
  );
}

export default Badge;
