'use client';

import useModalStore from '@stores/useModalStore';
import ManagementCard from '@app/groups/[id]/management/_components/ManagementCard';
import ManagementSection from '@app/groups/[id]/management/_components/ManagementSection';
import { ModalStatus } from '@app/mypage/_components/MyPageComponent';

interface UserManagementProps {
  setModalStatus: (state: ModalStatus) => void;
}

const UserManagement = ({ setModalStatus }: UserManagementProps) => {
  const { openModal } = useModalStore();

  const handleLogoutClick = () => {
    setModalStatus('logout');
    openModal();
  };

  const handleDeleteClick = () => {
    setModalStatus('delete');
    openModal();
  };

  return (
    <div>
      <ManagementSection title={'계정 관리'} isLast={true}>
        <ManagementCard label={'로그아웃'} handleClick={handleLogoutClick} className="cursor-pointer" />
        <ManagementCard label={'회원 탈퇴'} handleClick={handleDeleteClick} className="cursor-pointer" />
      </ManagementSection>
    </div>
  );
};

export default UserManagement;
