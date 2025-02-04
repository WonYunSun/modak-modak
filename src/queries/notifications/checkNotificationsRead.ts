'use server'

import { createClient } from '@utils/supabase/server';
import { NotificationCardDataType } from '@queries/notifications/fetchNotifications';

interface ReadNotificationType {
  notificationId: string;
}
const readNotification = async ({ notificationId }: ReadNotificationType) => {
  try {
    const supabase = await createClient();

    await supabase.from('push_notifications').update({ is_read: true }).eq('id', notificationId);
  } catch (error) {
    throw new Error(`error : ${error}`);
  }
};

interface CheckReadNotificationsType {
  unreadNotifications: NotificationCardDataType[];
}
export const checkNotificationsRead = async ({ unreadNotifications }: CheckReadNotificationsType) => {
  try {
    await Promise.all(
      unreadNotifications.map(async (data) => {
        const { id } = data;

        return await readNotification({ notificationId: id });
      })
    );
  } catch (error) {
    throw new Error(`error : ${error}`);
  }
};
