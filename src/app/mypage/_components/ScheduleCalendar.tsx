'use client';

import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import ScheduleCardList from '@app/mypage/_components/ScheduleCardList';
import { RedDot } from '@components/icons';
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
      <div className="h-14 mb-2">
        <Swiper slidesPerView={1} spaceBetween={10} className="w-full h-14">
          {calendar.map((week, idx) => (
            <SwiperSlide key={idx}>
              <div className="flex justify-center">
                {week.map(({ id, dayOfWeek, date, isToday, isSelected, isSunday, hasSchedule }) => (
                  <div className="flex justify-center flex-1" key={id} onClick={() => handleDayClick(id)}>
                    <div
                      className={`flex flex-col items-center rounded-full text-center border w-12 h-12 text-gray-500
                        ${isToday && 'bg-[#FFD3B8]'}
                        ${isSelected ? 'border-primary-2-300' : 'border-transparent'}`}
                    >
                      <span
                        className={`w-4 h-5 text-xs font-normal mt-1 mx-4 leading-none relative flex flex-col justify-center
                          ${isSunday ? 'text-base-red' : ''}`}
                      >
                        {hasSchedule && <RedDot className="ml-auto absolute top-[-1px] right-[-1px]" />}
                        <span className='my-auto'>{dayOfWeek}</span>
                      </span>
                      <span className="w-4 h-5 text-sm font-semibold mb-1">{date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <ScheduleCardList schedules={getSchedules()} />
    </div>
  );
};

export default ScheduleCalendar;
