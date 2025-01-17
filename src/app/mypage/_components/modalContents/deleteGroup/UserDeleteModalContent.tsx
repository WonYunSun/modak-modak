'use client';

import React, { useState } from 'react';
import UserDeletionAssure from './UserDeletionAssure';
import UserDeletionConfirm from './UserDeletionConfirm';
import UserDeletionSuccess from './UserDeletionSuccess';
import { deleteUser } from 'queries/users/users';

const UserDeleteModalContent = () => {
  const [deletionStep, setDeletionStep] = useState(1);

  const onNextStep = () => {
    setDeletionStep((prev) => prev + 1);
  };

  const onConfirmDelete = async () => {
    await deleteUser();
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
