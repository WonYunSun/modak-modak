import { RedDot } from '@components/icons';
import { DayInfo } from '@lib/scheduleCalendar';

interface ScheduleDayProps extends DayInfo {
  onClick: (id: string) => void;
}

const ScheduleDay = ({
  id,
  dayOfWeek,
  date,
  isToday,
  isSelected,
  isSunday,
  hasSchedule,
  onClick,
}: ScheduleDayProps) => {
  return (
    <div className="flex justify-center flex-1 mr-[2px]" key={id} onClick={() => onClick(id)}>
      <div
        className={`flex flex-col items-center rounded-full text-center border w-12 h-12 text-gray-500
        ${isToday && 'bg-[#FFD3B8]'}
        ${isSelected ? 'border-primary-2-300' : 'border-transparent'}`}
      >
        <span
          className={`w-4 h-5 text-xs font-normal mt-1 mx-4 leading-none relative flex flex-col justify-center
          ${isSunday ? 'text-base-red' : ''}`}
        >
          {hasSchedule && <RedDot className="ml-auto absolute top-[-1px] right-[-1px]" />}
          <span className="my-auto">{dayOfWeek}</span>
        </span>
        <span className="w-4 h-5 text-sm font-semibold mb-1">{date}</span>
      </div>
    </div>
  );
};

export default ScheduleDay;
