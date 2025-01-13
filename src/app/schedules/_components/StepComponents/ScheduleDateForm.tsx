'use client';

import { useState } from 'react';
import { Database } from '@ts/supabase';
import Layout from './../layout/Layout';
import Label, { LabelProps } from '@components/common/Label';
import ScheduleDatePicker from '../ScheduleDatePicker';

type ScheduleType = Database['public']['Tables']['schedules']['Row'];

type ScheduleDateFormProps = {
  onNext: (data: Pick<ScheduleType, 'start_date' | 'end_date' | 'start_time'>) => void;
  onPrev: () => void;
};

const ScheduleDateForm = ({ onNext, onPrev }: ScheduleDateFormProps) => {
  const [values, setValues] = useState<{ scheduleDate: { from: string; to: string }; scheduleTime: string }>({
    scheduleDate: { from: '', to: '' },
    scheduleTime: ''
  });

  const handleNext = () => {
    const { from, to } = values.scheduleDate;
    const time = values.scheduleTime;
    // undefined일 경우 빈 문자열로 처리
    onNext({
      start_date: from || '',
      end_date: to || '',
      start_time: time || ''
    });
  };

  const handleDateChange = (dateRange: { from: string; to: string }) => {
    setValues({ ...values, scheduleDate: dateRange });
  };
  const handleTimeChange = (time: string) => {
    setValues({ ...values, scheduleTime: time });
  };

  const labelData: LabelProps = {
    label: '모임 일시',
    required: true,
    description: '만나는 날짜와 시간을 적어주세요',
    htmlFor: 'scheduleName'
  };

  return (
    <Layout isDisabled={false} onNext={handleNext} onPrev={onPrev}>
      <div className="flex flex-col gap-4">
        <Label {...labelData} />
        <ScheduleDatePicker onDateChange={handleDateChange} onTimeChange={handleTimeChange} />
      </div>
    </Layout>
  );
};

export default ScheduleDateForm;
