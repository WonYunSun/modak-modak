'use server';

import { createClient } from '@utils/supabase/server';

export const getSchedule = async (groupId: string) => {
  const supabase = await createClient();

  const { data: schedules, error } = await supabase.from('schedules').select('*').eq('group_id', groupId);

  if (error) throw Error();

  return schedules;
};
