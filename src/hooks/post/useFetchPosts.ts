import { getPosts } from '@app/queries/post/getPosts';
import { useQuery } from '@tanstack/react-query';

export const useFetchGetPosts = (groupId: string) => {
  const { data, isPending, isError } = useQuery({
    queryKey: [groupId, 'posts'],
    queryFn: () => getPosts(groupId),
  });

  return { data, isPending, isError };
};
