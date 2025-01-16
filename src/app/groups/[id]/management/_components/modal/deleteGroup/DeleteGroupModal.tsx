'use client';

import React, { useState } from 'react';
import DeletionAssure from '@app/groups/[id]/management/_components/modal/deleteGroup/DeletionAssure';
import DeletionConfirm from '@app/groups/[id]/management/_components/modal/deleteGroup/DeletionConfirm';
import DeletionSuccess from '@app/groups/[id]/management/_components/modal/deleteGroup/DeletionSuccess';

const DeleteGroupModal = () => {
  const [deletionStep, setDeletionStep] = useState(1);
  const onNextStep = () => {
    setDeletionStep((prev) => prev + 1);
  };
  const onConfirmDelete = () => {};

  return (
    <div className="w-full px-5 flex flex-col items-center">
      {deletionStep === 1 && <DeletionAssure onNextStep={onNextStep} />}
      {deletionStep === 2 && <DeletionConfirm onNextStep={onNextStep} onConfirmDelete={onConfirmDelete} />}
      {deletionStep === 3 && <DeletionSuccess />}
    </div>
  );
};

export default DeleteGroupModal;
