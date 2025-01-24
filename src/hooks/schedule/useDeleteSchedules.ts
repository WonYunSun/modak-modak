import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteScheduleById } from '@queries/schedule/ScheduleActions';

const useDeleteSchedule = (groupId: string | undefined) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (scheduleId: string) => deleteScheduleById(scheduleId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['GroupSchedules', groupId] });
    },
    onError: (error) => {
      console.error('Failed to delete schedule:', error);
    },
  });
};

export default useDeleteSchedule;
