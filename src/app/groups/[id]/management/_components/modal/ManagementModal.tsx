'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Modal from '@components/common/Modal';
import ChangeGroupProfileModal from '@app/groups/[id]/management/_components/modal/changeGroupProfile/ChangeGroupProfileModal';
import DeleteGroupModal from '@app/groups/[id]/management/_components/modal/deleteGroup/DeleteGroupModal';
import LeaveGroupModal from '@app/groups/[id]/management/_components/modal/leaveGroup/LeaveGroupModal';
import LeaderTransitionModal from '@app/groups/[id]/management/_components/modal/leaderTransition/LeaderTransitionModal';
import { ModalModeType } from '@app/groups/[id]/management/_components/ManagementContents';

const LEAVEONLASTSTEP = ['deleteGroup', 'leaveGroup'];

interface ManagementModalProps {
  isLeader: boolean;
  modalMode: ModalModeType | null;
}
const ManagementModal = ({ isLeader, modalMode }: ManagementModalProps) => {
  const router = useRouter();
  const [isLastStep, setIsLastStep] = useState(false);
  const lastStepSetter = () => {
    setIsLastStep(true);
  };

  const modals = {
    changeProfile: <ChangeGroupProfileModal />,
    deleteGroup: <DeleteGroupModal lastStepSetter={lastStepSetter} />,
    leaveGroup: <LeaveGroupModal isLeader={isLeader} lastStepSetter={lastStepSetter} />,
    leaderTransition: <LeaderTransitionModal />,
  };

  const onClickOutSide = () => {
    if (LEAVEONLASTSTEP.find((mode) => mode === modalMode) && isLastStep) {
      router.push('/');
    }
  };

  return <Modal onClickOutSide={onClickOutSide}>{modalMode && modals[modalMode]}</Modal>;
};

export default ManagementModal;
