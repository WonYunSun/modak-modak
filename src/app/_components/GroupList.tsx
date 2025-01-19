'use client';

import GroupCard, { GroupCardInfosType } from '@components/common/groupCard/GroupCard';

interface GroupListProps {
  groupDataList: GroupCardInfosType[];
  isWaiting?: boolean;
}
const GroupList = ({ groupDataList, isWaiting = false }: GroupListProps) => {
  return (
    <>
      {groupDataList && (
        <>
          {groupDataList.map((groupData) => (
            <GroupCard key={groupData.id} groupInfo={groupData} hasLink={true} disabled={isWaiting} />
          ))}
        </>
      )}
    </>
  );
};

export default GroupList;
