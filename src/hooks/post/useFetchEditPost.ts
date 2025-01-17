import { editPost } from '@queries/post/editPost';
import { useMutation, useQueryClient } from '@tanstack/react-query';

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
