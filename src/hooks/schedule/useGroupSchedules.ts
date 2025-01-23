import { useQuery } from '@tanstack/react-query';
import { fetchSchedulesBygroupId } from 'queries/schedule/ScheduleActions';

export const useGroupSchedules = (groupId: string | undefined) => {
  const {
    data: scheduleData,
    isPending,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['GroupSchedules', groupId],
    queryFn: () => fetchSchedulesBygroupId(groupId!),
    enabled: !!groupId, // groupId가 있을 때만 fetch 실행
  });

  return { scheduleData, isPending, isError, refetch };
};
