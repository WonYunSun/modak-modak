import { NextArrow } from '@components/icons';

import { formatDate, formatTime } from '@utils/dateUtils';

import { ScheduleType } from '@ts/scheduleType';

type ScheduleCardProps = {
  name: ScheduleType['name'];
  memo: ScheduleType['memo'];
  start_date: ScheduleType['start_date'];
  end_date: ScheduleType['end_date'];
  start_time: ScheduleType['start_time'];
  groupName?: string;
  hasArrow?: boolean;
};

const ScheduleCard = ({
  name,
  memo,
  start_date,
  end_date,
  start_time,
  groupName,
  hasArrow = true,
}: ScheduleCardProps) => {
  const labelClass = 'text-gray-500 whitespace-nowrap'; // 라벨 스타일
  const detailClass = 'flex items-center gap-3 text-xs';
  // end_date와 오늘 날짜 비교
  const today = new Date(); // 오늘 날짜와 시간
  today.setHours(0, 0, 0, 0);
  const endDate = new Date(end_date); // 일정 끝나는 시간
  endDate.setHours(0, 0, 0, 0);
  const isExpired = endDate < today;
  const isSingleDay = end_date === start_date;

  return (
    <div
      className={`w-full box-border border border-gray-300 rounded-xl flex justify-between items-center pl-5 pr-2 py-2 gap-[0.5rem] cursor-pointer ${
        isExpired ? 'bg-gray-100' : ''
      }`}
    >
      <div className="flex flex-col w-11/12">
        <div className="pb-1 text-xs text-gray-600">{groupName}</div>
        <div className="flex flex-col"></div>
        <p className="text-sm font-semibold leading-[140%] mb-2">{name}</p>
        <div className={detailClass}>
          <span className={labelClass}>메모</span>
          <span className="truncate w-full">{memo}</span>
        </div>
        <div className="flex items-center whitespace-nowrap text-xs">
          <span className={`${labelClass} pr-3`}>일자</span>
          <span>{formatDate(start_date)}</span>
          {!isSingleDay && (
            <>
              <span className="px-1">⁓</span>
              <span className="truncate">{formatDate(end_date)}</span>
            </>
          )}
        </div>
        <div className={detailClass}>
          <span className={labelClass}>시간</span>
          <span>{formatTime(start_time)}</span>
        </div>
      </div>

      {hasArrow ? <NextArrow className="min-w-6" /> : null}
    </div>
  );
};

export default ScheduleCard;
