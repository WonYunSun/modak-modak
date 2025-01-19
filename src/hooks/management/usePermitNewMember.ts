'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { permitNewMember } from '@queries/management/manageMembers';
import { GroupsType, UsersType } from '@queries/home/fetchGroupInfo';

interface UsePermitNewMemberParams {
  groupId: GroupsType['id'];
  waitingUserId: UsersType['id'];
}
const usePermitNewMember = ({ groupId, waitingUserId }: UsePermitNewMemberParams) => {
  const queryClient = useQueryClient();

  //const userId = 'af747db7-11c9-4bbc-800b-9c02eb04a886' //임시 유저 아이디 : 멤버예요
  const userId = '6f565124-cfc9-46ef-b5ed-220680b11db3'; //임시 유저 아이디 : 관리자예요

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
