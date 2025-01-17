'use server'

import { createClient } from '@utils/supabase/server';

export const deleteUser = async () => {
  const supabase = await createClient();
  const userId = (await supabase.auth.getUser()).data.user?.id;
  if (!userId) throw new Error();
  const { error } = await supabase.auth.admin.deleteUser(userId);
  if (error) throw error;
};
