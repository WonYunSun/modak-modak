'use client';

import Modal from '@components/common/Modal';
import { ModalModeType } from '@app/groups/[id]/management/_components/ManagementContents';
import ChangeGroupProfileModal from '@app/groups/[id]/management/_components/modal/changeGroupProfile/ChangeGroupProfileModal';
import DeleteGroupModal from '@app/groups/[id]/management/_components/modal/deleteGroup/DeleteGroupModal';
import LeaveGroupModal from '@app/groups/[id]/management/_components/modal/leaveGroup/LeaveGroupModal';
import LeaderTransitionModal from '@app/groups/[id]/management/_components/modal/leaderTransition/LeaderTransitionModal';

interface ManagementModalProps {
  isLeader: boolean;
  modalMode: ModalModeType | null
}
const ManagementModal = ({ isLeader, modalMode }: ManagementModalProps) => {
  const modals = {
    changeProfile: <ChangeGroupProfileModal />,
    deleteGroup: <DeleteGroupModal />,
    leaveGroup: <LeaveGroupModal isLeader={isLeader} />,
    leaderTransition: <LeaderTransitionModal />,
  };
  return <Modal>{modalMode && modals[modalMode]}</Modal>;
};

export default ManagementModal;
