'use server';

import { createClient } from '@utils/supabase/server';
import { UsersType } from '@ts/supabaseTableRowTypes';
import { IconStyleType } from '@app/notifications/_components/NotificationCard';

const TABLEBYTYPE = {
  group_members_new: 'group_members',
  schedules_new: 'schedules',
};

//Promise<GroupMembersType[] | null>

export type NotificationCardDataType = {
  id: string;
  isRead: boolean;
  iconStyle: IconStyleType;
  config: {
    notificationImgUrl: string;
    linkTo: string;
    title: string;
    body: string;
  };
};

type FetchDataConfigType = {
  groupId: string;
  triggeredRowId: string;
  isRead: boolean;
};

type NotificationType = 'group_members_new' | 'schedules_new';

interface FetchNotificationsDataParams {
  type: NotificationType;
  fetchDataConfig: FetchDataConfigType;
}

export const fetchNotificationsData = async ({ type, fetchDataConfig }: FetchNotificationsDataParams) => {
  const { groupId, triggeredRowId, isRead } = fetchDataConfig;
  try {
    const supabase = await createClient();

    const { data: groupData } = await supabase.from('groups').select().eq('id', groupId).single();
    const { data: triggeredRow } = await supabase.from(TABLEBYTYPE[type]).select().eq('id', triggeredRowId).single();

    if (type === 'group_members_new') {
      const { data: newMemberData } = await supabase.from('users').select().eq('id', triggeredRow?.user_id).single();

      const notificationCardData = {
        id: triggeredRow?.id,
        isRead,
        iconStyle: 'memberImg',
        config: {
          notificationImgUrl: newMemberData?.profile_image,
          linkTo: `/groups/${groupId}/management/members`,
          title: '새로운 멤버가 들어왔어요',
          body: `${groupData?.name}에 '${newMemberData?.nickname}'님이 멤버가 되었어요`,
        },
      };

      return notificationCardData as NotificationCardDataType;
    }

    if (type === 'schedules_new') {
      const notificationCardData = {
        isRead,
        iconStyle: 'groupImg',
        config: {
          notificationImgUrl: groupData?.image_url,
          linkTo: `/groups/${groupId}/schedules/${triggeredRow?.id}`,
          title: '일정이 등록되었어요',
          body: `${groupData?.name}에 '${triggeredRow?.name}'일정이 생겼어요`,
        },
      };

      return notificationCardData as NotificationCardDataType;
    }
  } catch (error) {
    throw new Error(`${error}`);
  }
};

interface FetchUserGroupListParams {
  userId: UsersType['id'];
}
export const fetchNotifications = async ({ userId }: FetchUserGroupListParams) => {
  try {
    const supabase = await createClient();
    const { data: notifications } = await supabase
      .from('push_notifications')
      .select()
      .eq('target_user_id', userId)
      .order('created_at', { ascending: false });

    if (!notifications) return;

    const unReadNotifications = notifications.filter(({ is_read }) => is_read === false);
    const alreadyReadNotifications = notifications.filter(({ is_read }) => is_read === true);

    const unReadData = await Promise.all(
      unReadNotifications.map(async ({ group_id, triggered_row_id, is_read, type }) => {
        const fetchDataConfig = { groupId: group_id, triggeredRowId: triggered_row_id, isRead: is_read };

        return await fetchNotificationsData({ type, fetchDataConfig });
      })
    );
    const alreadyReadData = await Promise.all(
      alreadyReadNotifications.map(async ({ group_id, triggered_row_id, is_read, type }) => {
        const fetchDataConfig = { groupId: group_id, triggeredRowId: triggered_row_id, isRead: is_read };

        return await fetchNotificationsData({ type, fetchDataConfig });
      })
    );

    return { unRead: unReadData, alreadyRead: alreadyReadData };
  } catch (error) {
    throw new Error(`${error}`);
  }
};
