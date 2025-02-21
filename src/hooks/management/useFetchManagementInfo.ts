'use client';

import { useQuery } from '@tanstack/react-query';
import useUser from '@hooks/common/useUser';
import { fetchReceiveNotifications } from '@queries/management/fetchReceiveNotifications';
import { GroupsType } from '@ts/supabaseTableRowTypes';
import { fetchLeaderInfo } from '@queries/management/fetchMembers';

interface FetchManagementInfoParams {
  groupId: GroupsType['id'];
}
const useFetchManagementInfo = ({ groupId }: FetchManagementInfoParams) => {
  const { user, isError: userError } = useUser();
  const userId = user ? user.id : null;

  if (userError) throw new Error(`user error : ${userError}`);

  const { data: receiveNotification, isPending: isNotificationPending } = useQuery({
    queryKey: ['fetchReceiveNotification', userId],
    queryFn: () => fetchReceiveNotifications({ userId: userId!, groupId }),
    enabled: !!userId,
  });

  const { data: isLeader, isPending: isLeaderInfoPending } = useQuery({
    queryKey: ['isLeader', groupId, userId],
    queryFn: async () => {
      const data = await fetchLeaderInfo({ groupId });

      if (data && data.users.id === userId) {
        return true;
      }
      return false;
    },
    enabled: !!userId,
  });

  return { receiveNotification, isLeader, isPending: !!(isNotificationPending || isLeaderInfoPending) };
};

export default useFetchManagementInfo;
