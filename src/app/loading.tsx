'use client';

import { useEffect } from 'react';
import useLoadingStore from '@stores/useLoadingStore';
import { LoadingIcon1, LoadingIcon2 } from '@components/icons';

const Loading = () => {
  const setLoading = useLoadingStore((state) => state.setLoading);

  useEffect(() => {
    setLoading(true);
    return () => setLoading(false); // 언마운트될 때 로딩 상태 해제
  }, [setLoading]);

  return (
    <div className="h-screen w-full max-w-[600px] m-auto z-50 bg-white flex justify-center items-center border-x border-gray-200">
      <div className="w-full flex flex-col items-center">
        <div className="relative">
          <LoadingIcon1 />
          <div className="absolute top-[0.813rem] left-[0.8rem] animate-fade">
            <LoadingIcon2 />
          </div>
        </div>
        <p className="text-gray-600 text-sm pt-3">잠시만 기다려주세요</p>
      </div>
    </div>
  );
};

export default Loading;
