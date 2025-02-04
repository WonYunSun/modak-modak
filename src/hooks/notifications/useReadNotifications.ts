import { useMutation, useQueryClient } from '@tanstack/react-query';
import useUser from '@hooks/useUser';
import { checkNotificationsRead } from '@queries/notifications/checkNotificationsRead';
import { NotificationCardDataType } from '@queries/notifications/fetchNotifications';


const useReadNotifications = () => {
  const { user, isError: userError } = useUser();
  const userId = user ? user.id : '';

  if (userError) throw new Error(`user error : ${userError}`);

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (unreadNotifications: NotificationCardDataType[]) => checkNotificationsRead({ unreadNotifications }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fetchNotifications', userId] });
    },
  });

  return mutate;
};

export default useReadNotifications;
