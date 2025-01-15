'use client';

import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { deleteScheduleById, fetchScheduleById } from 'queries/schedule/ScheduleActions';
import FunnelHeader from '@components/common/FunnelHeader';
import Label from '@components/common/Label';
import Button from '@components/common/Button';
import Modal from '@components/common/Modal';
import useModalStore from '@stores/useModalStore';
import { CalendarIcon, ClockIcon } from '@components/icons';
import { formatDate, formatTime } from '@utils/dateUtils';

export const ScheduleDetail = ({ scheduleId }: { scheduleId: string }) => {
  const { openModal } = useModalStore();
  const router = useRouter();
  const { data, isPending, isError } = useQuery({
    queryKey: ['scheduleId', scheduleId],
    queryFn: () => fetchScheduleById(scheduleId),
  });

  const isSingleDay = data?.end_date === data?.start_date;

  const deleteSchedule = async (scheduleId: string) => {
    await deleteScheduleById(scheduleId);
    router.replace('/groups/52f44a96-b8f7-4c6c-80b1-d657eafd3821');
  };

  if (isError) return <div>Error!</div>;
  if (isPending) return <div>Pending...</div>;
  if (!data) return <div>잘못된 접근입니다.</div>;

  return (
    <div>
      <FunnelHeader label="일정 상세" />
      <div className="inner h-[calc(100vh-7rem)] flex flex-col justify-between mt-[2.18rem]">
        <div className="flex flex-col gap-8">
          <div className="space-y-4">
            <Label label="일정명" htmlFor="" />
            <p className="bg-gray-100 px-4 py-3 rounded-lg font-medium">{data.name}</p>
          </div>
          <div className="space-y-4">
            <Label label="날짜" htmlFor="" />
            <div className="flex bg-gray-100 px-4 py-3 rounded-lg font-medium">
              <CalendarIcon className="cursor-pointer mr-2" />
              <p>{formatDate(data.start_date)}</p>
              {isSingleDay && (
                <>
                  <span className="px-[4px]">⁓</span>
                  <p className="truncate">{formatDate(data.end_date)}</p>
                </>
              )}
            </div>
            <div className="flex bg-gray-100 px-4 py-3 rounded-lg font-medium">
              <ClockIcon className=" cursor-pointer mr-2" />
              {formatTime(data.start_time)}
            </div>
          </div>

          <div className="space-y-4">
            <Label label="메모" htmlFor="" />
            <p className="bg-gray-100 px-4 py-3 rounded-lg font-medium">{data.memo}</p>
          </div>
        </div>
        <div className="flex gap-[8px]">
          <Button
            label="삭제"
            className="flex-[2_2_0%] full-white-btn"
            type="button"
            disabled={false}
            onClick={() => openModal()}
          />
          <Button
            label="수정하기"
            className="flex-[5_5_0%] full-btn"
            type="button"
            disabled={false}
            onClick={() => {}}
          />
        </div>
      </div>
      <Modal>
        <div className="w-full">
          <div className="px-[1rem] py-[1.25rem] w-full mb-[1.25rem]">
            <p className="text-gray-900 font-semibold text-lg mb-[0.25rem]">정말 삭제하시겠어요?</p>
            <p className="text-gray-500 ">삭제하시면 되돌릴 수 없어요</p>
          </div>
          <div className="flex gap-[8px] px-[1rem]">
            <Button
              label="취소"
              className="flex-[2_2_0%] full-white-btn"
              type="button"
              disabled={false}
              onClick={() => {}}
            />
            <Button
              label="확인"
              className="flex-[5_5_0%] full-btn"
              type="button"
              disabled={false}
              onClick={() => {
                deleteSchedule(scheduleId);
              }}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};
