'use client';

import GroupCard from '@components/common/groupCard/GroupCard';
import useFetchGroupList from '@hooks/home/useFetchGroupList';

const GroupList = () => {

  const { data:groupDataList, isPending, isError } = useFetchGroupList();
  if(isPending) return <div>Loading...</div>;
  if (isError) return <div>Loading...</div>;

  return (
    <>
      <div className="flex flex-col gap-y-4">
        {groupDataList && (
          <>
            {groupDataList.map((groupData) => (
              <GroupCard key={groupData.id} groupInfo={groupData} hasLink={true} />
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default GroupList;
