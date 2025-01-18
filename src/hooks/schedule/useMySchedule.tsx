// import { useQuery } from '@tanstack/react-query';
// import { getMySchedules } from '@queries/schedule/ScheduleActions';
// import { useEffect, useState } from 'react';
// import { createCalendar, DayInfo, select } from '@lib/scheduleCalendar';

// const useMySchedule = () => {
//   const [calendar, setCalendar] = useState<DayInfo[][]>([]);
//   const {
//     data: schedules,
//     isPending,
//     isError,
//   } = useQuery({
//     queryKey: ['mySchedule'],
//     queryFn: async () => await getMySchedules(),
//     enabled: calendar.length === 0,
//     staleTime: 60 * 5 * 1000,
//   });

//   useEffect(() => {
//     if (!isPending && schedules && schedules.length > 0) {
//       setCalendar(createCalendar({ schedules }));
//     }
//   }, [schedules]);

//   const selectDay = (id: string) => setCalendar(select(calendar, id));

//   return {
//     calendar,
//     selectDay,
//     isPending,
//     isError,
//   };
// };

// export default useMySchedule;
