'use client';

import { useState } from 'react';
import useModalStore from 'stores/useModalStore';
import ScheduleDateForm from './StepComponents/ScheduleDateForm';
import ScheduleMemoForm from './StepComponents/ScheduleMemoForm';
import ScheduleNameForm from './StepComponents/ScheduleNameForm';
import Modal from '@components/common/Modal';
import Button from '@components/common/Button';
import useFunnel from 'hooks/useFunnel';
import { ScheduleType } from '@ts/scheduleType';
import { addSchedule } from 'queries/schedule/ScheduleActions';

//단계 name 정의
const steps = ['일정명', '모임일시', '메모'];

//임의 groupId값
const groupId = '52f44a96-b8f7-4c6c-80b1-d657eafd3821';

const NewSchedulesForm = () => {
  const { Funnel, Step, next, prev } = useFunnel(steps[0], 3);
  const { openModal } = useModalStore();

  const [scheduleData, setScheduleData] = useState<ScheduleType>({
    created_at: '',
    group_id: groupId,
    id: '',
    memo: null,
    name: '',
    start_date: '',
    end_date: '',
    start_time: '',
  });

  const handleNext = async (data: Partial<ScheduleType>, nextStep: string) => {
    const updatedScheduleData = { ...scheduleData, ...data };
    setScheduleData(updatedScheduleData);

    if (nextStep === 'submitData') {
      const completeScheduleData: ScheduleType = {
        ...updatedScheduleData,
        created_at: new Date().toISOString(),
        id: '',
      };

      try {
        await addSchedule(completeScheduleData); // addSchedule이 완료될 때까지 기다림
        openModal(); // addSchedule이 완료된 후 모달 열기
      } catch (error) {
        console.error('Failed to add schedule:', error);
      }
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
          <ScheduleNameForm
            onPrev={() => {}}
            onNext={(data) => handleNext(data, steps[1])}
            prevData={scheduleData.name}
          />
        </Step>
        <Step name={steps[1]}>
          <ScheduleDateForm
            onPrev={() => handlePrev(steps[0])}
            onNext={(data) => handleNext(data, steps[2])}
            prevData={{
              start_date: scheduleData.start_date,
              end_date: scheduleData.end_date,
              start_time: scheduleData.start_time,
            }}
          />
        </Step>
        <Step name={steps[2]}>
          <ScheduleMemoForm
            onPrev={() => handlePrev(steps[1])}
            onNext={(data) => handleNext(data, 'submitData')}
            prevData={scheduleData.memo}
          />
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
