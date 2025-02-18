'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';

import CountBar from '@app/groups/[id]/_components/CountBar';
import NoSchedule from '@app/groups/[id]/_components/NoSchedule';
import Button from '@components/common/Button';
import SpinnerContainer from '@components/common/SpinnerContainer';
import { CalendarIconSmall } from '@components/icons';
import ScheduleCard from '@components/common/scheduleCard/ScheduleCard';
import NoSearchSchedule from '@app/groups/[id]/_components/NoSearchSchedule';
import SearchBar from '@app/groups/[id]/_components/SearchBar';

import { useGroupSchedules } from '@hooks/schedule/useGroupSchedules';

import { sendGAEvent } from '@next/third-parties/google';

const ScheduleCardList = () => {
  const { id } = useParams();
  const groupId = Array.isArray(id) ? id[0] : id;
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState<string | null>(null);
  const searchQuery = searchTerm && searchTerm.trim() !== '' ? searchTerm.trim() : undefined;

  const { scheduleData, isPending } = useGroupSchedules(groupId, searchQuery);

  const goToScheduleDetail = (scheduleId: string) => {
    router.push(`/groups/${groupId}/schedules/${scheduleId}`);
  };

  const handleClickNewSchedule = () => {
    // Google Analytics 이벤트 트래킹
    sendGAEvent('event', 'click_schedule_create', { page_type: 'schedule_list_page' });
    router.push(`/groups/${groupId}/schedules/new`);
  };

  return (
    <div>
      {/* 검색바 */}
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      {/* 일정 수 */}
      {!isPending && <CountBar value={scheduleData ? scheduleData.length : 0} />}

      <div className="mt-4 mb-28">
        {isPending ? (
          <SpinnerContainer />
        ) : scheduleData && scheduleData.length > 0 ? (
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
          <Button label="일정 만들기" className="floating-btn" type="button" onClick={handleClickNewSchedule}>
            <CalendarIconSmall />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ScheduleCardList;
