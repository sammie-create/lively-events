interface CompactCalendarIconProps {
  date: Date;
  style?: string; // tailwind size classes like "w-10 h-10"
  baselineStyle?: string;
}

const DynamicCalendarIcon: React.FC<CompactCalendarIconProps> = ({
  date,
  style = "w-10 h-10 bg-white border-gray-300",
  baselineStyle,
}) => {
  const day = date.getDate();
  const month = date.toLocaleString("en-GB", { month: "short" });

  return (
    <div className={`${style} border rounded-lg overflow-hidden flex flex-col`}>
      <div className="py-0.5 text-xs font-medium text-center uppercase border-b bg-white/5 border-b-inherit text-white/50">
        {month}
      </div>
      <div className="flex items-center justify-center text-lg font-bold text-white">
        {day}
      </div>
      <div
        className={`${baselineStyle} rounded-[50px] h-[2px] w-6 -mt-[2px] mx-auto`}
      ></div>
    </div>
  );
};

export default DynamicCalendarIcon;
