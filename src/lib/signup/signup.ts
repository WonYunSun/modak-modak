'use server'

import { Database } from '@ts/supabase';
import { createClient } from '@utils/supabase/server';

type UserInsert = Database['public']['Tables']['users']['Insert'];

export const addUserInfo = async (user: UserInsert) => {
  const supabase = await createClient();
  const { error: insertError } = await supabase.from('users').insert(user).select();
  if (insertError) throw new Error();
  const { error } = await supabase.auth.updateUser({
    data: { nickname: user.nickname, profileImage: user.profile_image }
  });
  if (error) throw error;
};
