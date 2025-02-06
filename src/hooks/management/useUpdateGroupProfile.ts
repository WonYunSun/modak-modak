'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateGroupProfile } from '@queries/management/updateGroupProfile';
import { uploadFile } from '@utils/uploadFile';
import { GroupsType } from '@ts/supabaseTableRowTypes';

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
      queryClient.removeQueries({ queryKey: ['useFetchGetGroup', groupId] });
      // 프로필 변경후 채팅방 이름도 변경
    },
  });

  return { mutate };
};

export default useUpdateGroupProfile;
