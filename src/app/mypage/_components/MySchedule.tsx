import ManagementSection from '@app/groups/[id]/management/_components/ManagementSection';
import ScheduleCalendar from '@app/mypage/_components/ScheduleCalendar';

const MySchedule = () => {
  return (
    <ManagementSection title={'다가오는 일정'} isLast={true}>
      <ScheduleCalendar />
    </ManagementSection>
  );
};

export default MySchedule;
