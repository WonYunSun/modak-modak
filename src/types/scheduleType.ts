import { Database } from '@ts/supabase';

export type ScheduleType = Database['public']['Tables']['schedules']['Row'];
