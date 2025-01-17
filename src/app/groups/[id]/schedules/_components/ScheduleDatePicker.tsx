'use client';
import { useEffect, useState } from 'react';
import { DayPicker } from 'react-day-picker';
import { ko } from 'react-day-picker/locale';
import type { DateRange } from 'react-day-picker';
import { CalendarIcon, ClockIcon } from '@components/icons';
import 'react-day-picker/style.css';

type ScheduleDatePickerProps = {
  onDateChange: (dateRange: { from: string; to: string }) => void;
  onTimeChange: (time: string) => void;
  prevData: { scheduleDate: { from: string; to: string }; scheduleTime: string };
};

const ScheduleDatePicker = ({ onDateChange, onTimeChange, prevData }: ScheduleDatePickerProps) => {
  const [selectedRange, setSelectedRange] = useState<DateRange | undefined>();
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [isDatepickerOpen, setIsDatepickerOpen] = useState<boolean>(false);

  useEffect(() => {
    if (prevData?.scheduleDate) {
      setSelectedRange({
        from: prevData.scheduleDate.from ? new Date(prevData.scheduleDate.from) : undefined,
        to: prevData.scheduleDate.to ? new Date(prevData.scheduleDate.to) : undefined,
      });
    }
    setSelectedTime(prevData?.scheduleTime || '');
  }, []);

  const convertToUTC = (date: Date) => {
    const utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    return utcDate;
  };

  const handleSelect = (range: DateRange | undefined) => {
    if (range?.from && range?.to) {
      const from = convertToUTC(range.from);
      const to = convertToUTC(range.to);
      setSelectedRange({ from, to });
      onDateChange({
        from: from.toISOString().split('T')[0],
        to: to.toISOString().split('T')[0],
      });
    } else {
      setSelectedRange(undefined);
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
          className="border border-solid border-gray-300 px-4 py-3 text-base rounded-lg focus:outline-gray-700 w-full pl-[3.12rem]"
        />
        {isDatepickerOpen && (
          <div className="absolute top-[100%] left-0 z-10">
            <DayPicker
              mode="range"
              selected={selectedRange}
              locale={ko}
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
          className="border border-solid border-gray-300 px-4 py-3 text-base rounded-lg focus:outline-gray-700 w-full pl-[3.12rem] "
        />
      </div>
    </div>
  );
};

export default ScheduleDatePicker;
