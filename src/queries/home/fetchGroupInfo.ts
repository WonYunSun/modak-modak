'use server';

import { GroupCardInfosType } from '@components/common/groupCard/GroupCard';
import { createClient } from '@utils/supabase/server';
import { GroupMembersType, GroupsType, UsersType } from '@ts/supabaseTableRowTypes';

interface FetchUserGroupListParams {
  userId: UsersType['id'];
  isApproved: boolean;
}
export const fetchUserGroupList = async ({
  userId,
  isApproved,
}: FetchUserGroupListParams): Promise<GroupMembersType[] | null> => {
  try {
    const supabase = await createClient();
    const { data } = await supabase.from('group_members').select().eq('user_id', userId).eq('is_approved', isApproved);

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
export const fetchGroupMembersNum = async ({ groupId }: fetchGroupMembersNumParams): Promise<number | Error> => {
  try {
    const supabase = await createClient();
    const { data } = await supabase.from('group_members').select().eq('group_id', groupId).eq('is_approved', true);

    if (data) return data.length;
    return new Error(`fetchGroupMembersNum: data.length is null`);
  } catch (error) {
    throw new Error(`${error}`);
  }
};

interface FetchGroupCardInfosParams {
  userId: UsersType['id'];
  isApproved?: boolean;
}
export const fetchGroupCardInfos = async ({
  userId,
  isApproved = true,
}: FetchGroupCardInfosParams): Promise<GroupCardInfosType[] | null> => {
  try {
    const userGroupList = await fetchUserGroupList({ userId, isApproved });
    if (!userGroupList) return null;

    const groupCardInfos = await Promise.all(
      userGroupList.map(async (groupParticipationData) => {
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
