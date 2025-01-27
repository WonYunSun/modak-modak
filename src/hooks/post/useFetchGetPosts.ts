import { getPosts } from 'queries/post/getPosts';
import { useInfiniteQuery } from '@tanstack/react-query';

const PAGE_SIZE = 1;

export const useFetchGetPosts = (groupId: string) => {
  const { data, fetchNextPage, hasNextPage, isPending, isError } = useInfiniteQuery({
    queryKey: [groupId, 'posts'],
    queryFn: ({ pageParam = 0 }) => getPosts(groupId, Number(pageParam), PAGE_SIZE),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      // 데이터가 비어 있으면 페이지네이션 종료
      return lastPage.length > 0 ? allPages.length + 1 : undefined;
    },
  });

  return { data, fetchNextPage, hasNextPage, isPending, isError };
};
