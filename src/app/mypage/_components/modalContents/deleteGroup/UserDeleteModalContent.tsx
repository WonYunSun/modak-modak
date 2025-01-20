'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import useModalStore from '@stores/useModalStore';
import UserDeletionAssure from '@app/mypage/_components/modalContents/deleteGroup/UserDeletionAssure';
import UserDeletionConfirm from '@app/mypage/_components/modalContents/deleteGroup/UserDeletionConfirm';
import UserDeletionSuccess from '@app/mypage/_components/modalContents/deleteGroup/UserDeletionSuccess';
import useDeleteUser from '@hooks/user/useDeleteUser';

const UserDeleteModalContent = () => {
  const [deletionStep, setDeletionStep] = useState(1);
  const { closeModal } = useModalStore();
  const { mutate } = useDeleteUser();
  const router = useRouter();

  const onNextStep = () => {
    setDeletionStep((prev) => prev + 1);
  };

  const onConfirmDelete = async () => {
    mutate();
    closeModal();
    router.push('/');
  };

  return (
    <div className="w-full px-4 flex flex-col items-center">
      {deletionStep === 1 && <UserDeletionAssure onNextStep={onNextStep} />}
      {deletionStep === 2 && <UserDeletionConfirm onNextStep={onNextStep} onConfirmDelete={onConfirmDelete} />}
      {deletionStep === 3 && <UserDeletionSuccess />}
    </div>
  );
};

export default UserDeleteModalContent;
