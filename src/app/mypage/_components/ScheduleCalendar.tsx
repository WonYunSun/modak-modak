'use client';

import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import ScheduleCardList from '@app/mypage/_components/ScheduleCardList';
import useMySchedule from '@hooks/schedule/useMySchedule';
import { createCalendar, DayInfo, firstWeekSchedules, getSelectedDay, select } from '@lib/scheduleCalendar';
import { MyScheduleData } from '@queries/schedule/ScheduleActions';

const ScheduleCalendar = () => {
  const [calendar, setCalendar] = useState<DayInfo[][]>([]);
  const { schedules, isPending, isError } = useMySchedule();

  useEffect(() => {
    if (!isPending && schedules) {
      setCalendar(createCalendar({ schedules }));
    }
  }, [schedules]);

  if (isPending) return null;
  if (isError) throw new Error();

  const handleDayClick = (id: string) => {
    setCalendar(select(calendar, id));
  };

  const getSchedules = (): MyScheduleData[] => {
    const selectedDay = getSelectedDay(calendar);
    if (!selectedDay) return firstWeekSchedules(calendar);
    return selectedDay.schedules;
  };

  return (
    <div className="mt-2 px-5">
      <Swiper slidesPerView={1} spaceBetween={10} className="w-full h-14 mb-2">
        {calendar.map((week, idx) => (
          <SwiperSlide key={idx}>
            <div className="flex">
              {week.map(({ id, dayOfWeek, date, isToday, isSelected, isSunday, hasSchedule }) => (
                <div className="flex-1" key={id} onClick={() => handleDayClick(id)}>
                  <div
                    className={`flex flex-col items-center rounded-full m-[1px]
                        ${isToday && 'bg-[#FFD3B8]'}
                        ${isSelected && 'border border-primary-2-300 m-0'}`}
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
      <ScheduleCardList schedules={getSchedules()} />
    </div>
  );
};

export default ScheduleCalendar;
