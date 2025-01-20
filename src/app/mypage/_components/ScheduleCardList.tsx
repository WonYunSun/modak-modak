import { useEffect, useState } from 'react';
import ScheduleCard from '@components/common/scheduleCard/ScheduleCard';
import { SlimDownArrow } from '@components/icons';
import { MyScheduleData } from '@queries/schedule/ScheduleActions';

const MAX_CARD_COUNT = 2;

interface ScheduleCardListProps {
  schedules: MyScheduleData[];
}

const ScheduleCardList = ({ schedules }: ScheduleCardListProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [filteredSchedules, setFilteredSchedules] = useState<MyScheduleData[]>([]);

  useEffect(() => {
    setFilteredSchedules(!isExpanded ? schedules.slice(0, MAX_CARD_COUNT) : schedules);
  }, [schedules, isExpanded]);

  const expansionCount = schedules.length - MAX_CARD_COUNT;

  return (
    <div className="flex flex-col gap-2 items-center">
      {filteredSchedules.map((schedule) => (
        <ScheduleCard key={schedule.id} {...schedule} hasArrow={false} groupName={schedule.groups.name} />
      ))}
      {!isExpanded && expansionCount > 0 && (
        <div
          onClick={() => setIsExpanded((prev) => !prev)}
          className="flex w-full h-9 justify-center items-center py-2 px-[10px] rounded-lg border border-gray-300 text-gray-500 text-sm cursor-pointer ml-1"
        >
          <>
            <span className="mr-[2px]"> {expansionCount}개의 일정 더보기</span> <SlimDownArrow />
          </>
        </div>
      )}
    </div>
  );
};

export default ScheduleCardList;
