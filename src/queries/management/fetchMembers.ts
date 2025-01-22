'use server';

import { createClient } from '@utils/supabase/server';
import { GroupMembersType, GroupsType, UsersType } from '@ts/supabaseTableRowTypes';

export interface filteredUsers {
  id: UsersType['id'];
  nickname: UsersType['nickname'];
  profile_image: UsersType['profile_image'];
}
export interface CurMemberType {
  group_id: GroupsType['id'];
  is_approved: GroupMembersType['is_approved'];
  is_leader: GroupMembersType['is_leader'];
  users: filteredUsers;
}

interface CurMemberTypeAssumtion extends Omit<CurMemberType, 'users'> {
  users: filteredUsers | filteredUsers[];
}

interface FetchMembersParams {
  groupId: GroupsType['id'];
}
export const fetchCurMembers = async ({ groupId }: FetchMembersParams): Promise<CurMemberType[] | null> => {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from('group_members')
      .select(`group_id, is_approved, is_leader, users( id, nickname, profile_image)`)
      .eq('group_id', groupId)
      .eq('is_approved', true);

    //한국어 닉네임을 상단에 표시하기 위해 한국어, 비한국어 구분
    const koreanNicknames: CurMemberTypeAssumtion[] = [];
    const nonKoreanNicknames: CurMemberTypeAssumtion[] = [];

    data?.forEach((userData) => {
      const user = Array.isArray(userData.users) ? userData.users[0] : userData.users;
      const nicknameCode = user.nickname.charCodeAt(0);
      if (nicknameCode > 44031 && nicknameCode < 55204) return koreanNicknames.push(userData);
      if (nicknameCode > 12592 && nicknameCode < 12644) return koreanNicknames.push(userData);
      return nonKoreanNicknames.push(userData);
    });

    //한국어 닉네임은 가나다순 정렬
    if (koreanNicknames.length) {
      koreanNicknames.sort((dataA, dataB) => {
        const nicknameA = Array.isArray(dataA.users) ? dataA.users[0].nickname : dataA.users.nickname;
        const nicknameB = Array.isArray(dataB.users) ? dataB.users[0].nickname : dataB.users.nickname;
        return nicknameA.localeCompare(nicknameB, 'ko');
      });
    }

    const sortedData = [...koreanNicknames, ...nonKoreanNicknames];
    const treatedData = sortedData.length ? sortedData : data;

    return treatedData as CurMemberType[] | null;
  } catch (error) {
    throw new Error(`${error}`);
  }
};

export const fetchWaitingMembers = async ({ groupId }: FetchMembersParams): Promise<CurMemberType[] | null> => {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from('group_members')
      .select(`group_id, is_approved, is_leader, users( id, nickname, profile_image)`)
      .eq('group_id', groupId)
      .eq('is_approved', false)
      .order('created_at', { ascending: true });

    return data as CurMemberType[] | null;
  } catch (error) {
    throw new Error(`${error}`);
  }
};

interface FetchLeaderInfoParams {
  groupId: GroupsType['id'];
}
export const fetchLeaderInfo = async ({ groupId }: FetchLeaderInfoParams): Promise<CurMemberType | null> => {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from('group_members')
      .select(`group_id, is_approved, is_leader, users( id, nickname, profile_image)`)
      .eq('group_id', groupId)
      .eq('is_leader', true)
      .single();

    return data as CurMemberType | null;
  } catch (error) {
    throw new Error(`${error}`);
  }
};
