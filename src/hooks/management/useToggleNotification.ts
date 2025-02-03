'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import useUser from '@hooks/useUser';
import { GroupsType } from '@ts/supabaseTableRowTypes';
import { toggleNotification } from '@queries/management/toggleNotification';

interface ToggleNotificationParams {
  groupId: GroupsType['id'];
}

const useToggleNotification = ({ groupId }: ToggleNotificationParams) => {
  //디바운스 처리
  const { user, isError: userError } = useUser();
  const userId = user ? user.id : '';

  if (userError) throw new Error(`user error : ${userError}`);

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (toggleTo: boolean) => toggleNotification({ userId, groupId, toggleTo }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [] });
    },
  });

  return mutate;
};

export default useToggleNotification;
