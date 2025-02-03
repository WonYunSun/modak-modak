'use client';
import { useEffect, useRef, useState } from 'react';
import { DayPicker } from 'react-day-picker';
import { ko } from 'react-day-picker/locale';
import type { DateRange } from 'react-day-picker';
import { CalendarIcon, ClockIcon } from '@components/icons';
import SelectTime from '@app/groups/[id]/schedules/_components/SelectTime';
import { formatTime } from '@utils/dateUtils';
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
  const [isTimepickerOpen, setIsTimepickerOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timepickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prevData?.scheduleDate) {
      setSelectedRange({
        from: prevData.scheduleDate.from ? new Date(prevData.scheduleDate.from) : undefined,
        to: prevData.scheduleDate.to ? new Date(prevData.scheduleDate.to) : undefined,
      });
    }
    setSelectedTime(prevData?.scheduleTime || '');
  }, []);

  const handleClickOutside = (event: MouseEvent) => {
    // 클릭된 요소가 dropdownRef 내부에 있지 않다면 닫기
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsDatepickerOpen(false);
    }
    if (timepickerRef.current && !timepickerRef.current.contains(event.target as Node)) {
      setIsTimepickerOpen(false);
    }
  };

  useEffect(() => {
    // 전역 클릭 이벤트 감지
    document.addEventListener('mousedown', handleClickOutside);

    // 정리(clean-up) 함수로 이벤트 리스너 제거
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
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

  const handleTimeChange = (time: string) => {
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
          }}
          readOnly
          placeholder="날짜"
          className="border border-solid border-gray-300 px-4 py-3 text-base rounded-lg focus:outline-gray-700 w-full pl-[3.12rem]"
        />
        {isDatepickerOpen && (
          <div className="absolute top-[100%] left-0 z-10" ref={dropdownRef}>
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
              className="bg-white rounded-lg p-2.5 drop-shadow-md"
            />
          </div>
        )}
      </div>
      <div className="relative flex items-center">
        <ClockIcon className="absolute left-4 cursor-pointer" />
        <div
          onClick={() => {
            setIsTimepickerOpen(!isTimepickerOpen);
          }}
          className="border border-solid border-gray-300 px-4 py-3 text-base rounded-lg focus:outline-gray-700 w-full pl-[3.12rem] h-[50px] "
        >
          {selectedTime ? formatTime(selectedTime) : <p className="text-[#a0a0a0]">만나는 시간(필수는 아니에요)</p>}
        </div>
        {isTimepickerOpen && (
          <div ref={timepickerRef} className="absolute z-50 top-[100%] left-0 w-full bg-white drop-shadow-md">
            <SelectTime
              onTimeSelect={handleTimeChange}
              onClose={() => {
                setIsTimepickerOpen(false);
              }}
            />
          </div>
        )}
      </div>
      <p className="text-sm text-gray-400 mt-4">날짜는 원하는 범위로 선택할 수 있어요</p>
    </div>
  );
};

export default ScheduleDatePicker;
