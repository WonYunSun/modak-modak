import ScheduleCard from '@components/common/ScheduleCard';
const dummyData = {
  id: '550e8400-e29b-41d4-a716-446655440000', // uuid 형식
  name: '3번째 모각코🔥', // text 형식
  memo: '각자 모여서 공부하고 피드백 하기!각자 모여서 공부하고 피드백 하기!!각자 모여서 공부하고 피드백 하기!!각자 모여서 공부하고 피드백 하기!', // text 형식
  start_date: '2025-01-09', // date 형식 (YYYY-MM-DD)
  end_date: '2025-01-09', // date 형식 (YYYY-MM-DD)
  start_time: '19:28:00', // time 형식 (HH:MM:SS)
  created_at: '2024-06-01T12:00:00Z', // timestamptz 형식 (ISO 8601 형식)
  group_id: '550e8400-e29b-41d4-a716-446655440000'
};
const HomePage = () => {
  return (
    <div>
      home<ScheduleCard {...dummyData} groupName="나의 프론트 아카데미아" hasArrow={false}></ScheduleCard>
    </div>
  );
};

export default HomePage;
