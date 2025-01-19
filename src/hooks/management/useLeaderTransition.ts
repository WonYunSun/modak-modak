'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { leaderTransition } from '@queries/management/leaderTransition';
import { GroupsType, UsersType } from '@ts/supabaseTableRowTypes';
import useUser from '@hooks/useUser';

interface UseLeaderTransitionParams {
  groupId: GroupsType['id'];
  newLeaderId: UsersType['id'];
}
const useLeaderTransition = ({ groupId, newLeaderId }: UseLeaderTransitionParams) => {
  const queryClient = useQueryClient();

  //유저 아이디 사용
  const { user, /**isPending: userPending,*/ isError: userError } = useUser();
  const userId = user ? user.id : '';

  if (userError) throw new Error(`user error : ${userError}`);

  const { mutate } = useMutation({
    mutationFn: () => leaderTransition({ groupId, leaderId: userId, newLeaderId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['isLeader', groupId, userId] });
      queryClient.invalidateQueries({ queryKey: ['fetchCurMembers', groupId, userId] });
    },
  });
  return mutate;
};

export default useLeaderTransition;
