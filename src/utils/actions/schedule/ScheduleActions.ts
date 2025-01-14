'use server';

import { createClient } from '../../supabase/server';
import { ScheduleType } from '@ts/scheduleType';

export const addSchedule = async (scheduleData: ScheduleType): Promise<ScheduleType[] | null> => {
  try {
    const supabase = await createClient();

    const { data } = await supabase.from('schedules').insert([
      {
        name: scheduleData.name,
        start_date: scheduleData.start_date,
        end_date: scheduleData.end_date,
        group_id: scheduleData.group_id,
        start_time: scheduleData.start_time,
        memo: scheduleData.memo,
        created_at: scheduleData.created_at
      }
    ]);

    return data;
  } catch (error) {
    throw new Error(`${error}`);
  }
};

export const fetchSchedulesBygroupId = async (groupId: string): Promise<ScheduleType[] | null> => {
  try {
    const supabase = await createClient();
    const { data } = await supabase.from('schedules').select('*').eq('group_id', groupId);

    return data;
  } catch (error) {
    throw new Error(`${error}`);
  }
};
