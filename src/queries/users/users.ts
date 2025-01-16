'use server';

import { Database } from '@ts/supabase';
import { createClient } from '@utils/supabase/server';

type UserUpdate = Database['public']['Tables']['users']['Update'];
type UserInsert = Database['public']['Tables']['users']['Insert'];

export const addUserInfo = async (user: UserInsert) => {
  const supabase = await createClient();
  const { error: insertError } = await supabase.from('users').upsert(user).select();
  if (insertError) throw new Error('회원 가입에 실패했습니다.');
  const { error } = await supabase.auth.updateUser({
    data: { nickname: user.nickname, profile_image: user.profile_image },
  });
  if (error) throw new Error('잠시 후 다시 시도해주세요.');
};

export const deleteUser = async () => {
  const supabase = await createClient();
  const userId = (await supabase.auth.getUser()).data.user?.id;
  if (!userId) throw new Error();
  const { error } = await supabase.auth.admin.deleteUser(userId);
  if (error) throw error;
};

export const updateUser = async (toUpdate: UserUpdate) => {
  const supabase = await createClient();
  const user = await supabase.auth.getUser();
  if (!user) throw new Error();
  const userId = user.data.user?.id;
  const { error } = await supabase.from('users').update(toUpdate).eq('id', userId);
  if (error) throw new Error();
};
