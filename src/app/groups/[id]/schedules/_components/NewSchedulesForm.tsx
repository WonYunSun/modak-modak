'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import useModalStore from 'stores/useModalStore';
import ScheduleNameForm from '@app/groups/[id]/schedules/_components/stepComponents/ScheduleNameForm';
import ScheduleDateForm from '@app/groups/[id]/schedules/_components/stepComponents/ScheduleDateForm';
import ScheduleMemoForm from '@app/groups/[id]/schedules/_components/stepComponents/ScheduleMemoForm';
import Modal from '@components/common/Modal';
import Button from '@components/common/Button';
import { addSchedule } from '@queries/schedule/ScheduleActions';
import useFunnel from '@hooks/useFunnel';
import { useGroupSchedules } from '@hooks/schedule/useGroupSchedules';
import { ScheduleType } from '@ts/scheduleType';

//단계 name 정의
const steps = ['일정명', '모임일시', '메모'];

//임의 groupId값

const NewSchedulesForm = () => {
  const { Funnel, Step, next, prev } = useFunnel(steps[0], 3);
  const { openModal, closeModal } = useModalStore();
  const router = useRouter();
  const { id } = useParams();
  const groupId = Array.isArray(id) ? id[0] : id;

  const { invalidateGroupSchedules } = useGroupSchedules(groupId);

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
        openModal();
        await addSchedule(completeScheduleData);
        invalidateGroupSchedules();
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

  const goToGroup = () => {
    router.replace(`/groups/${groupId}`);
  };

  return (
    <>
      <Funnel headerLabel="일정 만들기">
        <Step name={steps[0]}>
          <ScheduleNameForm
            onPrev={goToGroup}
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
          <Modal onClickOutSide={goToGroup}>
            <div className="px-[1rem] py-[1.5rem] w-full mb-[1.25rem]">
              <p className="text-gray-900 font-semibold text-lg mb-[0.25rem]">일정을 만들었어요!</p>
              <p className="text-gray-500 ">
                일정에 관한 게시글도 업로드해서
                <br />
                모임원들에게 자유롭게 공유해주세요
              </p>
            </div>
            <Button
              label="확인"
              type="button"
              className="modal-full-btn"
              onClick={() => {
                goToGroup();
                closeModal();
              }}
            ></Button>
          </Modal>
        </Step>
      </Funnel>
    </>
  );
};

export default NewSchedulesForm;
