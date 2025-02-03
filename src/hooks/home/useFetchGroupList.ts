'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchGroupCardInfos } from '@queries/home/fetchGroupInfo';
import useUser from '@hooks/useUser';

const useFetchGroupList = () => {
  const queryClient = useQueryClient();
  const { user, isError: userError } = useUser();
  const userId = user ? user.id : null;

  if (userError) throw new Error(`user error : ${userError}`);

  const { data, isPending, isError } = useQuery({
    queryKey: ['fetchGroupList', userId],
    queryFn: async () => {
      const data = userId ? await fetchGroupCardInfos({ userId }) : null;
      if (data) return data.length ? data : null;
    },
  });

  const invalidateGroupListQuery = () => {
    queryClient.invalidateQueries({ queryKey: ['fetchGroupList', userId] });
  };

  return { data, isPending, isError, invalidateGroupListQuery };
};

export default useFetchGroupList;
