'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchScheduleById } from '@utils/actions/schedule/ScheduleActions';
import FunnelHeader from '@components/common/FunnelHeader';
import { formatDate, formatTime } from '@utils/dateUtils';

export const ScheduleDetail = ({ scheduleId }: { scheduleId: string }) => {
  const { data, isPending, isError } = useQuery({
    queryKey: ['scheduleId', scheduleId],
    queryFn: () => fetchScheduleById(scheduleId),
  });

  if (isError) return <div>Error!</div>;
  if (isPending) return <div>Pending...</div>;
  if (!data) return <div>잘못된 접근입니다.</div>;

  return (
    <div>
      <FunnelHeader label="일정 상세" />
      <h1>{data.name}</h1>
      <p>{data.memo}</p>
      <p>{formatDate(data.start_date)}</p>
      <p>{formatDate(data.end_date)}</p>
      <p>{formatTime(data.start_time)}</p>
    </div>
  );
};
