'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import useUser from '@hooks/useUser';
import { GroupsType } from '@ts/supabaseTableRowTypes';
import { toggleNotification } from '@queries/management/toggleNotification';

interface ToggleNotificationParams {
  groupId: GroupsType['id'];
}

const useToggleNotification = ({ groupId }: ToggleNotificationParams) => {
  const { user, isError: userError } = useUser();
  const userId = user ? user.id : '';

  if (userError) throw new Error(`user error : ${userError}`);

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (toggleTo: boolean) => toggleNotification({ userId, groupId, toggleTo }),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['fetchReceiveNotification', userId] });

      const receiveNotificationPrev = queryClient.getQueryData(['fetchReceiveNotification', userId]);

      queryClient.setQueryData(['fetchReceiveNotification', userId], !receiveNotificationPrev);

      return { receiveNotificationPrev };
    },
    onError: async (_err, _variables, context) => {
      queryClient.setQueryData(['fetchReceiveNotification', userId], context?.receiveNotificationPrev);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['fetchReceiveNotification', userId] });
    },
  });

  return mutate;
};

export default useToggleNotification;
