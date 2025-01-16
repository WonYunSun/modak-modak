'use client';

import { useEffect, useState } from 'react';

import ScheduleCard from '@components/common/scheduleCard/ScheduleCard';

import { useNewPostStore } from '@stores/useNewPostStore';

import { ScheduleType } from '@ts/scheduleType';

import getSingleSchedule from '@queries/post/getSingleSchedule';

const PostSelectCard = () => {
  const { selectedScheduleId } = useNewPostStore();

  const [schedule, setSchedule] = useState<ScheduleType | null>();

  useEffect(() => {
    const getPost = async () => {
      const schedule = await getSingleSchedule(selectedScheduleId);
      setSchedule(schedule);
    };

    if (selectedScheduleId) {
      getPost();
    }
  }, [selectedScheduleId]);

  return (
    <div className="mt-5 p-5">
      {schedule && (
        <ScheduleCard
          name={schedule.name}
          memo={schedule.memo}
          start_date={schedule.start_date}
          end_date={schedule.end_date}
          hasArrow={false}
          start_time={schedule.start_time}
        />
      )}
    </div>
  );
};

export default PostSelectCard;
