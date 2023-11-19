const ScheduleChip = ({ start, end, isSelected, onSelect }) => {
  return (
    <div
      onClick={onSelect}
      className={`[word-wrap: break-word] mb-[4px] mr-4 h-[36px] cursor-pointer flex items-center justify-between rounded-[16px] 
            px-[12px] py-0 text-[13px] font-normal normal-case leading-loose shadow-none 
            transition-[opacity] duration-300 ease-linear hover:!shadow-none active:bg-[#cacfd1] 
            ${
              isSelected
                ? "bg-orange-500 text-white"
                : "bg-[#e2e7eb] text-[#4f4f4f]"
            }`}
    >
      {start}
    </div>
  );
};

export default ScheduleChip;
