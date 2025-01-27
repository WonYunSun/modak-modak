'use client';

import GroupList from '@app/_components/GroupList';
import NoGroup from '@app/_components/NoGroup';
import GlobalLoading from '@components/common/GlobalLoading';
import useFetchGroupList from '@hooks/home/useFetchGroupList';
import useFetchWaitingGroupList from '@hooks/home/useFetchWaitingGroupList';

const HomeGroupListSection = () => {
  const { data: groupDataList } = useFetchGroupList();
  const { data: waitingGroupDataList } = useFetchWaitingGroupList();

  if (groupDataList === undefined && waitingGroupDataList === undefined) return <GlobalLoading />;

  return (
    <>
      {groupDataList || waitingGroupDataList ? (
        <>
          <div className="sticky top-12 w-full left-0 bg-white rounded-t-[1.25rem] overflow-hidden group-title">
            <h4 className="p-5 text-xl font-bold bg-white">나의 모임</h4>
          </div>
          <div className="px-5 pt-2">
            <div className="flex flex-col gap-y-4">
              {groupDataList && <GroupList groupDataList={groupDataList} />}
              {waitingGroupDataList && <GroupList groupDataList={waitingGroupDataList} isWaiting={true} />}
            </div>
          </div>
        </>
      ) : (
        <div className="px-5 pt-2">
          <NoGroup />
        </div>
      )}
    </>
  );
};

export default HomeGroupListSection;
