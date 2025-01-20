import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteUser } from '@queries/users/users';

const useDeleteUser = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => deleteUser(),
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ['user'] });
    },
  });

  return mutation;
};
export default useDeleteUser;
