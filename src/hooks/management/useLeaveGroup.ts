'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteMember } from '@queries/management/manageMembers';
import { GroupsType } from '@queries/home/fetchGroupInfo';

interface UseLeaveGroupParams {
  groupId: GroupsType['id'];
}
const useLeaveGroup = ({ groupId }: UseLeaveGroupParams) => {
  const queryClient = useQueryClient();

  //const userId = 'af747db7-11c9-4bbc-800b-9c02eb04a886' //임시 유저 아이디 : 멤버예요
  const userId = '6f565124-cfc9-46ef-b5ed-220680b11db3'; //임시 유저 아이디 : 관리자예요

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
