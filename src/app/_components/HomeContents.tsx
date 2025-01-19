import { forwardRef } from 'react';

import GroupList from '@app/_components/GroupList';
import NoGroup from '@app/_components/NoGroup';
import HomeTitle from '@app/_components/HomeTitle';

const HomeContents = forwardRef<HTMLDivElement>((_, ref) => {
  const isGroup = true;
  const GroupListBoxStyle = `h-auto pb-[5.25rem] bg-white rounded-t-[1.25rem]`;

  return (
    <>
      <div className="px-5 pt-[2.625rem] pb-[2.313rem] min-h-[8.7rem]">
        <HomeTitle />
      </div>
      <div ref={ref} />
      <div className={GroupListBoxStyle}>
        {isGroup ? (
          <>
            <div className="sticky top-12 w-full left-0 bg-white rounded-t-[1.25rem] overflow-hidden group-title">
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
});

HomeContents.displayName = 'HomeContents';

export default HomeContents;
