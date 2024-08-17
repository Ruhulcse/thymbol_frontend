import { daysOfWeek } from "@/constant/data";
import { Icon } from "@iconify/react";

const BusinessHoursClient = ({ business_hours }) => {
  const formatBusinessHours = (hours) => {
    let formattedHours = [];
    let currentHours = "";
    let daysRange = [];

    daysOfWeek.forEach((day, index) => {
      if (hours[day]) {
        if (hours[day] !== currentHours) {
          if (daysRange.length > 0) {
            formattedHours.push({
              days: daysRange,
              hours: currentHours,
            });
            daysRange = [];
          }
          currentHours = hours[day];
        }
        daysRange.push(day.charAt(0).toUpperCase() + day.slice(1));
      }
      if (index === daysOfWeek.length - 1 && daysRange.length > 0) {
        formattedHours.push({
          days: daysRange,
          hours: currentHours,
        });
      }
    });

    return formattedHours.map((entry, index) => (
      <div key={index} className="flex items-center mb-1">
        <Icon
          icon="heroicons:clock"
          className="text-blue-400 mx-auto text-lg mr-2"
        />
        <span className="font-bold mr-2">
          {entry.days.length > 1
            ? `${entry.days[0]} - ${entry.days[entry.days.length - 1]}`
            : entry.days[0]}
          :
        </span>
        <span>{entry.hours}</span>
      </div>
    ));
  };

  return (
    <div className="sm:flex hidden text-xs md:text-[14px]">
      <div className="flex items-center">
        <span className="inline-flex"></span>
      </div>
      {!!business_hours?.length ? (
        business_hours.map((hours, index) => (
          <div key={index} className="flex flex-col items-start me-3">
            {formatBusinessHours(hours)}
          </div>
        ))
      ) : (
        <div className="text-center">No business hours available</div>
      )}
    </div>
  );
};

export default BusinessHoursClient;
