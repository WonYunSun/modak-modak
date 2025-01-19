'use client';

import GroupCard, { GroupCardInfosType } from '@components/common/groupCard/GroupCard';

interface GroupListProps {
  groupDataList: GroupCardInfosType[];
}
const GroupList = ({ groupDataList }: GroupListProps) => {
  return (
    <>
      <div className="sticky top-12 w-full left-0 bg-white rounded-t-[1.25rem] overflow-hidden group-title">
        <h4 className="p-5 text-xl font-bold bg-white">나의 모임</h4>
      </div>
      <div className="px-5 pt-2">
        <div className="flex flex-col gap-y-4">
          {groupDataList && (
            <>
              {groupDataList.map((groupData) => (
                <GroupCard key={groupData.id} groupInfo={groupData} hasLink={true} />
              ))}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default GroupList;
