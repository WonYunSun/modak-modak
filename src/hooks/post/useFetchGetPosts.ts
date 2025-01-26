import { getPosts } from 'queries/post/getPosts';
import { useInfiniteQuery } from '@tanstack/react-query';

const PAGE_SIZE = 1;

export const useFetchGetPosts = (groupId: string) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isPending, isError } = useInfiniteQuery({
    queryKey: [groupId, 'posts'],
    queryFn: ({ pageParam = 0 }) => getPosts(groupId, pageParam, PAGE_SIZE),
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < PAGE_SIZE) return undefined; // 더 이상 가져올 데이터가 없으면 종료
      return allPages.length * PAGE_SIZE; // 다음 offset 계산
    },
  });

  return { data, fetchNextPage, hasNextPage, isFetchingNextPage, isPending, isError };
};
