'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchLeaderInfo } from '@queries/management/fetchMembers';
import { GroupsType } from '@ts/supabaseTableRowTypes';
import useUser from '@hooks/common/useUser';

interface UseIsLeaderParams {
  groupId: GroupsType['id'];
}
const useIsLeader = ({ groupId }: UseIsLeaderParams) => {
  const { user, isError: userError } = useUser();
  const userId = user ? user.id : null;

  if (userError) throw new Error(`user error : ${userError}`);

  const { data, isPending, isError } = useQuery({
    queryKey: ['isLeader', groupId, userId],
    queryFn: async () => {
      const data = await fetchLeaderInfo({ groupId });

      if (data && data.users.id === userId) {
        return true;
      }
      return false;
    },
  });

  return { data, isPending, isError };
};

export default useIsLeader;
