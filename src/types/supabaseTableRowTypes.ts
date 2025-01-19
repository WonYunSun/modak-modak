import { Database } from '@ts/supabase';

export type GroupMembersType = Database['public']['Tables']['group_members']['Row'];
export type GroupsType = Database['public']['Tables']['groups']['Row'];
export type UsersType = Database['public']['Tables']['users']['Row'];