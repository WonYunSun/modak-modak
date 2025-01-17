'use client';

import useBottomSheetStore from '@stores/useBottomSheetStore';
import useUserToManageStore from '@stores/useUserToManage';
import { Menu } from '@components/icons';
import { UsersType } from '@queries/home/fetchGroupInfo';

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
