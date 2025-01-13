'use client';

import { DayPicker } from 'react-day-picker';

import 'react-day-picker/style.css';
import { useState } from 'react';
import { ko } from 'react-day-picker/locale';
import type { DateRange } from 'react-day-picker';
import { CalendarIcon, ClockIcon } from '@components/icons';

type ScheduleDatePickerProps = {
  onDateChange: (dateRange: { from: string; to: string }) => void;
  onTimeChange: (time: string) => void;
};
const ScheduleDatePicker = ({ onDateChange, onTimeChange }: ScheduleDatePickerProps) => {
  const [selectedRange, setSelectedRange] = useState<DateRange | undefined>();
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [isDatepickerOpen, setIsDatepickerOpen] = useState<boolean>(false);

  const handleSelect = (range: DateRange | undefined) => {
    setSelectedRange(range);

    // 선택된 날짜 범위에서 from과 to를 string으로 변환
    if (range?.from && range?.to) {
      onDateChange({
        from: range.from.toLocaleDateString(),
        to: range.to.toLocaleDateString()
      });
    } else {
      onDateChange({ from: '', to: '' });
    }
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = e.target.value;
    setSelectedTime(time);
    onTimeChange(time);
  };

  return (
    <div className="space-y-4">
      <div className="relative flex items-center">
        <CalendarIcon className="absolute left-4 cursor-pointer" />
        <input
          type="text"
          value={
            selectedRange?.from && selectedRange?.to
              ? `${selectedRange.from.toLocaleDateString()} ~ ${selectedRange.to.toLocaleDateString()}`
              : ''
          }
          onClick={() => {
            setIsDatepickerOpen(!isDatepickerOpen);
          }} // 클릭 시 DatePicker 열기/닫기
          readOnly
          placeholder="날짜"
          className=" border border-solid border-gray-300 px-4 py-3 text-base rounded-lg focus:outline-gray-700 w-full pl-[50px]"
        />
        {isDatepickerOpen && (
          <div className="absolute top-[100%] left-0 z-10">
            <DayPicker
              mode="range"
              locale={ko}
              selected={selectedRange}
              onSelect={handleSelect}
              captionLayout="label"
              dir="ltr"
              showOutsideDays
              timeZone="UTC"
              weekStartsOn={1}
              className="bg-white rounded-lg p-2.5"
            />
          </div>
        )}
      </div>
      <div className="relative flex items-center">
        <ClockIcon className="absolute left-4 cursor-pointer" />

        <input
          value={selectedTime}
          onChange={handleTimeChange}
          onClick={() => setIsDatepickerOpen(false)}
          type="time"
          className="border border-solid border-gray-300 px-4 py-3 text-base rounded-lg focus:outline-gray-700 w-full pl-[50px] "
        />
      </div>
    </div>
  );
};

export default ScheduleDatePicker;
