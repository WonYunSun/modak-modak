'use server';

import { createClient } from '@utils/supabase/server';

export const getSchedules = async (groupId: string) => {
  const supabase = await createClient();

  const { data: schedules, error } = await supabase
    .from('schedules')
    .select('*')
    .eq('group_id', groupId)
    .order('start_date', { ascending: false });

  if (error) throw Error();

  return schedules;
};
