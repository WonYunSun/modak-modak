'use client';

export const NoSearch = () => {
  return (
    <>
      <div className="mx-auto mt-[3.375rem] text-center justify-center">
        <h4 className="text-gray-700 pb-5 text-xl font-bold">검색 결과가 없습니다!</h4>
        <p className="text-gray-400 text-base">찾으시는 일정의 게시글이 없어요.</p>
      </div>
    </>
  );
};

export default NoSearch;
