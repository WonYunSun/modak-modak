import { useMutation, useQueryClient } from '@tanstack/react-query';
import { leaderTransition } from '@queries/management/leaderTransition';
import { GroupsType, UsersType } from '@queries/home/fetchGroupInfo';

interface UseLeaderTransitionParams {
  groupId: GroupsType['id'];
  newLeaderId: UsersType['id'];
}
const useLeaderTransition = ({ groupId, newLeaderId }: UseLeaderTransitionParams) => {
  const queryClient = useQueryClient();

  //const userId = 'af747db7-11c9-4bbc-800b-9c02eb04a886' //임시 유저 아이디 : 멤버예요
  const userId = '6f565124-cfc9-46ef-b5ed-220680b11db3'; //임시 유저 아이디 : 관리자예요

  const { mutate } = useMutation({
    mutationFn: async () => {
      await leaderTransition({ groupId, leaderId: userId, newLeaderId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['isLeader', groupId, userId] });
      queryClient.invalidateQueries({ queryKey: ['fetchCurMembers', groupId, userId] });
    },
  });
  return mutate;
};

export default useLeaderTransition;
