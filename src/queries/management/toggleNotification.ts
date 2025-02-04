'use server';

import { createClient } from '@utils/supabase/server';
import { User } from '@supabase/supabase-js';
import { GroupsType } from '@ts/supabaseTableRowTypes';

interface ToggleNotificationParams {
  userId: User['id'];
  groupId: GroupsType['id'];
  toggleTo: boolean;
}
export const toggleNotification = async ({ userId, groupId, toggleTo }: ToggleNotificationParams) => {
  try {
    const supabase = await createClient();
    await supabase
      .from('group_members')
      .update({ receive_notifications: toggleTo })
      .eq('group_id', groupId)
      .eq('user_id', userId);
  } catch (error) {
    throw new Error(`toggle notification error : ${error}`);
  }
};
