'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

import CountBar from '@app/groups/[id]/_components/CountBar';
import NoSchedule from '@app/groups/[id]/_components/NoSchedule';
import Button from '@components/common/Button';
import { CalendarIconSmall } from '@components/icons';
import ScheduleCard from '@components/common/scheduleCard/ScheduleCard';

import { fetchSchedulesBygroupId } from 'queries/schedule/ScheduleActions';

import { ScheduleType } from '@ts/scheduleType';

const fetchScheduleDatas = async (groupId: string) => {
  try {
    const data = await fetchSchedulesBygroupId(groupId);
    return data;
  } catch (e) {
    console.log(e);
  }
};

const ScheduleCardList = () => {
  const { id } = useParams();
  const groupId = Array.isArray(id) ? id[0] : id;
  const router = useRouter();
  const [scheduleData, setScheduleData] = useState<ScheduleType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchScheduleDatas(groupId);

      if (data) {
        setScheduleData(data);
      }
    };
    fetchData();
  }, []);

  const goToScheduleDetail = (scheduleId: string) => {
    router.push(`/groups/${groupId}/schedules/${scheduleId}`);
  };
  return (
    <div>
      {/* <SearchBar /> */}
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
