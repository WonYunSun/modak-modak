'use server';

import { createClient } from '@utils/supabase/server';
import { GroupsType, UsersType } from '@ts/supabaseTableRowTypes';

interface LeaderTransitionParams {
  groupId: GroupsType['id'];
  leaderId: UsersType['id'];
  newLeaderId: UsersType['id'];
}
export const leaderTransition = async ({ groupId, leaderId, newLeaderId }: LeaderTransitionParams) => {
  try {
    const supabase = await createClient();

    //기존 대표
    await supabase.from('group_members').update({ is_leader: false }).eq('group_id', groupId).eq('user_id', leaderId);
    //새로운 대표
    await supabase.from('group_members').update({ is_leader: true }).eq('group_id', groupId).eq('user_id', newLeaderId);
  } catch (error) {
    throw new Error(`${error}`);
  }
};
