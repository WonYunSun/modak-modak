'use client';

import { useState } from 'react';
import useModalStore from 'stores/useModalStore';
import Button from '@components/common/Button';

interface DeletionConfirmProps {
  onNextStep: () => void;
  onConfirmDelete: () => void;
}
const DeletionConfirm = ({ onNextStep, onConfirmDelete }: DeletionConfirmProps) => {
  const [confirmationInput, setConfirmationInput] = useState('');
  const { closeModal } = useModalStore();

  const onDeleteGroup = () => {
    onConfirmDelete();
    onNextStep();
  };

  return (
    <>
      <div className="w-60 py-6 w-full text-left">
        <div className="w-full mb-5 text-lg font-semibold">
          모임을 삭제하시려면
          <br />
          {"'삭제'라고 입력해주세요"}
        </div>
        <input
          type="text"
          placeholder="삭제라는 글자를 입력해주세요"
          className="px-4 py-3 text-base rounded-lg border border-solid border-gray-300 focus:outline-gray-700"
          onChange={(e) => {
            setConfirmationInput(e.currentTarget.value);
          }}
        />
      </div>
      <div className="w-full mt-[1.125rem] flex gap-2 justify-center">
        <div className="w-[4.375rem]">
          <Button type={'button'} className={'modal-white-btn'} label={'취소'} onClick={closeModal} />
        </div>
        <div className="w-44">
          <Button
            type={'button'}
            className={'modal-full-btn'}
            label={'삭제'}
            onClick={onDeleteGroup}
            disabled={confirmationInput === '삭제' ? false : true}
          />
        </div>
      </div>
    </>
  );
};

export default DeletionConfirm;
