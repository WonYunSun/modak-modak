'use client';

import { useRouter } from 'next/navigation';
import Button from '@components/common/Button';
import { WraningIcon } from '@components/icons';

const GlobalError = () => {
  const router = useRouter();

  const handleGoHome = () => {
    router.push('/'); // 홈으로 이동
  };

  const handleGoBack = () => {
    router.back(); // 이전 페이지로 이동
  };

  return (
    <div className="h-screen bg-[#FFF2EB]">
      <div className="flex justify-center items-center h-full">
        <div className="flex flex-col items-center text-center">
          <WraningIcon />
          <p className="pt-3 text-xl text-gray-900 font-bold">다시한번 확인해주세요</p>
          <p className="pt-4 text-xs text-gray-600">
            존재하지 않는 주소를 입력하셨거나
            <br />
            요청하시니 페이지의 주소가 변경, 삭제되어 찾을 수 없어요
          </p>
          <div className="flex gap-2 w-full mt-[2.75rem]">
            <Button className="modal-white-btn" label="이전 페이지로" type="button" onClick={handleGoBack} />
            <Button className="modal-full-btn" label="홈으로" type="button" onClick={handleGoHome} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalError;
