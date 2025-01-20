import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import { MyScheduleData } from '@queries/schedule/ScheduleActions';

dayjs.locale('ko');

export interface DayInfo {
  id: string;
  dayOfWeek: string;
  date: string;
  isToday: boolean;
  isSelected: boolean;
  hasSchedule: boolean;
  isSunday: boolean;
  schedules: MyScheduleData[];
}

interface createParams {
  schedules: MyScheduleData[];
}

export const createCalendar = ({ schedules }: createParams): DayInfo[][] => {
  const splitSchedules = splitScheduleByDay(schedules);
  const calendar = createBaseCalendar();
  const mergedCalendar = merge({ calendar, splitSchedules });
  mergedCalendar[0][0].isToday = true;
  return mergedCalendar;
};

interface mergeParams {
  calendar: DayInfo[][];
  splitSchedules: Map<string, MyScheduleData[]>;
}

const merge = ({ calendar, splitSchedules }: mergeParams): DayInfo[][] => {
  return calendar.map((week) =>
    week.map((day) => {
      if (splitSchedules.has(day.id)) {
        day.schedules = [...splitSchedules.get(day.id)!];
        day.hasSchedule = true;
      }
      return day;
    })
  );
};

const splitScheduleByDay = (schedules: MyScheduleData[]): Map<string, MyScheduleData[]> => {
  const split = new Map<string, MyScheduleData[]>();

  schedules.forEach((schedule) => {
    let startDate = dayjs(schedule.start_date);
    const endDate = dayjs(schedule.end_date);

    const newSchedule = { ...schedule };
    const key = startDate.format('YYYY-MM-DD');
    split.set(key, [...(split.get(key) || []), newSchedule]);

    while (!startDate.isSame(endDate, 'day')) {
      startDate = startDate.add(1, 'day');
      const key = startDate.format('YYYY-MM-DD');
      split.set(key, [...(split.get(key) || []), newSchedule]);
    }
  });
  return split;
};

const createBaseCalendar = (): DayInfo[][] => {
  const today = dayjs();
  let dayCount = 0;

  return Array.from({ length: 4 }).map(() => {
    return Array.from({ length: 7 }).map(() => {
      const day = today.add(dayCount++, 'd');
      const dayOfWeek = day.format('ddd');
      return {
        id: day.format('YYYY-MM-DD'),
        dayOfWeek,
        date: day.format('D'),
        isToday: false,
        isSelected: false,
        hasSchedule: false,
        isSunday: dayOfWeek === '일',
        schedules: [],
      };
    });
  });
};

export const select = (calendar: DayInfo[][], id: string) => {
  let prevSelectedId = '';

  calendar.forEach((week) => {
    const found = week.find((day) => day.isSelected);
    if (found) prevSelectedId = found.id;
  });

  return calendar.map((week) => {
    return week.map((day) => {
      const newDay = { ...day };
      newDay.isSelected = newDay.id === id && newDay.id !== prevSelectedId;
      return newDay;
    });
  });
};

export const firstWeekSchedules = (calendar: DayInfo[][]) => {
  if (calendar.length <= 0) return [];
  const scheduledDays = calendar[0].filter((day) => day.schedules.length > 0);
  const schedules = scheduledDays.reduce<MyScheduleData[]>((acc, day) => {
    day.schedules.forEach((schedule) => {
      if (!acc.find((prevSchedule) => prevSchedule.id === schedule.id)) {
        acc.push(schedule);
      }
    });
    return acc;
  }, []);
  return schedules;
};

export const getSelectedDay = (calendar: DayInfo[][]) => {
  let selectedDay: DayInfo | undefined;
  calendar.forEach((week) => {
    if (!selectedDay) selectedDay = week.find((day) => day.isSelected);
  });
  return selectedDay;
};
