import ManagementSection from '@app/groups/[id]/management/_components/ManagementSection';
import ScheduleCalendar from '@app/mypage/_components/ScheduleCalendar';
import Header from '@components/common/Header';

const MySchedule = () => {
  return (
    <ManagementSection title={'다가오는 일정'} isLast={true}>
      <ScheduleCalendar />
    </ManagementSection>
  );
};

export default MySchedule;
