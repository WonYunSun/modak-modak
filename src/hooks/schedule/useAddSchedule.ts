import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addSchedule } from '@queries/schedule/ScheduleActions';
import { ScheduleType } from '@ts/scheduleType';

const useAddSchedule = (groupId: string | undefined) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (scheduleData: ScheduleType) => addSchedule(scheduleData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['GroupSchedules', groupId] });
    },
    onError: (error) => {
      console.error('Failed to add schedule:', error);
    },
  });
};

export default useAddSchedule;
