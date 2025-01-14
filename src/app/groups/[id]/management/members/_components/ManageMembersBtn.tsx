import useBottomSheetStore from '@stores/useBottomSheetStore';
import { Menu } from '@components/icons';

const ManageMembersBtn = () => {
  const { setActionModalOpen } = useBottomSheetStore();

  const onOpenBottomSheet = () => {
    setActionModalOpen(true);
  };

  
  return (
    <button onClick={onOpenBottomSheet}>
      <Menu />
    </button>
  );
};

export default ManageMembersBtn;
