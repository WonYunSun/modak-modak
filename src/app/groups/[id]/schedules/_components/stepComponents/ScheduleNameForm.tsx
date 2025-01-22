'use client';

import { useState } from 'react';
import Layout from '../layout/Layout';
import LabeledTextInput, { LabeledTextInputProps } from '@components/common/LabeledTextInput';
import { ScheduleType } from '@ts/scheduleType';

type ScheduleNameFormProps = {
  onNext: (data: Pick<ScheduleType, 'name'>) => void;
  onPrev: () => void;
  prevData: ScheduleType['name'];
};

const ScheduleNameForm = ({ onNext, onPrev, prevData }: ScheduleNameFormProps) => {
  const [values, setValues] = useState({ scheduleName: prevData || '' });

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
    htmlFor: 'scheduleName',
  };

  return (
    <Layout isDisabled={isDisabled} onNext={handleNext} onPrev={onPrev}>
      <div>
        <LabeledTextInput {...data} />
        <div className="flex w-vw -mx-[20px] mt-10 p-[1rem_1.25rem] flex-col gap-1 bg-gray-100">
          <p className="text-sm font-semibold">만남 일정 외에 생일 등과 같은 이벤트도 등록해보세요!</p>
          <p className="text-xs">가볍게 일정을 만들고 게시글을 공유하며 소통하는 것은 어떨까요?</p>
        </div>
      </div>
    </Layout>
  );
};

export default ScheduleNameForm;
