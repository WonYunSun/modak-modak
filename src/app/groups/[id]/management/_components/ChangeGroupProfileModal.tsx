'use client';
import { useState } from 'react';
import Image from 'next/image';
import useModalStore from 'stores/useModalStore';
import Button from '@components/common/Button';
import TextInput from '@components/common/TextInput';
import { Modification } from '@components/icons';

interface ProfileConfirmBtnsProps {
  onConfirm: () => void;
}
const ProfileConfirmBtns = ({ onConfirm }: ProfileConfirmBtnsProps) => {
  const { closeModal } = useModalStore();
  const onConfirmChange = () => {
    onConfirm();
    closeModal();
  };

  return (
    <>
      <div className="w-[4.375rem]">
        <Button type={'button'} className={'modal-white-btn'} label={'취소'} onClick={closeModal} />
      </div>
      <div className="w-[12.313rem]">
        <Button type={'button'} className={'modal-full-btn'} label={'완료'} onClick={onConfirmChange} />
      </div>
    </>
  );
};

interface ProfileInputsProps {
  groupName: string;
  description: string;
  onGroupNameChange: (e: React.FormEvent<HTMLInputElement>) => void;
  onDescriptionChange: (e: React.FormEvent<HTMLInputElement>) => void;
}
const ProfileInputs = ({ groupName, description, onGroupNameChange, onDescriptionChange }: ProfileInputsProps) => {
  return (
    <>
      <div className="mt-5">
        <label htmlFor="groupName" className="text-sm text-gray-700">
          모임명
        </label>
        <TextInput
          value={groupName}
          name={'groupName'}
          onChange={(e) => {
            onGroupNameChange(e);
          }}
          maxLength={20}
          mode={'underBar'}
        />
      </div>
      <div className="mt-5">
        <label htmlFor="description" className="text-sm text-gray-700">
          한 줄 소개
        </label>
        <TextInput
          value={description}
          name={'description'}
          onChange={(e) => {
            onDescriptionChange(e);
          }}
          maxLength={30}
          mode={'underBar'}
        />
      </div>
    </>
  );
};

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
