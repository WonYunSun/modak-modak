import React from 'react';
import { ModalModeType } from './ManagementContents';

interface ManagementBtnsProps {
  isLeader: boolean;
  handleOpenModal: (mode: ModalModeType) => void;
}
const ManagementBtns = ({ isLeader, handleOpenModal }: ManagementBtnsProps) => {
  return (
    <div className="w-full">
      <div className="h-[2.375rem] px-5 flex justify-center items-center gap-x-4 text-gray-600">
        {isLeader && (
          <>
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
          </>
        )}

        <button
          type="button"
          onClick={() => {
            handleOpenModal('leaveGroup');
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
