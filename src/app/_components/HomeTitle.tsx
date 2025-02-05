'use client';

import useUser from '@hooks/common/useUser';

const HomeTitle = () => {
  const { user } = useUser();

  return (
    <>
      {user && (
        <>
          <h4 className="pb-2 text-xl font-semibold">{user.user_metadata.nickname}님, 안녕하세요.</h4>
          <span className="text-gray-700">소중한 추억을 공유해주실래요?</span>
        </>
      )}
    </>
  );
};

export default HomeTitle;
