'use client';

import { useQuery } from '@tanstack/react-query';
import { GroupsType } from 'queries/home/fetchGroupInfo';
import { fetchLeaderInfo } from 'queries/management/fetchMembers';

interface UseIsLeaderParams {
  groupId: GroupsType['id'];
}
const useIsLeader = ({ groupId }: UseIsLeaderParams) => {
  //const userId = 'af747db7-11c9-4bbc-800b-9c02eb04a886' //임시 유저 아이디 : 멤버예요
  const userId = '6f565124-cfc9-46ef-b5ed-220680b11db3'; //임시 유저 아이디 : 관리자예요

  const { data, isPending, isError } = useQuery({
    queryKey: [`isLeader-${groupId}-${userId}`],
    queryFn: async () => {
      const data = await fetchLeaderInfo({ groupId });

      if (data && data.users.id === userId) {
        return true;
      }
      return false;
    },
  });

  return { data, isPending, isError };
};

export default useIsLeader;
