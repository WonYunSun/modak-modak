'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchScheduleById } from 'queries/schedule/ScheduleActions';
import FunnelHeader from '@components/common/FunnelHeader';
import { ScheduleEdit } from '@app/groups/[id]/schedules/_components/detailComponents/ScheduleEdit';
import { ScheduleInfo } from '@app/groups/[id]/schedules/_components/detailComponents/SchdeuleInfo';
import GlobalError from '@app/GlobalError';
import Spinner from '@components/common/Spinner';

export const ScheduleDetail = ({ scheduleId }: { scheduleId: string }) => {
  const [isEdit, setIsEdit] = useState(false);
  const { data, isPending, isError, refetch } = useQuery({
    queryKey: ['scheduleId', scheduleId],
    queryFn: () => fetchScheduleById(scheduleId),
  });

  if (isError) return <GlobalError />;
  if (isPending) return <Spinner />;
  if (!data) return <GlobalError />;

  return (
    <div className="inner">
      <FunnelHeader label={isEdit ? '일정 수정' : '일정 상세'} />
      {isEdit ? (
        <ScheduleEdit schedule={data} setIsEdit={setIsEdit} refetch={refetch} />
      ) : (
        <ScheduleInfo schedule={data} setIsEdit={setIsEdit} />
      )}
    </div>
  );
};
