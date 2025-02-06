'use server';

import { createClient } from '@utils/supabase/server';
import { GroupsType } from '@ts/supabaseTableRowTypes';

export type GroupProfileDataType = {
  groupName: GroupsType['name'];
  description: GroupsType['description'];
  groupProfileImg: GroupsType['image_url'] | null;
};

interface UpdateGroupProfilesParams {
  groupId: GroupsType['id'];
  groupProfileData: GroupProfileDataType;
}
export const updateGroupProfile = async ({ groupId, groupProfileData }: UpdateGroupProfilesParams) => {
  try {
    const supabase = await createClient();
    const { groupName, description, groupProfileImg } = groupProfileData;

    if (groupProfileImg) {
      await supabase
        .from('groups')
        .update({ name: groupName, description, image_url: groupProfileImg })
        .eq('id', groupId);

      // 그룹명 혹은 프로필 변경시 채팅방 데이터도 같이 업데이트
      await supabase.from('chat_rooms').update({ name: groupName }).eq('group_id', groupId);
    } else {
      await supabase.from('groups').update({ name: groupName, description }).eq('id', groupId);
      await supabase.from('chat_rooms').update({ name: groupName }).eq('group_id', groupId);
    }
  } catch (error) {
    throw new Error(`${error}`);
  }
};
