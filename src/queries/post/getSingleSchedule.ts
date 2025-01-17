'use server';

import { createClient } from '@utils/supabase/server';

export const getSingleSchedule = async (selectedScheduleId: string) => {
  const supabase = await createClient();

  const { data: schedule, error } = await supabase.from('schedules').select('*').eq('id', selectedScheduleId).single();

  if (error) throw Error();

  return schedule;
};

export default getSingleSchedule;
