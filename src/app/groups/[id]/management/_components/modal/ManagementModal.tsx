'use client';

import Modal from '@components/common/Modal';
import { ModalModeType } from '../ManagementContents';
import ChangeGroupProfileModal from './changeGroupProfile/ChangeGroupProfileModal';
import DeleteGroupModal from './deleteGroup/DeleteGroupModal';
import LeaveGroupModal from './leaveGroup/LeaveGroupModal';
import LeaderTransitionModal from './leaderTransition/LeaderTransitionModal';

interface ManagementModalProps {
  isLeader: boolean;
  modalMode: ModalModeType | null;
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
