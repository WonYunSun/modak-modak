'use server';

import { ScheduleType } from '@ts/scheduleType';
import { createClient } from '@utils/supabase/server';
import dayjs from 'dayjs';

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

export const updateScheduleById = async (scheduleId: string, newData: ScheduleType) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('schedules')
    .update({ ...newData })
    .eq('id', scheduleId)
    .select();

  if (error) {
    console.log('스케쥴 수정 실패', error);
    return;
  }
  return data;
};

export const getMySchedules = async (): Promise<ScheduleType[]> => {
  const supabase = await createClient();
  const today = dayjs();
  const userId = (await supabase.auth.getUser()).data.user?.id;

  const { data: groupIds, error: membersError } = await supabase
    .from('group_members')
    .select('group_id')
    .eq('user_id', userId)
    .eq('is_approved', true);
  if (membersError) throw new Error('');

  const { data, error: scheduleError } = await supabase
    .from('schedules')
    .select()
    .gte('start_date', today.format('YYYY-MM-DD'))
    .lte('start_date', today.add(27, 'day').format('YYYY-MM-DD'))
    .in(
      'group_id',
      groupIds.map((object) => object.group_id)
    )
    .order('start_date');
  if (scheduleError) throw new Error();
  return data;
};
