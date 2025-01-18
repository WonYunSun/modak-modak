'use client';

import ManagementSection from '@app/groups/[id]/management/_components/ManagementSection';
import ScheduleCalendar from '@app/mypage/_components/ScheduleCalendar';
import { getMySchedules } from '@queries/schedule/ScheduleActions';
import { useQuery } from '@tanstack/react-query';
import { ScheduleType } from '@ts/scheduleType';

const MySchedule = () => {
  const { data: schedules, isPending } = useQuery({
    queryKey: ['mySchedule'],
    queryFn: async () => await getMySchedules(),
    staleTime: 60 * 5 * 1000,
  });

  if (isPending) return null;

  return (
    <ManagementSection title={'다가오는 일정'} isLast={true}>
      <ScheduleCalendar schedules={schedules as ScheduleType[]} />
    </ManagementSection>
  );
};

export default MySchedule;
