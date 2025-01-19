import { useState } from 'react';
import { QueryObserverResult } from '@tanstack/react-query';
import Button from '@components/common/Button';
import Label from '@components/common/Label';
import LabeledTextInput, { LabeledTextInputProps } from '@components/common/LabeledTextInput';
import ScheduleDatePicker from '@app/groups/[id]/schedules/_components/ScheduleDatePicker';
import { updateScheduleById } from 'queries/schedule/ScheduleActions';
import { ScheduleType } from '@ts/scheduleType';

interface ScheduleEditType {
  schedule: ScheduleType;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
  refetch: () => Promise<QueryObserverResult<ScheduleType | null, Error>>;
}

export const ScheduleEdit = ({ schedule, setIsEdit, refetch }: ScheduleEditType) => {
  const [values, setValues] = useState(schedule);

  const handleChange = (key: keyof ScheduleType) => (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setValues((prev) => ({ ...prev, [key]: target.value })); // target.value 사용
  };
  const handleDateChange = (dateRange: { from: string; to: string }) => {
    setValues({ ...values, start_date: dateRange.from, end_date: dateRange.to });
  };
  const handleTimeChange = (time: string) => {
    setValues({ ...values, start_time: time });
  };

  const handleSave = async () => {
    const success = await updateScheduleById(values.id, values);
    if (success) {
      await refetch(); // 데이터 리페치

      setIsEdit(false); // 수정 모드 종료
    } else {
      console.log('스케줄 수정 실패');
    }
  };

  const nameData: LabeledTextInputProps = {
    // input 관련
    onChange: handleChange('name'),
    value: values.name,
    name: 'scheduleName',
    maxLength: 20,
    placeHolder: '최대 20자까지 입력',
    // label 관련
    label: '일정명',
    required: false,
    htmlFor: 'scheduleName',
  };
  const memoData: LabeledTextInputProps = {
    // input 관련
    onChange: handleChange('memo'),
    value: values.memo ?? undefined,
    name: 'scheduleMemo',
    maxLength: 20,
    placeHolder: '최대 20자까지 입력',
    // label 관련
    label: '메모',
    required: false,
    htmlFor: 'scheduleMemo',
  };

  const prevData = {
    scheduleDate: {
      from: values.start_date,
      to: values.end_date,
    },
    scheduleTime: values.start_time,
  };

  return (
    <div className="inner h-[calc(100vh-7rem)] flex flex-col justify-between mt-[2.18rem]">
      <div className="flex flex-col gap-8">
        <div className="space-y-4">
          <LabeledTextInput {...nameData} />
        </div>

        <div className="space-y-4">
          <Label htmlFor="" label="모임 일시" />
          <ScheduleDatePicker onDateChange={handleDateChange} onTimeChange={handleTimeChange} prevData={prevData} />
        </div>

        <div className="space-y-4">
          <LabeledTextInput {...memoData} />
        </div>
      </div>
      <div className="">
        <Button label="저장하기" className="full-btn" type="button" disabled={false} onClick={handleSave} />
      </div>
    </div>
  );
};
