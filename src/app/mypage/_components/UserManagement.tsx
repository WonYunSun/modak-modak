'use client';

import ManagementCard from '@app/groups/[id]/management/_components/ManagementCard';
import ManagementSection from '@app/groups/[id]/management/_components/ManagementSection';
import Modal from '@components/common/Modal';
import useModalStore from '@stores/useModalStore';
import LogoutModalContent from './LogoutModalContent';
import { useState } from 'react';

type ModalStatus = 'logout' | 'delete';

const UserManagement = () => {
  const { openModal } = useModalStore();
  const [modalStatus, setModalStatus] = useState<ModalStatus>('logout');

  const handleLogoutClick = () => {
    setModalStatus('logout');
    openModal();
  };

  const handleDeleteClick = () => {
    setModalStatus('delete');
    openModal();
  };

  return (
    <div>
      <ManagementSection title={'계정 관리'} isLast={true}>
        <ManagementCard label={'로그아웃'} handleClick={handleLogoutClick} className="cursor-pointer" />
        <ManagementCard label={'회원 탈퇴'} handleClick={handleDeleteClick} className="cursor-pointer" />
      </ManagementSection>
      <Modal>{modalStatus === 'logout' ? <LogoutModalContent /> : null}</Modal>
    </div>
  );
};

export default UserManagement;
