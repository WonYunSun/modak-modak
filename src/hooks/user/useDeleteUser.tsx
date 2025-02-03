import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useModalStore from '@stores/useModalStore';
import { deleteUser } from '@queries/users/users';

const useDeleteUser = () => {
  const queryClient = useQueryClient();
  const { closeModal } = useModalStore();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: () => deleteUser(),
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ['user'] });
      closeModal();
      router.push('/login');
    },
  });

  return mutation;
};
export default useDeleteUser;
