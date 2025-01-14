'use client';

import Button from '@components/common/Button';
import { Plus, PlusGray } from '@components/icons';

export const PostNewForm = () => {
  const handlePhoto = () => {
    return null;
  };

  const handleSubmit = () => {
    return null;
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* 사진 추가 */}
      <div className="w-full mt-[4.5rem] px-5">
        <div className="w-[5.25rem] aspect-square bg-[#F1F1F1] flex items-center justify-center" onClick={handlePhoto}>
          <div className="flex flex-col">
            {/* + 아이콘 */}
            <PlusGray />
            <div className="text-gray-500 text-[10px] w-6 flex justify-center">0/10</div>
          </div>
        </div>
      </div>

      {/* 글쓰기 */}
      <div className="w-full mt-5 px-5">
        <textarea
          className="w-full h-60 p-[0.625rem] border border-gray-300 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-700 resize-none"
          placeholder={`공유하고 싶은 추억을 자유롭게 작성해주세요\n(최대 2000자)`}
          maxLength={2000}
        />
      </div>

      <div className="w-full h-2 bg-[#F1F1F1] mt-[3.75rem]"></div>

      <div className="w-full h-7 flex items-center px-5 my-3">
        {/* TODO: 일정 선택 화면 추가*/}
        <Plus className="w-6 h-6 mr-2" />
        <div className="flex">
          <label className="font-semibold text-base">일정 선택하기</label>
          <p className="text-[#FF3B30] ml-1">*</p>
        </div>
      </div>

      <div className="w-full fixed bottom-0 px-5 pb-2">
        <Button label="작성 완료" className="full-white-btn" disabled={true} type="submit" />
      </div>
    </form>
  );
};

export default PostNewForm;
