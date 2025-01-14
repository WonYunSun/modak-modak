'use client';

import { useState } from 'react';
import Image from 'next/image';
import ProfileInputs from './ProfileInputs';
import ProfileConfirmBtns from './ProfileConfirmBtns';
import { Modification } from '@components/icons';

const ChangeGroupProfileModal = () => {
  //모임 정보를 state에 초기값으로 저장하도록 하기
  const [groupName, setGroupName] = useState('모임명이에요');
  const [description, setDescription] = useState('한줄소개예요');

  const onGroupNameChange = (e: React.FormEvent<HTMLInputElement>) => {
    setGroupName(e.currentTarget.value);
  };
  const onDescriptionChange = (e: React.FormEvent<HTMLInputElement>) => {
    setDescription(e.currentTarget.value);
  };
  const onConfirmChange = () => {};

  return (
    <div className="p-5 flex flex-col items-center">
      <h4 className="mb-6 font-semibold text-xl text-gray-900 text-center">모임 프로필 변경</h4>
      <div>
        <div className="relative">
          <div className="m-auto w-24 h-24">
            <Image src="/icons/group-image.webp" alt={'그룹 프로필'} width={200} height={200} />
          </div>
          <label htmlFor="profilePhoto" className="block absolute bottom-[-8px] right-[-14px]">
            <Modification />
          </label>
        </div>
        <input type="file" accept="image/*" name="profilePhoto" id="profilePhoto" className="hidden" />
      </div>
      <div className="w-64 px-2">
        <ProfileInputs
          groupName={groupName}
          description={description}
          onGroupNameChange={onGroupNameChange}
          onDescriptionChange={onDescriptionChange}
        />
      </div>
      <div className="w-full mt-6 flex gap-2 justify-center">
        <ProfileConfirmBtns onConfirm={onConfirmChange} />
      </div>
    </div>
  );
};

export default ChangeGroupProfileModal;
