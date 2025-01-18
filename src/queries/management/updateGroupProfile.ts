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
    } else {
      await supabase.from('groups').update({ name: groupName, description }).eq('id', groupId);
    }
  } catch (error) {
    throw new Error(`${error}`);
  }
};
