'use client';

import { useState } from 'react';
import ProfileSection from '@app/mypage/_components/ProfileSection';
import UserManagement from '@app/mypage/_components/UserManagementSection';
import LogoutModalContent from '@app/mypage/_components/modalContents/LogoutModalContent';
import UserDeleteModalContent from '@app/mypage/_components/modalContents/deleteGroup/UserDeleteModalContent';
import Modal from '@components/common/Modal';
import ProfileUpdateModalContent from '@app/mypage/_components/modalContents/ProfileUpdateModalContent';

export type ModalStatus = 'logout' | 'delete' | 'profileUpdate';

const PageComponent = () => {
  const [modalStatus, setModalStatus] = useState<ModalStatus>('logout');
  const modalContents = {
    logout: <LogoutModalContent />,
    delete: <UserDeleteModalContent />,
    profileUpdate: <ProfileUpdateModalContent />,
  };

  return (
    <>
      <ProfileSection setModalStatus={setModalStatus} />
      <UserManagement setModalStatus={setModalStatus} />
      <Modal>{modalContents[modalStatus]}</Modal>
    </>
  );
};

export default PageComponent;
