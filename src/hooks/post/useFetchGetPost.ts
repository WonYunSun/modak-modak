import { getPost } from 'queries/post/getPostById';
import { useQuery } from '@tanstack/react-query';

// 게시글 수정 - 게시글 정보 가져오기
export const useFetchGetPost = (postId: string) => {
  const { data, isPending, isError } = useQuery({
    queryKey: [postId],
    queryFn: () => getPost(postId),
  });
  return { data, isPending, isError };
};
