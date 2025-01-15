'use server';

import { createClient } from '../../utils/supabase/server';
import { GroupsType } from '../home/fetchGroupInfo';
import { Database } from '@ts/supabase';

export type GroupMembersType = Database['public']['Tables']['group_members']['Row'];

export interface filteredUsers {
  id: string;
  nickname: string;
  profile_image: string;
}
export interface CurMemberType {
  group_id: string;
  is_approved: boolean;
  is_leader: boolean;
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
      .eq('is_approved', true);

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

// interface FetchUserInfoParams {
//   userId: UsersType['id'];
//   groupId: GroupsType['id'];
// }
// export const fetchUserInfo = async ({ userId, groupId }: FetchUserInfoParams): Promise<GroupMembersType | null> => {
//   try {
//     const supabase = await createClient();
//     const { data } = await supabase.from('group_members').select().eq('group_id', groupId).eq('id', userId).single();

//     return data;
//   } catch (error) {
//     throw new Error(`${error}`);
//   }
// };
