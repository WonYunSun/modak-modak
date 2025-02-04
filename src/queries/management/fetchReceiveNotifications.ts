'use server';

import { createClient } from '@utils/supabase/server';
import { User } from '@supabase/supabase-js';
import { GroupsType } from '@ts/supabaseTableRowTypes';

interface FetchReceiveNotificationsParams {
  userId: User['id'];
  groupId: GroupsType['id'];
}
export const FetchReceiveNotifications = async ({ userId, groupId }: FetchReceiveNotificationsParams) => {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from('group_members')
      .select('receive_notifications')
      .eq('group_id', groupId)
      .eq('user_id', userId)
      .single();

    if (data) {
      const { receive_notifications: receiveNotifications } = data;
      return receiveNotifications as boolean;
    } else {
      throw new Error('Fetch receive notification error : data is null');
    }
  } catch (error) {
    throw new Error(`Fetch receive notification error : ${error}`);
  }
};
