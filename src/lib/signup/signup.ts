'use server';

import { Database } from '@ts/supabase';
import { createClient } from '@utils/supabase/server';

type UserInsert = Database['public']['Tables']['users']['Insert'];

export const addUserInfo = async (user: UserInsert) => {
  const supabase = await createClient();
  const { error: insertError } = await supabase.from('users').upsert(user).select();
  if (insertError) throw new Error('회원 가입에 실패했습니다.');
  const { error } = await supabase.auth.updateUser({
    data: { nickname: user.nickname, profile_image: user.profile_image }
  });
  if (error) throw new Error('잠시 후 다시 시도해주세요.');
};
