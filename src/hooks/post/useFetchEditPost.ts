import { useMutation, useQueryClient } from '@tanstack/react-query';

import { editPost } from '@queries/post/editPost';

export interface EditPostProps {
  postId: string;
  content: string;
  scheduleId: string;
}

export const useFetchEditPost = (groupId: string, editPostId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (editPostData: EditPostProps) => {
      await editPost(editPostData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [editPostId] });
      queryClient.invalidateQueries({ queryKey: ['posts', groupId, ''] });
    },
  });
};
