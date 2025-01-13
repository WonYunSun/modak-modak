'use client';
import Modal from '@components/common/Modal';
import TextInput from '@components/common/TextInput';
import { Modification } from '@components/icons';
import React, { useEffect, useState } from 'react';
import useModalStore from 'stores/useModalStore';

const ChangeGroupProfileModal = () => {
  const { isOpen } = useModalStore();

  //모임 정보를 state에 초기값으로 저장하도록 하기
  const [groupName, setGroupName] = useState('모임명이에요');
  const [description, setDescription] = useState('한줄소개예요');

  const onGroupNameChange = (e: React.FormEvent<HTMLInputElement>) => {
    setGroupName(e.currentTarget.value);
  };
  const onDescriptionChange = (e: React.FormEvent<HTMLInputElement>) => {
    setDescription(e.currentTarget.value);
  };

  useEffect(() => {
    if (!isOpen) {
      //수정하다 닫으면 초기 상태로 돌아가기
      //나중에 의존성 배열에 초기값도 추가하기
      setGroupName('모임명이에요');
      setDescription('한줄소개예요');
    }
  }, [isOpen]);

  return (
    <Modal>
      <h4 className="mb-6 font-semibold text-xl text-gray-900">모임 프로필 변경</h4>
      <div>
        <div className="relative">
          <div className="m-auto w-24 h-24 rounded-xl bg-gray-200"></div>
          <label htmlFor="profilePhoto" className="block absolute bottom-[-8px] right-[-14px]">
            <Modification />
          </label>
        </div>
        <input type="file" accept="image/*" name="profilePhoto" id="profilePhoto" className="hidden" />
      </div>
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
        <label htmlFor="groupName" className="text-sm text-gray-700">
          한 줄 소개
        </label>
        <TextInput
          value={description}
          name={'groupName'}
          onChange={(e) => {
            onDescriptionChange(e);
          }}
          maxLength={30}
          mode={'underBar'}
        />
      </div>
    </Modal>
  );
};

export default ChangeGroupProfileModal;
