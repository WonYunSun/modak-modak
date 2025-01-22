'use client';

import useBottomSheetStore from '@stores/useBottomSheetStore';
import useUserToManageStore from '@stores/useUserToManage';
import { Menu } from '@components/icons';
import { UsersType } from '@ts/supabaseTableRowTypes';

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
      <div className='w-[40px] h-[40px] flex justify-center items-center'>
        <Menu />
      </div>
    </button>
  );
};

export default ManageMembersBtn;
