'use client';

import useFunnel from 'hooks/useFunnel';
import React, { useEffect, useState } from 'react';
import ScheduleTitleForm from './StepComponents/ScheduleNameForm';
import { Database } from '@ts/supabase';
import ScheduleDateForm from './StepComponents/ScheduleDateForm';

type ScheduleType = Database['public']['Tables']['schedules']['Row'];

//단계 name 정의
const steps = ['일정명', '모임일시', '메모'];

const NewSchedulesForm = () => {
  const { Funnel, Step, next, prev } = useFunnel(steps[0]);

  const [scheduleData, setScheduleData] = useState<ScheduleType>({
    created_at: '',
    group_id: '',
    id: '',
    memo: null,
    name: '',
    start_date: '',
    end_date: '',
    start_time: ''
  });
  useEffect(() => {
    console.log(scheduleData);
  }, [scheduleData]);

  const handleNext = (data: Partial<ScheduleType>, nextStep: string) => {
    setScheduleData((prev) => ({ ...prev, ...data }));
    next(nextStep);
  };

  const handlePrev = (prevStep: string) => {
    prev(prevStep);
  };
  return (
    <Funnel>
      <Step name={steps[0]}>
        <ScheduleTitleForm onNext={(data) => handleNext(data, steps[1])} />
      </Step>
      <Step name={steps[1]}>
        <ScheduleDateForm onPrev={() => handlePrev(steps[0])} onNext={(data) => handleNext(data, steps[2])} />
      </Step>
      <Step name={steps[2]}>
        <div>메모</div>
        <button onClick={() => handlePrev(steps[1])}>이전</button>
        <br></br>
        <button>일정 만들기</button>
      </Step>
    </Funnel>
  );
};

export default NewSchedulesForm;
