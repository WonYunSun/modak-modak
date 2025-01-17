'use client';

import { useParams, useRouter } from 'next/navigation';

// import SearchBar from '@app/groups/[id]/_components/SearchBar';

import ScheduleCard from '@components/common/scheduleCard/ScheduleCard';

import { useNewPostStore } from '@stores/useNewPostStore';

import { ScheduleType } from '@ts/scheduleType';

interface PostSelectSectionProps {
  schedules: ScheduleType[] | null;
}

const PostSelectSection = ({ schedules }: PostSelectSectionProps) => {
  const setSelectedScheduleId = useNewPostStore((state) => state.setSelectedScheduleId);

  const router = useRouter();
  const params = useParams();

  const handleScheduleSelect = (scheduleId: string) => {
    setSelectedScheduleId(scheduleId as string);
    router.push(`/groups/${params.id}/posts/new`);
  };

  return (
    <section>
      <div className="p-5">
        {/* TODO: 일정 검색 기능 추가  */}
        {/* <SearchBar /> */}
        <div className="pt-[26px] text-sm font-normal leading-[140%] text-black">
          총 <span className="text-primary">{schedules?.length}</span>개
        </div>
        <div className="mt-5 w-full flex flex-col gap-5">
          {schedules?.map((schedule: ScheduleType) => (
            <div key={schedule.id} onClick={() => handleScheduleSelect(schedule.id)}>
              <ScheduleCard
                name={schedule.name}
                memo={schedule.memo}
                start_date={schedule.start_date}
                end_date={schedule.end_date}
                hasArrow={false}
                start_time={schedule.start_time}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PostSelectSection;
