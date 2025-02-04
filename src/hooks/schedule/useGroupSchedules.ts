import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchSchedulesBygroupId } from 'queries/schedule/ScheduleActions';

export const useGroupSchedules = (groupId: string | undefined, searchTerm?: string) => {
  const queryClient = useQueryClient();

  const {
    data: scheduleData,
    isPending,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['GroupSchedules', groupId, searchTerm || ''],
    queryFn: () => fetchSchedulesBygroupId(groupId!, searchTerm),
    enabled: !!groupId, // groupId가 있을 때만 fetch 실행
  });

  // 쿼리 무효화 함수
  const invalidateGroupSchedules = () => {
    queryClient.invalidateQueries({ queryKey: ['GroupSchedules', groupId, ''] });
    queryClient.invalidateQueries({ queryKey: ['posts', groupId, ''] });
  };

  return { scheduleData, isPending, isError, refetch, invalidateGroupSchedules };
};
