import { useQuery } from '@tanstack/react-query';

import { getGroupInfo } from 'queries/group/getGroupInfo';

// 모임 카드 정보 가져오기(그룹 인원 수까지)
export const useFetchGetGroup = (groupId: string) => {
  const { data, isPending, isError } = useQuery({
    queryKey: ['useFetchGetGroup', groupId],
    queryFn: () => getGroupInfo(groupId),
  });
  return { data, isPending, isError };
};
