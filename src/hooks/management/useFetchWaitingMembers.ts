'use client';

import useUser from '@hooks/useUser';
import { fetchWaitingMembers } from '@queries/management/fetchMembers';
import { useQuery } from '@tanstack/react-query';
import { GroupsType } from '@ts/supabaseTableRowTypes';

interface UseFetchWaitingMembersParams {
  groupId: GroupsType['id'];
}
const useFetchWaitingMembers = ({ groupId }: UseFetchWaitingMembersParams) => {
  //유저 아이디 사용
  const { user, isError: userError } = useUser();
  const userId = user ? user.id : null;

  if (userError) throw new Error(`user error : ${userError}`);

  const { data, isPending, isError } = useQuery({
    queryKey: ['fetchWaitingMembers', groupId, userId],
    queryFn: () => fetchWaitingMembers({ groupId }),
  });

  return { data, isPending, isError };
};

export default useFetchWaitingMembers;
