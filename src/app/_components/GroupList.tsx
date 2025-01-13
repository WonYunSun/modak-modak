'use client';

import { useEffect, useState } from 'react';
import GroupCard from '@components/common/GroupCard';
import { fetchGroupCardInfos } from '@utils/actions/home/fetchGroupList';
import { GroupCardInfosType } from '@components/common/GroupCard';

const GroupList = () => {
  //const userId = 'af747db7-11c9-4bbc-800b-9c02eb04a886' //임시 유저 아이디 : 멤버예요
  const userId = '6f565124-cfc9-46ef-b5ed-220680b11db3'; //임시 유저 아이디 : 관리자예요

  const [groupDataList, setGroupDataList] = useState<GroupCardInfosType[] | null>(null);
  useEffect(() => {
    const fetch = async () => {
      const fetchedGroupDataList = await fetchGroupCardInfos({ userId });
      if (fetchedGroupDataList) setGroupDataList(fetchedGroupDataList);
    };
    fetch();
  }, []);

  return (
    <>
      <div className="flex flex-col gap-y-4">
        {groupDataList && (
          <>
            {groupDataList.map((groupData) => {
              return <GroupCard key={groupData.id} groupInfo={groupData} hasLink={true} />;
            })}
          </>
        )}
      </div>
    </>
  );
};

export default GroupList;
