'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { permitNewMember } from '@queries/management/manageMembers';
import { GroupsType, UsersType } from '@ts/supabaseTableRowTypes';
import useUser from '@hooks/useUser';

interface UsePermitNewMemberParams {
  groupId: GroupsType['id'];
  waitingUserId: UsersType['id'];
}
const usePermitNewMember = ({ groupId, waitingUserId }: UsePermitNewMemberParams) => {
  const queryClient = useQueryClient();

  //유저 아이디 사용
  const { user, isError: userError } = useUser();
  const userId = user ? user.id : null;

  if (userError) throw new Error(`user error : ${userError}`);

  const { mutate } = useMutation({
    mutationFn: () => permitNewMember({ groupId, waitingUserId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fetchWaitingMembers', groupId, userId] });
      queryClient.invalidateQueries({ queryKey: ['fetchCurMembers', groupId, userId] });
    },
  });

  return mutate;
};

export default usePermitNewMember;
