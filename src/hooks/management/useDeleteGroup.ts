'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteGroup } from '@queries/management/deleteGroup';
import { GroupsType } from '@queries/home/fetchGroupInfo';

interface UseDeleteGroupParams {
  groupId: GroupsType['id'];
}
const useDeleteGroup = ({ groupId }: UseDeleteGroupParams) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: () => deleteGroup({ groupId }),
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: [groupId] });
      queryClient.invalidateQueries({ queryKey: ['fetchGroupList'] });
    },
  });

  return mutate;
};

export default useDeleteGroup;
