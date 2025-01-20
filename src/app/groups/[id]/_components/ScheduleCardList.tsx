'use client';

import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import CountBar from '@app/groups/[id]/_components/CountBar';
import NoSchedule from '@app/groups/[id]/_components/NoSchedule';
import Button from '@components/common/Button';
import Spinner from '@components/common/Spinner';
import { CalendarIconSmall } from '@components/icons';
import ScheduleCard from '@components/common/scheduleCard/ScheduleCard';
import { fetchSchedulesBygroupId } from 'queries/schedule/ScheduleActions';

const ScheduleCardList = () => {
  const { id } = useParams();
  const groupId = Array.isArray(id) ? id[0] : id;
  const router = useRouter();
  // const [scheduleData, setScheduleData] = useState<ScheduleType[]>([]);

  const { data: scheduleData = [], isPending } = useQuery({
    queryKey: ['GroupSchedules', groupId], // queryKey로 groupId 지정
    queryFn: async () => (await fetchSchedulesBygroupId(groupId)) || [], // fetch 함수 호출
    enabled: !!groupId, // groupId가 있을 때만 fetch
  });

  const goToScheduleDetail = (scheduleId: string) => {
    router.push(`/groups/${groupId}/schedules/${scheduleId}`);
  };
  if (isPending) {
    <Spinner />;
  }
  return (
    <div>
      <CountBar value={scheduleData.length} />
      <div className="mt-4 mb-28">
        {scheduleData.length > 0 ? (
          scheduleData.map((schedule, index) => (
            <div className="mb-5" key={index} onClick={() => goToScheduleDetail(schedule.id)}>
              <ScheduleCard
                name={schedule.name}
                memo={schedule.memo}
                start_date={schedule.start_date}
                end_date={schedule.end_date}
                start_time={schedule.start_time}
              />
            </div>
          ))
        ) : (
          <NoSchedule />
        )}
        <Button
          label="일정 만들기"
          className="floating-btn"
          type="button"
          onClick={() => router.push(`/groups/${groupId}/schedules/new`)}
        >
          <CalendarIconSmall />
        </Button>
      </div>
    </div>
  );
};

export default ScheduleCardList;
