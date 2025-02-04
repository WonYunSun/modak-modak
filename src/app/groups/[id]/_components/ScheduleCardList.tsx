'use client';

import { useParams, useRouter } from 'next/navigation';
import CountBar from '@app/groups/[id]/_components/CountBar';
import NoSchedule from '@app/groups/[id]/_components/NoSchedule';
import Button from '@components/common/Button';
import SpinnerContainer from '@components/common/SpinnerContainer';
import { CalendarIconSmall } from '@components/icons';
import ScheduleCard from '@components/common/scheduleCard/ScheduleCard';
import { useGroupSchedules } from '@hooks/schedule/useGroupSchedules';
import NoSearchSchedule from '@app/groups/[id]/_components/NoSearchSchedule';
import { useState } from 'react';
import SearchBar from '@app/groups/[id]/_components/SearchBar';

const ScheduleCardList = () => {
  const { id } = useParams();
  const groupId = Array.isArray(id) ? id[0] : id;
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState<string | null>(null);
  const searchQuery = searchTerm ? searchTerm : undefined;

  const { scheduleData, isPending } = useGroupSchedules(groupId, searchQuery);

  const goToScheduleDetail = (scheduleId: string) => {
    router.push(`/groups/${groupId}/schedules/${scheduleId}`);
  };

  if (isPending) return <SpinnerContainer />;

  return (
    <div>
      {/* 검색바 */}
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      {/* 일정 수 */}
      <CountBar value={scheduleData ? scheduleData.length : 0} />
      <div className="mt-4 mb-28">
        {scheduleData && scheduleData.length > 0 ? (
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
        ) : searchTerm ? (
          <NoSearchSchedule />
        ) : (
          <NoSchedule />
        )}

        <div className="ml-[calc(100%-124px)]">
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
    </div>
  );
};

export default ScheduleCardList;
