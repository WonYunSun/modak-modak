'use server';

import { createClient } from '@utils/supabase/server';
import { GroupMembersType, GroupsType, UsersType } from '@ts/supabaseTableRowTypes';

export interface QueryJoinGroupParams {
  groupId: GroupsType['id'];
  userId: UsersType['id'];
}
export const isAlreadyMember = async ({ groupId, userId }: QueryJoinGroupParams): Promise<GroupMembersType | null> => {
  try {
    const supabase = await createClient();
    const { data } = await supabase.from('group_members').select().eq('group_id', groupId).eq('user_id', userId).single();

    return data as GroupMembersType | null;
  } catch (error) {
    throw new Error(`${error}`);
  }
};

export const queryJoinGroup = async ({ groupId, userId }: QueryJoinGroupParams) => {
  try {
    const supabase = await createClient();

    await supabase
      .from('group_members')
      .insert([{ group_id: groupId, is_approved: false, is_leader: false, user_id: userId }]);
  } catch (error) {
    throw new Error(`${error}`);
  }
};
