import { useParams, useRouter } from 'next/navigation';
import { CalendarIcon, ClockIcon } from '@components/icons';
import useModalStore from '@stores/useModalStore';
import Button from '@components/common/Button';
import Label from '@components/common/Label';
import Modal from '@components/common/Modal';
import { formatDate, formatTime } from '@utils/dateUtils';
import { deleteScheduleById } from '@queries/schedule/ScheduleActions';
import { ScheduleType } from '@ts/scheduleType';

interface ScheduleInfoType {
  schedule: ScheduleType;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ScheduleInfo = ({ schedule, setIsEdit }: ScheduleInfoType) => {
  const { openModal, closeModal } = useModalStore();
  const router = useRouter();
  const { id } = useParams();
  const groupId = Array.isArray(id) ? id[0] : id;

  const isSingleDay = schedule.end_date === schedule.start_date;

  const deleteSchedule = async (scheduleId: string) => {
    await deleteScheduleById(scheduleId);
    router.replace(`/groups/${groupId}`);
  };

  return (
    <div className="h-[calc(100vh-7rem)] flex flex-col justify-between mt-[2.18rem]">
      <div className="flex flex-col gap-8">
        <div className="space-y-4">
          <Label label="일정명" htmlFor="" />
          <p className="bg-gray-100 px-4 py-3 rounded-lg font-medium">{schedule.name}</p>
        </div>
        <div className="space-y-4">
          <Label label="날짜" htmlFor="" />
          <div className="flex bg-gray-100 px-4 py-3 rounded-lg font-medium">
            <CalendarIcon className="cursor-pointer mr-2" />
            <p>{formatDate(schedule.start_date)}</p>
            {!isSingleDay && (
              <>
                <span className="px-1">⁓</span>
                <p className="truncate">{formatDate(schedule.end_date)}</p>
              </>
            )}
          </div>
          <div className="flex bg-gray-100 px-4 py-3 rounded-lg font-medium">
            <ClockIcon className=" cursor-pointer mr-2" />
            {formatTime(schedule.start_time)}
          </div>
        </div>

        <div className="space-y-4">
          <Label label="메모" htmlFor="" />
          <p className="bg-gray-100 px-4 py-3 rounded-lg font-medium">{schedule.memo}</p>
        </div>
      </div>
      <div className="flex gap-2">
        <Button
          label="삭제"
          className="flex-[2_2_0%] full-white-btn"
          type="button"
          disabled={false}
          onClick={() => {
            openModal();
          }}
        />
        <Button
          label="수정하기"
          className="flex-[5_5_0%] full-btn"
          type="button"
          disabled={false}
          onClick={() => {
            setIsEdit(true);
          }}
        />
      </div>
      <Modal>
        <div className="w-full">
          <div className="px-[1rem] py-[1.25rem] w-full mb-[1.25rem]">
            <p className="text-gray-900 font-semibold text-lg mb-[0.25rem]">정말 삭제하시겠어요?</p>
            <p className="text-gray-500 ">삭제하시면 되돌릴 수 없어요</p>
          </div>
          <div className="flex gap-2 px-[1rem]">
            <Button
              label="취소"
              className="flex-[2_2_0%] full-white-btn"
              type="button"
              disabled={false}
              onClick={() => {
                closeModal();
              }}
            />
            <Button
              label="확인"
              className="flex-[5_5_0%] full-btn"
              type="button"
              disabled={false}
              onClick={() => {
                deleteSchedule(schedule.id);
                closeModal();
              }}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};
