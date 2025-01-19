'use client';

import { useQuery } from '@tanstack/react-query';
import { isAlreadyMember } from '@queries/join/queryJoinGroup';
import useUser from '@hooks/useUser';
import { GroupsType } from '@ts/supabaseTableRowTypes';

type JoinStateType = 'member' | 'waiting' | 'joinable';

export interface IsAlreadyJoinParams {
  groupId: GroupsType['id'];
}
const useIsAlreadyJoin = ({ groupId }: IsAlreadyJoinParams) => {
  //유저 아이디 사용
  const { user, isError: userError } = useUser();
  const userId = user ? user.id : '';

  if (userError) throw new Error(`user error : ${userError}`);

  const { data, isPending, isError } = useQuery({
    queryKey: ['isAlreadyJoin', groupId, userId],
    queryFn: async (): Promise<JoinStateType> => {
      const data = await isAlreadyMember({ groupId, userId });
      if (data) return data['is_approved'] ? 'member' : 'waiting';

      return 'joinable';
    },
  });
  return { data, isPending, isError };
};

export default useIsAlreadyJoin;
