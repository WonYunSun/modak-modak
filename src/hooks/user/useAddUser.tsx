'use client';

import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { addUserInfo } from '@queries/users/users';

type MutationFnParams = {
  nickname: string;
  imageUrl: string;
  options: { [key: string]: string };
};

const useAddUser = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  // const { user } = useUser();

  const mutation = useMutation({
    mutationFn: async ({ nickname, imageUrl }: MutationFnParams) => {
      await addUserInfo({
        nickname: nickname,
        profile_image: imageUrl,
      });
    },
    onSuccess: (_, variables) => {
      queryClient.removeQueries({ queryKey: ['user'] });
      const { referrer, data } = variables.options;
      if (referrer === 'join') return router.push(`/join/${data}?is_successful=true`);
      router.push(`/signup/success`);
    },
    onError: (_, variables) => {
      const { referrer, data } = variables.options;
      if (referrer === 'join') router.push(`/join/${data}?is_successful=false`);
    },
  });

  return mutation;
};

export default useAddUser;
