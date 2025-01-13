import { Sheet } from 'react-modal-sheet';

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  snapPoint: number[];
  children: React.ReactNode;
  postId?: string;
}

const BottomSheet = ({ children, isOpen, onClose, snapPoint, postId }: BottomSheetProps) => {
  return (
    <Sheet isOpen={isOpen} onClose={onClose} snapPoints={snapPoint}>
      <Sheet.Container>
        <Sheet.Header>
          <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mt-3" />
        </Sheet.Header>
        <Sheet.Content>
          <div className="w-full px-4 py-2">{children}</div>
        </Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop onTap={onClose} />
    </Sheet>
  );
};

export default BottomSheet;
