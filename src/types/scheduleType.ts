import { Database } from '@ts/supabase';

export type ScheduleType = Database['public']['Tables']['schedules']['Row'];

export type scheduleDataType = {
    created_at: ScheduleType['created_at'];
    end_date: ScheduleType['end_date'];
    group_id: ScheduleType['group_id'];
    id: ScheduleType['id'];
    memo: ScheduleType['memo'];
    name: ScheduleType['name'];
    start_date: ScheduleType['start_date'];
    start_time: ScheduleType['start_time'];
}