import { Database } from '@ts/supabase';
import { formatDate, formatTime } from '@utils/dateUtils';

type ScheduleType = Database['public']['Tables']['schedules']['Row'];

const ScheduleCard = ({ name, memo, start_date, end_date, start_time }: ScheduleType) => {
  const labelClass = 'text-gray-400'; // 라벨 스타일
  const detailClass = 'flex items-center gap-3';

  return (
    <div className="inner border border-gray-300 rounded-xl flex justify-between items-center p-4 gap-[8px]">
      <div className="flex flex-col">
        <p className="text-lg font-semibold leading-[140%] mb-2">{name}</p>
        <div className={detailClass}>
          <span className={labelClass}>메모</span>
          <span>{memo}</span>
        </div>
        <div className="flex items-center">
          <span className={`${labelClass} pr-[12px]`}>일자</span>
          <span>{formatDate(start_date)}</span>
          <span className="px-[4px]">⁓</span>
          <span>{formatDate(end_date)}</span>
        </div>
        <div className={detailClass}>
          <span className={labelClass}>시간</span>
          <span>{formatTime(start_time)}</span>
        </div>
      </div>
      {/* svg */}
      <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M10 18.5L15.2929 13.2071C15.6834 12.8166 15.6834 12.1834 15.2929 11.7929L10 6.5"
          stroke="#A1A1AA"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};

export default ScheduleCard;
