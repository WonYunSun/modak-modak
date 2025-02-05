'use client';

import { useState } from 'react';
import TimePicker from '@app/groups/[id]/schedules/_components/TimePicker';
import Button from '@components/common/Button';

interface SelecTimeProps {
  onTimeSelect: (time: string) => void;
  onClose: () => void;
}

const SelectTime = ({ onTimeSelect, onClose }: SelecTimeProps) => {
  const [selectedHour, setSelectedHour] = useState('12');
  const [selectedMinute, setSelectedMinute] = useState('00');

  // 시간,분 데이터 만들기(인덱스 활용)
  // 인덱스를 문자열로 변환하고 문자열 길이 2자리로 만들기(앞에 "0"채움)
  const hours = [...Array(24)].map((_, i) => i.toString().padStart(2, '0'));
  const minutes = [...Array(60)].map((_, i) => i.toString().padStart(2, '0'));

  // 시간,분 스크롤 이벤트 핸들러
  const handleHourScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const index = Math.round(container.scrollTop / 40); // 40px 단위로 스크롤 위치 계산
    setSelectedHour(hours[index] || '00'); // 해당 인덱스의 값(시간)으로 상태 업데이트
  };

  const handleMinuteScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const index = Math.round(container.scrollTop / 40);
    setSelectedMinute(minutes[index] || '00');
  };

  // 확인버튼 + 모달닫기
  const handleConfirm = () => {
    onTimeSelect(`${selectedHour}:${selectedMinute}`); // 선택된 시간을 "12:30" 형식으로 전달
    onClose();
  };

  return (
    <div onClick={onClose} className="flex items-center justify-center w-full h-full z-50">
      <div className="w-full m-4  flex items-center justify-center " onClick={(e) => e.stopPropagation()}>
        <section className="w-full">
          <div className="flex justify-center items-center">
            {/* 시간 선택 */}
            <TimePicker time={hours} handleTimeScroll={handleHourScroll} selectedTime={selectedHour} />
            <span className="text-xl font-bold mx-4">:</span>
            {/* 분 선택 */}
            <TimePicker time={minutes} handleTimeScroll={handleMinuteScroll} selectedTime={selectedMinute} />
          </div>
          <div className="flex justify-center items-center gap-2 text-white mt-4">
            <Button onClick={handleConfirm} label="적용" type="button" className="modal-full-btn"></Button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SelectTime;
