'use client';

import { addUserInfo } from '@queries/users/users';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

type MutationFnParams = {
  nickname: string;
  imageUrl: string;
  options: { [key: string]: string };
};

const useAddUser = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async ({ nickname, imageUrl }: MutationFnParams) => {
      await addUserInfo({
        nickname: nickname,
        profile_image: imageUrl,
      });
    },
    onSuccess: async (_, variables) => {
      queryClient.removeQueries({ queryKey: ['user'] });
      const { referrer, data } = variables.options;
      router.push(`/signup/success?referrer=${referrer}&data=${data}`);
    },
  });

  return mutation;
};

export default useAddUser;
