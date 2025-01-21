'use client';

import { useParams, useRouter } from 'next/navigation';

import Button from '@components/common/Button';
import { CalendarIconSmall } from '@components/icons';

const NoSchedule = () => {
  const router = useRouter();
  const { id } = useParams();
  const groupId = Array.isArray(id) ? id[0] : id;

  return (
    <>
      <div className="mx-auto mt-[7.5rem] text-center justify-center">
        <h4 className="pb-5 text-2xl font-bold">아직 만들어진 일정이 없어요!</h4>
        <p className="text-gray-700 text-lg">지난 일정을 등록하고</p>
        <p className="text-gray-700 text-lg">우리만의 추억을 공유해보세요</p>
      </div>
      <Button
        label="일정 만들기"
        className="floating-btn"
        type="button"
        onClick={() => router.push(`/groups/${groupId}/schedules/new`)}
      >
        <CalendarIconSmall />
      </Button>
    </>
  );
};

export default NoSchedule;
