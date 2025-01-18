'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { ScheduleType } from '@ts/scheduleType';
import { useState } from 'react';
import { createCalendar, DayInfo, select } from '@lib/scheduleCalendar';

interface ScheduleCalendar {
  schedules: ScheduleType[];
}

const ScheduleCalendar = ({ schedules }: ScheduleCalendar) => {
  const [calendar, setCalendar] = useState<DayInfo[][]>(createCalendar({ schedules }));

  return (
    <div className="mt-2 px-5">
      <Swiper slidesPerView={1} spaceBetween={10} className="w-full h-14">
        {calendar.map((week, idx) => (
          <SwiperSlide key={idx}>
            <div className="flex">
              {week.map(({ id, dayOfWeek, date, isToday, isSelected, isSunday, hasSchedule }) => (
                <div className=" flex-grow" key={id} onClick={() => setCalendar(select(calendar, id))}>
                  <div
                    className={`flex flex-col items-center rounded-full p-[1px]
                        ${isToday && 'bg-[#FFD3B8]'}
                        ${isSelected && 'border border-primary-2-300 p-0'}`}
                  >
                    <span className={`${isSunday ? 'text-base-red' : ''} ${hasSchedule ? 'text-base-red' : ''}`}>
                      {dayOfWeek}
                    </span>
                    <span>{date}</span>
                  </div>
                </div>
              ))}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ScheduleCalendar;
