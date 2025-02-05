'use client';

import { useParams, useRouter } from 'next/navigation';

import { OrangeArrow } from '@components/icons';

const ScheduleBottomBanner = () => {
  const router = useRouter();
  const { id } = useParams();
  const groupId = Array.isArray(id) ? id[0] : id;

  return (
    <div className="fixed bottom-0 w-full max-w-[600px] bg-gray-100 p-5 flex justify-between items-center z-40 border-x border-gray-200">
      <div>
        <p className="text-sm font-semibold text-gray-700 mb-1">원하는 일정이 없다면 일정을 등록해보세요</p>
        <p className="text-xs text-gray-500">생일 등과 같은 이벤트도 일정으로 등록할 수 있어요</p>
      </div>
      <div
        className="text-primary text-sm font-semibold flex items-center cursor-pointer"
        onClick={() => router.push(`/groups/${groupId}/schedules/new`)}
      >
        바로가기
        <OrangeArrow />
      </div>
    </div>
  );
};

export default ScheduleBottomBanner;
