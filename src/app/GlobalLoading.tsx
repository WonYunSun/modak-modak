import { LoadingIcon1, LoadingIcon2 } from '@components/icons';

const GlobalLoading = () => {
  return (
    <div className="h-screen">
      <div className="flex justify-center items-center h-full">
        <div className="flex flex-col items-center">
          <div className="relative">
            <LoadingIcon1 />
            <div className="absolute top-[0.813rem] left-[0.8rem] animate-fade">
              <LoadingIcon2 />
            </div>
          </div>
          <p className="text-gray-600 text-sm  pt-3">잠시만 기다려주세요</p>
        </div>
      </div>
    </div>
  );
};

export default GlobalLoading;
