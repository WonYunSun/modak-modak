'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteGroup } from '@queries/management/deleteGroup';
import { GroupsType } from '@ts/supabaseTableRowTypes';

interface UseDeleteGroupParams {
  groupId: GroupsType['id'];
}
const useDeleteGroup = ({ groupId }: UseDeleteGroupParams) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteGroup({ groupId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fetchGroupList'] });
      queryClient.removeQueries({ queryKey: [groupId] });
    },
  });
};

export default useDeleteGroup;
