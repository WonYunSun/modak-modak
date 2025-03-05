import { useMutation, useQueryClient } from '@tanstack/react-query';

import useUser from '@hooks/common/useUser';

import { CommentsType } from '@queries/group/comments/fetchComments';
import createComment from '@queries/group/comments/createComment';

const useCommentInput = (postId: string) => {
  const queryClient = useQueryClient();

  const { user } = useUser();

  const mutation = useMutation({
    mutationFn: (content: string) => createComment(content, postId, user?.id as string),
    onMutate: async (newContent) => {
      await queryClient.cancelQueries({ queryKey: ['comments', postId] });

      const previousComments = queryClient.getQueryData(['comments', postId]);

      queryClient.setQueryData(['comments', postId], (old: CommentsType[]) => [
        ...old,
        {
          content: newContent,
          post_id: postId,
          user_id: user?.id,
          created_at: new Date().toISOString(),
          users: {
            id: user?.id,
            nickname: user?.user_metadata?.nickname,
            profile_image: user?.user_metadata?.profile_image,
          },
        },
      ]);

      return { previousComments };
    },
    onError: (_err, _newContent, context) => {
      queryClient.setQueryData(['comments', postId], context?.previousComments);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', postId] });
    },
  });

  return mutation;
};

export default useCommentInput;
