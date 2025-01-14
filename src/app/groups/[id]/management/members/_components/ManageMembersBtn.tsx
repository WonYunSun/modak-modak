import { Menu } from "@components/icons"
import useBottomSheetStore from "@stores/useBottomSheetStore";

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
}

export default ManageMembersBtn