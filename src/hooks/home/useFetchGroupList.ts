'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchGroupCardInfos } from '@queries/home/fetchGroupInfo';
import useUser from '@hooks/useUser';

const useFetchGroupList = () => {
  const { user, isError: userError } = useUser();
  const userId = user ? user.id : null;

  if (userError) throw new Error(`user error : ${userError}`);

  const { data, isPending, isError } = useQuery({
    queryKey: ['fetchGroupList', userId],
    queryFn: async () => {
      if (userId) return await fetchGroupCardInfos({ userId });
    },
  });

  return { data, isPending, isError };
};

export default useFetchGroupList;
