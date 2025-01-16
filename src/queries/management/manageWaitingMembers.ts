'use server';

import { createClient } from '@utils/supabase/server';
import { GroupsType, UsersType } from '@queries/home/fetchGroupInfo';

interface manageWatingUserParams {
  groupId: GroupsType['id'];
  waitingUserId: UsersType['id'];
}
export const permitNewMember = async ({ groupId, waitingUserId }: manageWatingUserParams) => {
  try {
    const supabase = await createClient();

    await supabase
      .from('group_members')
      .update({ is_approved: true })
      .eq('group_id', groupId)
      .eq('user_id', waitingUserId);
  } catch (error) {
    throw new Error(`${error}`);
  }
};

export const refuseNewMember = async ({ groupId, waitingUserId }: manageWatingUserParams) => {
  try {
    const supabase = await createClient();

    await supabase.from('group_members').delete().eq('group_id', groupId).eq('user_id', waitingUserId);
  } catch (error) {
    throw new Error(`${error}`);
  }
};
