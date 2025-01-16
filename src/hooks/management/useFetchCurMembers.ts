'use client';

import { useQuery } from '@tanstack/react-query';
import { GroupsType } from '@queries/home/fetchGroupInfo';
import { CurMemberType, fetchCurMembers } from '@queries/management/fetchMembers';

interface UseFetchCurMembersParams {
  groupId: GroupsType['id'];
}
const useFetchCurMembers = ({ groupId }: UseFetchCurMembersParams) => {
  //const userId = 'af747db7-11c9-4bbc-800b-9c02eb04a886' //임시 유저 아이디 : 멤버예요
  const userId = '6f565124-cfc9-46ef-b5ed-220680b11db3'; //임시 유저 아이디 : 관리자예요

  const { data, isPending, isError } = useQuery({
    queryKey: ['fetchCurMembers', groupId, userId],
    queryFn: async () => {
      const data = await fetchCurMembers({ groupId });
      if (data) {
        const me = data.find((member) => member.users.id === userId) as CurMemberType;
        const others = data.filter((member) => member.users.id !== userId);
        return { me, others };
      }
      return null;
    },
  });

  return { data, isPending, isError };
};

export default useFetchCurMembers;
