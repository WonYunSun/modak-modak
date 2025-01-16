'use server';

import { createClient } from '@utils/supabase/server';
import { GroupsType, UsersType } from '@queries/home/fetchGroupInfo';

interface ManageWatingUserParams {
  groupId: GroupsType['id'];
  waitingUserId: UsersType['id'];
}
export const permitNewMember = async ({ groupId, waitingUserId }: ManageWatingUserParams) => {
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

interface DeleteMemberParams extends Omit<ManageWatingUserParams, 'waitingUserId'> {
  memberId: UsersType['id'];
}
export const deleteMember = async ({ groupId, memberId }: DeleteMemberParams) => {
  try {
    const supabase = await createClient();

    await supabase.from('group_members').delete().eq('group_id', groupId).eq('user_id', memberId);
  } catch (error) {
    throw new Error(`${error}`);
  }
};
