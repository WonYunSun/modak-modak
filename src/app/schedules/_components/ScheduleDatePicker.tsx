'use client';

import { DayPicker } from 'react-day-picker';
import 'react-day-picker/style.css';
import { useState } from 'react';
import { ko } from 'react-day-picker/locale';
import type { DateRange } from 'react-day-picker';

type ScheduleDatePickerProps = {
  onDateChange: (dateRange: { from: string; to: string }) => void;
};
const ScheduleDatePicker = ({ onDateChange }: ScheduleDatePickerProps) => {
  const [selectedRange, setSelectedRange] = useState<DateRange | undefined>();

  const [isOpen, setIsOpen] = useState<boolean>(false);

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

  return (
    <div className="relative">
      <input
        type="text"
        value={
          selectedRange?.from && selectedRange?.to
            ? `${selectedRange.from.toLocaleDateString()} ~ ${selectedRange.to.toLocaleDateString()}`
            : ''
        }
        onClick={() => setIsOpen(!isOpen)} // 클릭 시 DatePicker 열기/닫기
        readOnly
        placeholder="날짜 범위를 선택하세요"
        className="border border-solid border-gray-300 px-4 py-3 text-base rounded-lg focus:outline-gray-700 w-full"
      />

      {isOpen && (
        <div className="absolute z-10 mt-1">
          <DayPicker
            mode="range"
            locale={ko}
            style={{}}
            selected={selectedRange} // 범위 선택된 날짜
            onSelect={handleSelect}
            captionLayout="label"
            dir="ltr"
            showOutsideDays
            timeZone="UTC"
            weekStartsOn={1}
            className="bg-white rounded-lg "
            footer={
              <button onClick={() => setIsOpen(false)} className="bg-blue-500 text-white py-1 px-4 rounded">
                완료
              </button>
            }
          />
        </div>
      )}
    </div>
  );
};

export default ScheduleDatePicker;
