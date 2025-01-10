'use client';

import { Database } from '@ts/supabase';
import Layout from './../layout/Layout';
import { useState } from 'react';
import Label, { LabelProps } from '@components/common/Label';
import ScheduleDatePicker from '../ScheduleDatePicker';

type ScheduleType = Database['public']['Tables']['schedules']['Row'];

type ScheduleNameFormProps = {
  onNext: (data: Pick<ScheduleType, 'start_date' | 'end_date'>) => void;
  onPrev: () => void;
};

const ScheduleDateForm = ({ onNext, onPrev }: ScheduleNameFormProps) => {
  const [values, setValues] = useState<{ scheduleDate: { from: string; to: string } }>({
    scheduleDate: { from: '', to: '' }
  });

  const handleNext = () => {
    const { from, to } = values.scheduleDate;

    // undefined일 경우 빈 문자열로 처리
    onNext({
      start_date: from || '',
      end_date: to || ''
    });
  };

  const handleDateChange = (dateRange: { from: string; to: string }) => {
    setValues({ ...values, scheduleDate: dateRange });
  };

  const labelData: LabelProps = {
    label: '모임 일시',
    required: true,
    description: '만나는 날짜와 시간을 적어주세요',
    htmlFor: 'scheduleName'
  };

  return (
    <Layout isDisabled={false} onNext={handleNext} onPrev={onPrev}>
      <Label {...labelData} />
      <ScheduleDatePicker onDateChange={handleDateChange} />
    </Layout>
  );
};

export default ScheduleDateForm;
