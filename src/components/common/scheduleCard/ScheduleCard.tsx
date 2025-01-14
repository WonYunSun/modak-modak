import { NextArrow } from '@components/icons';
import { formatDate, formatTime } from '@utils/dateUtils';
import { ScheduleType } from '@ts/scheduleType';

interface ScheduleCardProps extends ScheduleType {
  groupName?: string;
  hasArrow?: boolean;
}

const ScheduleCard = ({
  name,
  memo,
  start_date,
  end_date,
  start_time,
  groupName,
  hasArrow = true
}: ScheduleCardProps) => {
  const labelClass = 'text-gray-500 whitespace-nowrap'; // 라벨 스타일
  const detailClass = 'flex items-center gap-3';
  const isExpired = new Date(end_date) < new Date();
  const isSingleDay = end_date === start_date;

  return (
    <div
      className={`box-border border border-gray-300 rounded-xl flex justify-between items-center pl-[1.25rem] pr-[0.5rem] py-[0.5rem] gap-[0.5rem]  ${
        isExpired ? 'bg-gray-100' : ''
      }`}
    >
      <div className="flex flex-col w-full w-11/12">
        <div className="pb-[4px] text-gray-600">{groupName}</div>
        <div className="flex flex-col"></div>
        <p className="text-lg font-semibold leading-[140%] mb-2">{name}</p>
        <div className={detailClass}>
          <span className={labelClass}>메모</span>
          <span className="truncate w-full">{memo}</span>
        </div>
        <div className="flex items-center whitespace-nowrap">
          <span className={`${labelClass} pr-[12px]`}>일자</span>
          <span>{formatDate(start_date)}</span>
          {isSingleDay && (
            <>
              <span className="px-[4px]">⁓</span>
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
