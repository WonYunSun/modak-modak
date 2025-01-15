'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchScheduleById } from 'queries/schedule/ScheduleActions';
import FunnelHeader from '@components/common/FunnelHeader';
import { formatDate, formatTime } from '@utils/dateUtils';
import Label from '@components/common/Label';
import Button from '@components/common/Button';

export const ScheduleDetail = ({ scheduleId }: { scheduleId: string }) => {
  const { data, isPending, isError } = useQuery({
    queryKey: ['scheduleId', scheduleId],
    queryFn: () => fetchScheduleById(scheduleId),
  });

  const isSingleDay = data?.end_date === data?.start_date;

  if (isError) return <div>Error!</div>;
  if (isPending) return <div>Pending...</div>;
  if (!data) return <div>잘못된 접근입니다.</div>;

  return (
    <div>
      <FunnelHeader label="일정 상세" />
      <div className="inner h-[calc(100vh-9.7rem)] flex flex-col justify-between mt-[2.18rem]">
        <div className="space-y-4">
          <Label label="일정명" htmlFor="" />
          <p className="bg-gray-100 px-4 py-3 rounded-lg font-medium">{data.name}</p>
        </div>
        <div className="space-y-4">
          <Label label="날짜" htmlFor="" />
          <div className="flex bg-gray-100 px-4 py-3 rounded-lg font-medium">
            <p>{formatDate(data.start_date)}</p>
            {isSingleDay && (
              <>
                <span className="px-[4px]">⁓</span>
                <p className="truncate">{formatDate(data.end_date)}</p>
              </>
            )}
          </div>
          <p className="bg-gray-100 px-4 py-3 rounded-lg font-medium">{formatTime(data.start_time)}</p>
        </div>

        <div className="space-y-4">
          <Label label="메모" htmlFor="" />
          <p className="bg-gray-100 px-4 py-3 rounded-lg font-medium">{data.memo}</p>
        </div>
        <div className="flex gap-[8px]">
          <Button
            label="삭제"
            className="flex-[2_2_0%] full-white-btn"
            type="button"
            disabled={false}
            onClick={() => {}}
          />
          <Button
            label="수정하기"
            className="flex-[5_5_0%] full-btn"
            type="button"
            disabled={false}
            onClick={() => {}}
          />
        </div>
      </div>
    </div>
  );
};
