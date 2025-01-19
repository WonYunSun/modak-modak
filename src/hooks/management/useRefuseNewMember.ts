'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteMember } from '@queries/management/manageMembers';
import { GroupsType, UsersType } from '@ts/supabaseTableRowTypes';
import useUser from '@hooks/useUser';

interface UseRefuseNewMemberParams {
  groupId: GroupsType['id'];
  waitingUserId: UsersType['id'];
}
const useRefuseNewMember = ({ groupId, waitingUserId }: UseRefuseNewMemberParams) => {
  const queryClient = useQueryClient();
  //유저 아이디 사용
  const { user, isError: userError } = useUser();
  const userId = user ? user.id : null;

  if (userError) throw new Error(`user error : ${userError}`);

  const { mutate } = useMutation({
    mutationFn: () => deleteMember({ groupId, memberId: waitingUserId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fetchWaitingMembers', groupId, userId] });
    },
  });

  return mutate;
};

export default useRefuseNewMember;
