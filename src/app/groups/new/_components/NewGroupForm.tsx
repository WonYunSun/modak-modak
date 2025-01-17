'use client';

import { useState } from 'react';
import Modal from '@components/common/Modal';
import Button from '@components/common/Button';
import GroupNameForm from '@app/groups/new/_components/stepComponents/GroupNameForm';
import GroupImageForm from '@app/groups/new/_components/stepComponents/GroupImageForm';
import GroupPreview from '@app/groups/new/_components/stepComponents/GroupPreview';
import useModalStore from '@stores/useModalStore';
import useFunnel from '@hooks/useFunnel';
import { addGroup } from '@queries/group/postGroup';
import { GroupsType } from '@queries/home/fetchGroupInfo';

//단계 name 정의
const steps = ['모임명', '모임사진', '미리보기'];
const userId = 'ebcc66fe-bf21-4b73-99d1-e4f375025b80';

const NewGroupForm = () => {
  const { Funnel, Step, next, prev } = useFunnel(steps[0], 3);
  const { openModal } = useModalStore();
  const [groupData, setGruopData] = useState<GroupsType>({
    created_at: '',
    description: '',
    id: '',
    image_url: '',
    name: '',
  });

  const handleNext = async (data: Partial<GroupsType>, nextStep: string) => {
    const updatedGroupData = { ...groupData, ...data };
    setGruopData(updatedGroupData);
    next(nextStep);
  };

  const handleSubmit = async () => {
    const completeGroupData: GroupsType = {
      ...groupData,
      created_at: new Date().toISOString(),
      id: '',
    };

    await addGroup(completeGroupData, userId);
    openModal();
  };

  const handlePrev = (prevStep: string) => {
    prev(prevStep);
  };

  return (
    <>
      <Funnel headerLabel="모임 만들기">
        <Step name={steps[0]}>
          <GroupNameForm
            onPrev={() => {}}
            onNext={(data) => handleNext(data, steps[1])}
            prevData={{ name: groupData.name, description: groupData.description }}
          />
        </Step>
        <Step name={steps[1]}>
          <GroupImageForm
            onPrev={() => handlePrev(steps[0])}
            onNext={(data) => handleNext(data, steps[2])}
            prevData={{ imgurl: groupData.image_url }}
          />
        </Step>
        <Step name={steps[2]}>
          <GroupPreview onPrev={() => handlePrev(steps[1])} onNext={handleSubmit} prevData={groupData} />
          <Modal onClickOutSide={() => {}}>
            <div className="px-[1rem] py-[1.5rem] w-full mb-[1.25rem] text-center">
              <p className="text-gray-900 font-semibold text-lg mb-[0.25rem]">
                축하합니다!
                <br />
                모임이 만들어졌어요 🎉
              </p>
              <p className="text-gray-500 ">
                특별한 사람들을 초대하여
                <br />
                소중한 추억을 기록하고 공유해보세요
              </p>
            </div>
            <Button
              label="친구 초대할 링크 복사하기"
              type="button"
              className="modal-full-btn mb-3"
              onClick={() => {}}
            ></Button>
            <Button label="홈으로 이동" type="button" className="modal-white-btn" onClick={() => {}}></Button>
          </Modal>
        </Step>
      </Funnel>
    </>
  );
};

export default NewGroupForm;
