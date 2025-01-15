import { editPost } from '@app/queries/post/editPost';
import { getPost, PostWithSchedule } from '@app/queries/post/getPostById';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

// 게시글 수정 - 게시글 정보 가져오기
export const useFetchGetPost = (postId: string) => {
  const { data, isPending, isError } = useQuery({
    queryKey: [postId],
    queryFn: () => getPost(postId),
  });
  return { data, isPending, isError };
};

export const useFetchEditPost = (postId: string | string[], text: string) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: async () => {
      await editPost(postId, text);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postId });
    },
  });

  return { mutate };
};
