'use client';

import { useState } from 'react';
import Layout from './../layout/Layout';
import Label, { LabelProps } from '@components/common/Label';
import ScheduleDatePicker from '../ScheduleDatePicker';
import { ScheduleType } from '@ts/scheduleType';

type ScheduleDateFormProps = {
  onNext: (data: Pick<ScheduleType, 'start_date' | 'end_date' | 'start_time'>) => void;
  onPrev: () => void;
  prevData: { start_date: ScheduleType['start_date']; end_date: ScheduleType['end_date']; start_time: string };
};

const ScheduleDateForm = ({ onNext, onPrev, prevData }: ScheduleDateFormProps) => {
  const [values, setValues] = useState<{ scheduleDate: { from: string; to: string }; scheduleTime: string }>({
    scheduleDate: { from: prevData?.start_date || '', to: prevData?.end_date || '' }, // prevData를 초기값으로 설정
    scheduleTime: prevData?.start_time || '' // prevData에서 시간 값을 가져옴
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
        <ScheduleDatePicker
          onDateChange={handleDateChange}
          onTimeChange={handleTimeChange}
          prevData={{
            scheduleDate: { from: prevData.start_date, to: prevData.end_date },
            scheduleTime: prevData.start_time
          }}
        />
      </div>
    </Layout>
  );
};

export default ScheduleDateForm;
