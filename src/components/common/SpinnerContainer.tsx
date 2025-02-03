import Spinner from '@components/common/Spinner';

interface SpinnerContainerProps {
  height?: number;
}
const SpinnerContainer = ({ height = 352 }: SpinnerContainerProps) => {
  return (
    <div
      className={`w-full flex justify-center items-center`}
      style={{ height: `calc(100vh - ${height}px)` }} // 동적으로 높이 조절
    >
      <Spinner />
    </div>
  );
};

export default SpinnerContainer;
