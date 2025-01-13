import Modal from '@components/common/Modal';
import React from 'react';
import { ModalModeType } from './ManagementContents';
import ChangeGroupProfileModal from './ChangeGroupProfileModal';
import DeleteGroupModal from './DeleteGroupModal';
import LeaveGroupModal from './LeaveGroupModal';

interface ManagementModalProps {
  modalMode: ModalModeType | null;
}
const ManagementModal = ({ modalMode }: ManagementModalProps) => {
  const modals = {
    changeProfile: <ChangeGroupProfileModal />,
    deleteGroup: <DeleteGroupModal/>,
    leaveGroup: <LeaveGroupModal/>
  };
  return <Modal>{modalMode && modals[modalMode]}</Modal>;
};

export default ManagementModal;
