'use client';

import { useState } from 'react';
import Layout from '../layout/Layout';
import LabeledTextInput, { LabeledTextInputProps } from '@components/common/LabeledTextInput';
import { Database } from '@ts/supabase';

type ScheduleType = Database['public']['Tables']['schedules']['Row'];

type ScheduleNameFormProps = {
  onNext: (data: Pick<ScheduleType, 'name'>) => void;
};

const ScheduleNameForm = ({ onNext }: ScheduleNameFormProps) => {
  const [values, setValues] = useState({ scheduleName: '' });

  const isDisabled = values.scheduleName.trim().length === 0;

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setValues({ ...values, [target.name]: target.value });
  };

  const handleNext = () => {
    onNext({ name: values.scheduleName });
  };

  const data: LabeledTextInputProps = {
    // input 관련
    onChange: handleChange,
    value: values['scheduleName'],
    name: 'scheduleName',
    maxLength: 20,
    placeHolder: '최대 20자까지 입력',
    // label 관련
    label: '일정명',
    required: true,
    description: '일정의 이름을 적어주세요',
    htmlFor: 'scheduleName'
  };

  return (
    <Layout isDisabled={isDisabled} onNext={handleNext}>
      <LabeledTextInput {...data} />
    </Layout>
  );
};

export default ScheduleNameForm;
