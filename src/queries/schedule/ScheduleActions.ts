'use server';

import { createClient } from '../../utils/supabase/server';
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
        created_at: scheduleData.created_at,
      },
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

export const fetchScheduleById = async (scheduleId: string): Promise<ScheduleType | null> => {
  try {
    const supabase = await createClient();
    const { data } = await supabase.from('schedules').select('*').eq('id', scheduleId).single();

    return data;
  } catch (error) {
    throw new Error(`${error}`);
  }
};

export const deleteScheduleById = async (scheduleId: string) => {
  const supabase = await createClient();
  const { error } = await supabase.from('schedules').delete().eq('id', scheduleId);
  if (error) {
    console.log('스케쥴 삭제 실패', error);
    return;
  }
};
