'use client';

import { InvalidateQueryFilters, useMutation, useQueryClient } from '@tanstack/react-query';

const useUploadPost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await fetch('/api/post', {
        method: 'POST',
        body: formData,
      });

      const groupId = formData.get('groupId') as string;

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'useUploadPost: 게시글 업로드 실패');
      }

      return { groupId, ...(await response.json()) };
    },
    onSuccess: (data) => {
      const { groupId } = data;
      queryClient.invalidateQueries([groupId, 'posts'] as InvalidateQueryFilters);
      console.log('업로드 성공:', data);

      // TODO: alert창 수정 필요
      alert('게시글이 등록되었습니다!');
    },
    onError: (error: Error) => {
      console.error('useUploadPost: 업로드 실패:', error.message);
      // TODO: alert창 수정 필요
      alert(`게시글 등록에 실패했습니다.: ${error.message}`);
    },
  });
};

export default useUploadPost;
