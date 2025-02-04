'use client';

import { useQuery } from '@tanstack/react-query';
import useUser from '@hooks/useUser';
import { FetchReceiveNotifications } from '@queries/management/fetchReceiveNotifications';
import { GroupsType } from '@ts/supabaseTableRowTypes';

interface ToggleNotificationParams {
  groupId: GroupsType['id'];
}
const useFetchReceiveNotification = ({ groupId }: ToggleNotificationParams) => {
  const { user, isError: userError } = useUser();
  const userId = user ? user.id : '';

  if (userError) throw new Error(`user error : ${userError}`);

  const { data, isPending, isError } = useQuery({
    queryKey: ['fetchReceiveNotification', userId],
    queryFn: () => FetchReceiveNotifications({ userId, groupId }),
  });

  return { data, isPending, isError };
};

export default useFetchReceiveNotification;
