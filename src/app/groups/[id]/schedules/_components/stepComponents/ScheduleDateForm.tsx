'use client';

import { useState, useEffect } from 'react';
import Layout from '../layout/Layout';
import Label, { LabelProps } from '@components/common/Label';
import ScheduleDatePicker from '@app/groups/[id]/schedules/_components/ScheduleDatePicker';
import { ScheduleType } from '@ts/scheduleType';

type ScheduleDateFormProps = {
  onNext: (data: Pick<ScheduleType, 'start_date' | 'end_date' | 'start_time'>) => void;
  onPrev: () => void;
  prevData: { start_date: ScheduleType['start_date']; end_date: ScheduleType['end_date']; start_time: string };
};

const ScheduleDateForm = ({ onNext, onPrev, prevData }: ScheduleDateFormProps) => {
  const [values, setValues] = useState<{
    scheduleDate: { from: string; to: string };
    scheduleTime: string;
  }>({
    scheduleDate: { from: prevData?.start_date || '', to: prevData?.end_date || '' },
    scheduleTime: prevData?.start_time || '',
  });

  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    const { from, to } = values.scheduleDate;

    // 날짜와 시간이 모두 입력되었는지 확인
    if (from && to) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [values]);

  const handleNext = () => {
    const { from, to } = values.scheduleDate;
    const time = values.scheduleTime;
    onNext({
      start_date: from || '',
      end_date: to || '',
      start_time: time || '',
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
    description: '일정 또는 이벤트의 날짜와 시간을 적어주세요',
    htmlFor: 'scheduleName',
  };

  return (
    <Layout isDisabled={isDisabled} onNext={handleNext} onPrev={onPrev}>
      <div className="flex flex-col gap-4">
        <Label {...labelData} />
        <ScheduleDatePicker
          onDateChange={handleDateChange}
          onTimeChange={handleTimeChange}
          prevData={{
            scheduleDate: { from: prevData.start_date, to: prevData.end_date },
            scheduleTime: prevData.start_time,
          }}
        />
      </div>
    </Layout>
  );
};

export default ScheduleDateForm;
