'use client';

import GroupList from '@app/_components/GroupList';
import NoGroup from '@app/_components/NoGroup';
import useFetchGroupList from '@hooks/home/useFetchGroupList';

const HomeGroupListSection = () => {
  const { data: groupDataList } = useFetchGroupList();

  return (
    <>
      {groupDataList !== undefined && (
        <>
          {groupDataList ? (
            <GroupList groupDataList={groupDataList} />
          ) : (
            <div className="px-5 pt-2">
              <NoGroup />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default HomeGroupListSection;
