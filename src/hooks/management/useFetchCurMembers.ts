'use client';

import { useQuery } from '@tanstack/react-query';
import { CurMemberType, fetchCurMembers } from '@queries/management/fetchMembers';
import { GroupsType } from '@ts/supabaseTableRowTypes';
import useUser from '@hooks/useUser';

interface UseFetchCurMembersParams {
  groupId: GroupsType['id'];
}
const useFetchCurMembers = ({ groupId }: UseFetchCurMembersParams) => {
  const { user, isError: userError } = useUser();
  const userId = user ? user.id : null;

  if (userError) throw new Error(`user Error ${userError}`);

  const { data, isPending, isError } = useQuery({
    queryKey: ['fetchCurMembers', groupId, userId],
    queryFn: async () => {
      const data = await fetchCurMembers({ groupId });
      if (data) {
        const me = data.find((member) => member.users.id === userId) as CurMemberType;
        const others = data.filter((member) => member.users.id !== userId);
        return { me, others };
      }
      return null;
    },
    enabled: !!userId,
  });

  return { data, isPending, isError };
};

export default useFetchCurMembers;
