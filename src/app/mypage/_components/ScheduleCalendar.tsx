'use client';

import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import ScheduleCardList from '@app/mypage/_components/ScheduleCardList';
import ScheduleDay from '@app/mypage/_components/ScheduleDay';
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
    <div className="py-2 px-5">
      <div className="h-14 mb-2 relative">
        <Swiper slidesPerView={1} spaceBetween={10} className="w-full h-14">
          {calendar.map((week, idx) => (
            <SwiperSlide key={idx}>
              <div className="flex justify-center pl-4">
                {week.map((day) => (
                  <ScheduleDay key={day.id} {...day} onClick={handleDayClick} />
                ))}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div
          className="absolute top-0 right-0 w-[12%] h-12 bg-gradient-to-l from-white to-transparent pointer-events-none z-10"
          aria-hidden="true"
        ></div>
      </div>
      <ScheduleCardList schedules={getSchedules()} />
    </div>
  );
};

export default ScheduleCalendar;
