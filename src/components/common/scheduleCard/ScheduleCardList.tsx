'use client';

import { useEffect, useState } from 'react';
import ScheduleCard from './ScheduleCard';
import SearchBar from '@app/groups/[id]/_components/SearchBar';
import CountBar from '@app/groups/[id]/_components/CountBar';
import { fetchSchedulesBygroupId } from 'queries/schedule/ScheduleActions';
import { ScheduleType } from '@ts/scheduleType';

const groupId = '52f44a96-b8f7-4c6c-80b1-d657eafd3821';

const fetchScheduleDatas = async (groupId: string) => {
  try {
    const data = await fetchSchedulesBygroupId(groupId);
    return data;
  } catch (e) {
    console.log(e);
  }
};

const ScheduleCardList = () => {
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

  return (
    <div>
      <SearchBar />
      <CountBar value={scheduleData.length} />
      <div className="mt-4 mb-20">
        {scheduleData.map((schedule, index) => (
          <div className="mb-5" key={index}>
            <ScheduleCard
              name={schedule.name}
              memo={schedule.memo}
              start_date={schedule.start_date}
              end_date={schedule.end_date}
              start_time={schedule.start_time}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScheduleCardList;
