'use client';

import { useState } from 'react';
import LabeledTextInput, { LabeledTextInputProps } from '@components/common/LabeledTextInput';

import { ScheduleType } from '@ts/scheduleType';
import Layout from '@app/groups/[id]/schedules/_components/layout/Layout';

type ScheduleMemoFormProps = {
  onNext: (data: Pick<ScheduleType, 'memo'>) => void;
  onPrev: () => void;
  prevData: ScheduleType['memo'];
};

const ScheduleMemoForm = ({ onNext, onPrev, prevData }: ScheduleMemoFormProps) => {
  const [values, setValues] = useState({ scheduleMemo: prevData || '' });

  const isDisabled = values.scheduleMemo.trim().length === 0;

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;

    setValues({ ...values, scheduleMemo: target.value });
  };
  const handleNext = () => {
    onNext({ memo: values.scheduleMemo });
  };
  const data: LabeledTextInputProps = {
    // input 관련
    onChange: handleChange,
    value: values['scheduleMemo'],
    name: 'scheduleMemo',
    maxLength: 20,
    placeHolder: '최대 20자까지 입력',
    // label 관련
    label: '메모',
    required: true,
    description: '일정에 대한 내용을 간단히 메모로 남겨보세요',
    htmlFor: 'scheduleMemo',
  };

  return (
    <Layout isDisabled={isDisabled} onNext={handleNext} onPrev={onPrev} NextBtnlabel="일정 만들기">
      <LabeledTextInput {...data} />
    </Layout>
  );
};

export default ScheduleMemoForm;
