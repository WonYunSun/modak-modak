'use client';

import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import useUser from '@hooks/common/useUser';
import { fetchLeaderInfo } from '@queries/management/fetchMembers';
import { fetchReceiveNotifications } from '@queries/management/fetchReceiveNotifications';
import { GroupsType } from '@ts/supabaseTableRowTypes';


interface ManagementPrefetchParams {
  groupId: GroupsType['id'];
}
const useManagementPrefetch = ({ groupId }: ManagementPrefetchParams) => {
  const { user, isError: userError } = useUser();
  const userId = user ? user.id : null;
  if (userError) throw new Error(`user error : ${userError}`);
  const queryClient = useQueryClient();

  useEffect(() => {
      if (userId) {
        queryClient.prefetchQuery({
          queryKey: ['fetchReceiveNotification', userId],
          queryFn: () => fetchReceiveNotifications({ userId: userId!, groupId }),
          staleTime: Infinity,
        });
        queryClient.prefetchQuery({
          queryKey: ['isLeader', groupId, userId],
          queryFn: async () => {
            const data = await fetchLeaderInfo({ groupId });
  
            if (data && data.users.id === userId) {
              return true;
            }
            return false;
          },
          staleTime: Infinity,
        });
      }
    }, [userId]);

  return;
};

export default useManagementPrefetch;
