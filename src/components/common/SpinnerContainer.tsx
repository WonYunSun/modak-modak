import Spinner from '@components/common/Spinner';

interface SpinnerContainerProps {
  heightOffset?: number;
}
const SpinnerContainer = ({ heightOffset = 352 }: SpinnerContainerProps) => {
  return (
    <div
      className={`w-full flex justify-center items-center`}
      style={{ height: `calc(100vh - ${heightOffset}px)` }} // 동적으로 높이 조절
    >
      <Spinner />
    </div>
  );
};

export default SpinnerContainer;
