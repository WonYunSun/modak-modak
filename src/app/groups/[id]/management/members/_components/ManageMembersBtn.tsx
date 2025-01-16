'use client'

import useBottomSheetStore from '@stores/useBottomSheetStore';
import { Menu } from '@components/icons';
import { UsersType } from '@queries/home/fetchGroupInfo';
import useUserToManageStore from '@stores/useUserToManage';

interface ManageMembersBtnProps {
  memberId: UsersType['id'];
}
const ManageMembersBtn = ({ memberId }: ManageMembersBtnProps) => {
  const { setActionModalOpen } = useBottomSheetStore();
  const { setSelectedUser } = useUserToManageStore();
  
  const onOpenBottomSheet = () => {
    setSelectedUser(memberId);
    setActionModalOpen(true);
  };

  return (
    <button onClick={onOpenBottomSheet}>
      <Menu />
    </button>
  );
};

export default ManageMembersBtn;
