import React from 'react';
import GroupList from './GroupList';
import NoGroup from './NoGroup';

const HomeContents = () => {
  const isGroup = true;
  const GroupListBoxStyle = `h-auto pb-5 bg-white rounded-t-[1.25rem]`;
  return (
    <>
      <div className="px-5 pt-[2.625rem] pb-[2.313rem]">
        <h4 className="pb-2 text-xl font-semibold">{'ooo'}님, 안녕하세요.</h4>
        <span className="text-gray-700">소중한 추억을 공유해주실래요?</span>
      </div>
      <div className={GroupListBoxStyle}>
        {isGroup ? (
          <>
            <div className="sticky top-12 w-full left-0 bg-white rounded-t-[1.25rem] overflow-hidden">
              <h4 className="p-5 text-xl font-bold bg-white">나의 모임</h4>
            </div>
            <div className="px-5 pt-2">
              <GroupList />
            </div>
          </>
        ) : (
          <div className="px-5 pt-2">
            <NoGroup />
          </div>
        )}
      </div>
    </>
  );
};

export default HomeContents;
