'use client';

import useFunnel from 'hooks/useFunnel';

import { useEffect, useState } from 'react';
import ScheduleNameForm from './StepComponents/ScheduleNameForm';
import { Database } from '@ts/supabase';
import ScheduleDateForm from './StepComponents/ScheduleDateForm';
import ScheduleMemoForm from './StepComponents/ScheduleMemoForm';
import useModalStore from 'stores/useModalStore';
import Modal from '@components/common/Modal';
import Button from '@components/common/Button';

type ScheduleType = Database['public']['Tables']['schedules']['Row'];

//단계 name 정의
const steps = ['일정명', '모임일시', '메모', '완료'];

const NewSchedulesForm = () => {
  const { Funnel, Step, next, prev } = useFunnel(steps[0]);
  const { openModal } = useModalStore();
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
    if (nextStep === steps[3]) {
      openModal();
    } else {
      next(nextStep);
    }
  };

  const handlePrev = (prevStep: string) => {
    prev(prevStep);
  };

  return (
    <>
      <Funnel headerLabel="일정 만들기">
        <Step name={steps[0]}>
          <ScheduleNameForm onPrev={() => {}} onNext={(data) => handleNext(data, steps[1])} />
        </Step>
        <Step name={steps[1]}>
          <ScheduleDateForm onPrev={() => handlePrev(steps[0])} onNext={(data) => handleNext(data, steps[2])} />
        </Step>
        <Step name={steps[2]}>
          <ScheduleMemoForm onPrev={() => handlePrev(steps[1])} onNext={(data) => handleNext(data, steps[3])} />
          <Modal>
            <div className="px-[1rem] py-[1.5rem] w-full mb-[1.25rem]">
              <p className="text-gray-900 font-semibold text-lg mb-[0.25rem]">일정을 만들었어요!</p>
              <p className="text-gray-500 ">소중한 추억도 공유해주세요</p>
            </div>
            <Button label="확인" type="button" className="modal-full-btn" onClick={() => {}}></Button>
          </Modal>
        </Step>
      </Funnel>
    </>
  );
};

export default NewSchedulesForm;
