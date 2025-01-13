import React from 'react';
import { ModalModeType } from './ManagementContents';

interface ManagementBtnsProps {
  handleOpenModal: (mode: ModalModeType) => void;
}
const ManagementBtns = ({ handleOpenModal }: ManagementBtnsProps) => {
  return (
    <div className="w-full">
      <div className="h-[2.375rem] px-5 flex justify-center items-center gap-x-4 text-gray-600">
        <button
          type="button"
          onClick={() => {
            handleOpenModal('deleteGroup');
          }}
          className="underline decoration-gray-600 underline-offset-2"
        >
          모임 삭제
        </button>
        {'·'}
        <button
          type="button"
          onClick={() => {
            handleOpenModal('unsignMembership');
          }}
          className="underline decoration-gray-600 underline-offset-2"
        >
          모임 탈퇴
        </button>
      </div>
    </div>
  );
};

export default ManagementBtns;
