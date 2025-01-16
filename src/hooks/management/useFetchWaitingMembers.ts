'use client';

import { GroupsType } from '@queries/home/fetchGroupInfo';
import { fetchWaitingMembers } from '@queries/management/fetchMembers';
import { useQuery } from '@tanstack/react-query';

interface UseFetchWaitingMembersParams {
  groupId: GroupsType['id'];
}
const useFetchWaitingMembers = ({ groupId }: UseFetchWaitingMembersParams) => {
  //const userId = 'af747db7-11c9-4bbc-800b-9c02eb04a886' //임시 유저 아이디 : 멤버예요
  const userId = '6f565124-cfc9-46ef-b5ed-220680b11db3'; //임시 유저 아이디 : 관리자예요

  const { data, isPending, isError } = useQuery({
    queryKey: ['fetchWaitingMembers', groupId, userId],
    queryFn: async () => {
      return await fetchWaitingMembers({ groupId });
    },
  });

  return { data, isPending, isError };
};

export default useFetchWaitingMembers;
