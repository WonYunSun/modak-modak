'use client';

import React, { useEffect, useState } from 'react';
import DeletionAssure from '@app/groups/[id]/management/_components/modal/deleteGroup/DeletionAssure';
import DeletionConfirm from '@app/groups/[id]/management/_components/modal/deleteGroup/DeletionConfirm';
import DeletionSuccess from '@app/groups/[id]/management/_components/modal/deleteGroup/DeletionSuccess';

const LASTSTEP = 3;

interface DeleteGroupModalProps {
  lastStepSetter: () => void;
}
const DeleteGroupModal = ({ lastStepSetter }: DeleteGroupModalProps) => {
  const [deletionStep, setDeletionStep] = useState(1);
  const onNextStep = () => {
    setDeletionStep((prev) => prev + 1);
  };

  useEffect(() => {
    if (deletionStep === LASTSTEP) lastStepSetter();
  }, [deletionStep]);

  return (
    <div className="w-full px-5 flex flex-col items-center">
      {deletionStep === 1 && <DeletionAssure onNextStep={onNextStep} />}
      {deletionStep === 2 && <DeletionConfirm onNextStep={onNextStep} />}
      {deletionStep === 3 && <DeletionSuccess />}
    </div>
  );
};

export default DeleteGroupModal;
