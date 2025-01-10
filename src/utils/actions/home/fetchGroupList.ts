'use server';

import { GroupCardInfosType } from '@components/common/GroupCard';
import { createClient } from '../../supabase/server';
import { Database } from '@ts/supabase';

export type GroupMembersType = Database['public']['Tables']['group_members']['Row'];
export type GroupsType = Database['public']['Tables']['groups']['Row'];
export type UsersType = Database['public']['Tables']['users']['Row'];

interface FetchEnteredGroupListParams {
  userId: UsersType['id'];
}
export const fetchEnteredGroupList = async ({
  userId
}: FetchEnteredGroupListParams): Promise<GroupMembersType[] | null> => {
  try {
    const supabase = await createClient();
    const { data } = await supabase.from('group_members').select().eq('user_id', userId).eq('is_approved', true);

    return data;
  } catch (error) {
    throw new Error(`${error}`);
  }
};

interface FetchGroupInfoParams {
  groupId: GroupsType['id'];
}
export const fetchGroupInfo = async ({ groupId }: FetchGroupInfoParams): Promise<GroupsType | null> => {
  try {
    const supabase = await createClient();
    const { data } = await supabase.from('groups').select().eq('id', groupId).single();

    return data;
  } catch (error) {
    throw new Error(`${error}`);
  }
};

interface fetchGroupMembersNumParams {
  groupId: GroupMembersType['group_id'];
}
export const fetchGroupMembersNum = async ({ groupId }: fetchGroupMembersNumParams): Promise<number | null> => {
  try {
    const supabase = await createClient();
    const { data } = await supabase.from('group_members').select().eq('group_id', groupId);

    return data ? data.length : null;
  } catch (error) {
    throw new Error(`${error}`);
  }
};

interface FetchGroupCardInfosParams {
  userId: UsersType['id'];
}
export const fetchGroupCardInfos = async ({
  userId
}: FetchGroupCardInfosParams): Promise<GroupCardInfosType[] | null> => {
  try {
    const enteredGroupList = await fetchEnteredGroupList({ userId });
    if (!enteredGroupList) return null;

    const groupCardInfos = await Promise.all(
      enteredGroupList.map(async (groupParticipationData) => {
        const { group_id: groupId } = groupParticipationData;

        //유저가 멤버로 참여한 방의 데이터를 순회하므로, 멤버의 숫자가 null일 수 없습니다
        const groupNum = (await fetchGroupMembersNum({ groupId })) as number;
        const groupData = (await fetchGroupInfo({ groupId })) as GroupsType;

        return { ...groupData, membersNum: groupNum };
      })
    );

    return groupCardInfos;
  } catch (error) {
    throw new Error(`${error}`);
  }
};
