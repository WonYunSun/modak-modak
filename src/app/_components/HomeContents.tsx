import React from 'react';
import GroupList from './GroupList';
import NoGroup from './NoGroup';

const HomeContents = () => {
  const isGroup = true;
  return (
    <>
      <div className="px-5 pt-[2.625rem] pb-[2.313rem]">
        <h4 className="pb-2 text-xl font-semibold">{'ooo'}님, 안녕하세요.</h4>
        <span className="text-gray-700">소중한 추억을 공유해주실래요?</span>
      </div>
      <div className="bg-white rounded-t-[1.25rem] overflow-hidden">
        <div className="p-5">{isGroup ? <GroupList /> : <NoGroup />}</div>
      </div>
    </>
  );
};

export default HomeContents;
