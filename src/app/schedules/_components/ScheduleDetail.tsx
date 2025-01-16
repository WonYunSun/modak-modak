'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchScheduleById } from 'queries/schedule/ScheduleActions';
import FunnelHeader from '@components/common/FunnelHeader';
import { SchdeuleInfo } from './DetailComponents/SchdeuleInfo';
import { ScheduleEdit } from './DetailComponents/ScheduleEdit';

export const ScheduleDetail = ({ scheduleId }: { scheduleId: string }) => {
  const [isEdit, setIsEdit] = useState(false);
  const { data, isPending, isError, refetch } = useQuery({
    queryKey: ['scheduleId', scheduleId],
    queryFn: () => fetchScheduleById(scheduleId),
  });

  if (isError) return <div>Error!</div>;
  if (isPending) return <div>Pending...</div>;
  if (!data) return <div>잘못된 접근입니다.</div>;

  return (
    <div>
      <FunnelHeader label={isEdit ? '일정 수정' : '일정 상세'} />
      {isEdit ? (
        <ScheduleEdit schedule={data} setIsEdit={setIsEdit} refetch={refetch} />
      ) : (
        <SchdeuleInfo schedule={data} setIsEdit={setIsEdit} />
      )}
    </div>
  );
};
