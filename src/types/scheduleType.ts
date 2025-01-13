import { Database } from './supabase';

export type ScheduleType = Database['public']['Tables']['schedules']['Row'];
