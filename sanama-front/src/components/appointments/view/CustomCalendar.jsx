import React from "react";
import dayjs from "dayjs";

export const CustomCalendar = ({ highlightedDates, onDaySelect }) => {
  return (
    <div className="flex flex-col gap-1 w-full overflow-y-auto max-h-[250px] mt-2">
      {highlightedDates.map((dateString, index) => {
        const date = dayjs(dateString);
        return (
          <div
            key={dateString}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <button
              onClick={() => onDaySelect(dateString)}
              className="px-4 py-2 text-sm w-full border rounded-md transition-all hover:bg-blue-100 hover:border-blue-500"
            >
              {date.format("DD MMM YYYY")}
            </button>
          </div>
        );
      })}
    </div>
  );
};
