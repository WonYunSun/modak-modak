'use client';

import Modal from '@components/common/Modal';
import { ModalModeType } from '@app/groups/[id]/management/_components/ManagementContents';
import ChangeGroupProfileModal from '@app/groups/[id]/management/_components/modal/changeGroupProfile/ChangeGroupProfileModal';
import DeleteGroupModal from '@app/groups/[id]/management/_components/modal/deleteGroup/DeleteGroupModal';
import LeaveGroupModal from '@app/groups/[id]/management/_components/modal/leaveGroup/LeaveGroupModal';
import LeaderTransitionModal from '@app/groups/[id]/management/_components/modal/leaderTransition/LeaderTransitionModal';
import { useState } from 'react';

interface ManagementModalProps {
  isLeader: boolean;
  modalMode: ModalModeType | null;
}
const ManagementModal = ({ isLeader, modalMode }: ManagementModalProps) => {
  const [isLastStep, setIsLastStep] = useState(false);

  const modals = {
    changeProfile: <ChangeGroupProfileModal />,
    deleteGroup: <DeleteGroupModal />,
    leaveGroup: <LeaveGroupModal isLeader={isLeader} />,
    leaderTransition: <LeaderTransitionModal />,
  };
  const leaveOnLastStep = ['deleteGroup', 'leaveGroup'];

  const onClickOutSide = () => {
    if (leaveOnLastStep.find((mode) => mode === modalMode) && isLastStep) {
    }
  };

  return <Modal onClickOutSide={onClickOutSide}>{modalMode && modals[modalMode]}</Modal>;
};

export default ManagementModal;
