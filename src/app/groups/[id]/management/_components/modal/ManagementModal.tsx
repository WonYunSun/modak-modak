import Modal from '@components/common/Modal';
import { ModalModeType } from '../ManagementContents';
import ChangeGroupProfileModal from './groupProfileModal/ChangeGroupProfileModal';
import DeleteGroupModal from './deleteModal/DeleteGroupModal';
import LeaveGroupModal from './LeaveGroupModal';

interface ManagementModalProps {
  modalMode: ModalModeType | null;
}
const ManagementModal = ({ modalMode }: ManagementModalProps) => {
  const modals = {
    changeProfile: <ChangeGroupProfileModal />,
    deleteGroup: <DeleteGroupModal />,
    leaveGroup: <LeaveGroupModal />
  };
  return <Modal>{modalMode && modals[modalMode]}</Modal>;
};

export default ManagementModal;
