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

    return data as CurMemberType[] | null;
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
