'use client';

import React from 'react';
import useModalStore from 'stores/useModalStore';

interface ModalProps {
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ children }) => {
  const { isOpen, closeModal } = useModalStore();

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50"
      onClick={closeModal} // 배경 클릭 시 닫기
    >
      <div className="bg-[#FFF] rounded-[12px] p-6 w-[80%] max-w-md px-5 py-[50px]">
        {children} {/* 내부 요소 렌더링 */}
      </div>
    </div>
  );
};

export default Modal;
