import { formatDate, formatTime } from '@utils/dateUtils';

const dummyData = {
  id: '550e8400-e29b-41d4-a716-446655440000', // uuid 형식
  name: '3번째 모각코🔥', // text 형식
  memo: '각자 모여서 공부하고 피드백 하기!', // text 형식
  start_date: '2025-01-07', // date 형식 (YYYY-MM-DD)
  end_date: '2025-01-07', // date 형식 (YYYY-MM-DD)
  start_time: '19:28:00', // time 형식 (HH:MM:SS)
  created_at: '2024-06-01T12:00:00Z' // timestamptz 형식 (ISO 8601 형식)
};

const ScheduleCard = () => {
  const labelClass = 'text-gray-400'; // 라벨 스타일
  const detailClass = 'flex items-center gap-3';

  return (
    <div className="inner border border-gray-300 rounded-xl flex justify-between items-center p-4 gap-[8px]">
      <div className="flex flex-col">
        <p className="text-lg font-semibold leading-[140%] mb-2">{dummyData.name}</p>
        <div className={detailClass}>
          <span className={labelClass}>메모</span>
          <span>{dummyData.memo}</span>
        </div>
        <div className="flex items-center">
          <span className={`${labelClass} pr-[12px]`}>일자</span>
          <span>{formatDate(dummyData.start_date)}</span>
          <span className="px-[4px]">⁓</span>
          <span>{formatDate(dummyData.end_date)}</span>
        </div>
        <div className={detailClass}>
          <span className={labelClass}>시간</span>
          <span>{formatTime(dummyData.start_time)}</span>
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
