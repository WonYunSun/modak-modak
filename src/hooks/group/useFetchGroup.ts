import { useQuery } from '@tanstack/react-query';

import { getGroupInfo } from 'queries/group/getGroupInfo';

// 게시글 수정 - 게시글 정보 가져오기
export const useFetchGetGroupInfo = (groupId: string) => {
  const { data, isPending, isError } = useQuery({
    queryKey: [groupId],
    queryFn: () => getGroupInfo(groupId),
  });
  return { data, isPending, isError };
};
