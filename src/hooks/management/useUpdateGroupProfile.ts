'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateGroupProfile } from '@queries/management/updateGroupProfile';
import { uploadFile } from '@utils/uploadFile';
import { GroupsType } from '@queries/home/fetchGroupInfo';

export type GroupProfileMutationDataType = {
  groupName: GroupsType['name'];
  description: GroupsType['description'];
  groupProfileImg: File | null;
};

interface UpdateGroupProfile {
  groupId: GroupsType['id'];
}
const useUpdateGroupProfile = ({ groupId }: UpdateGroupProfile) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: async (groupProfileMutationData: GroupProfileMutationDataType) => {
      const { groupProfileImg } = groupProfileMutationData;
      const imgUrl = groupProfileImg ? await uploadFile('profiles', 'groups', groupProfileImg) : null;

      const groupProfileData = { ...groupProfileMutationData, groupProfileImg: imgUrl };
      await updateGroupProfile({ groupId, groupProfileData });
      return;
    },
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: [groupId] });
    },
  });

  return mutate;
};

export default useUpdateGroupProfile;
