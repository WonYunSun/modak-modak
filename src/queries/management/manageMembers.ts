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

interface deleteMemberParams extends Omit<manageWatingUserParams, 'waitingUserId'> {
  memberId: UsersType['id'];
}
export const deleteMember = async ({ groupId, memberId }: deleteMemberParams) => {
  try {
    const supabase = await createClient();

    await supabase.from('group_members').delete().eq('group_id', groupId).eq('user_id', memberId);
  } catch (error) {
    throw new Error(`${error}`);
  }
};
