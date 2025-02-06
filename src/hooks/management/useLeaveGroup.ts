'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteMember } from '@queries/management/manageMembers';
import { GroupsType } from '@ts/supabaseTableRowTypes';
import useUser from '@hooks/common/useUser';

interface UseLeaveGroupParams {
  groupId: GroupsType['id'];
}
const useLeaveGroup = ({ groupId }: UseLeaveGroupParams) => {
  const queryClient = useQueryClient();

  const { user, isError: userError } = useUser();
  const userId = user ? user.id : '';

  if (userError) throw new Error(`user error : ${userError}`);

  const { mutate } = useMutation({
    mutationFn: () => deleteMember({ groupId, memberId: userId }),
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ['fetchWaitingMembers', groupId, userId] });
      queryClient.removeQueries({ queryKey: ['fetchCurMembers', groupId, userId] });
      queryClient.removeQueries({ queryKey: ['isLeader', groupId, userId] });
      queryClient.invalidateQueries({ queryKey: ['fetchGroupList', userId] });
    },
  });

  return mutate;
};

export default useLeaveGroup;
