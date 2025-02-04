'use client';

import { ChangeEvent } from 'react';

interface PostTextAreaProps {
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
}

const PostTextArea = ({ content = '', setContent }: PostTextAreaProps) => {
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  return (
    <div className="w-full mt-5 px-5">
      <textarea
        value={content}
        onChange={handleChange}
        className="w-full h-[7.4rem] p-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-black"
        placeholder={`공유하고 싶은 추억을 자유롭게 작성해주세요.\n(최대 2000자)`}
      />
    </div>
  );
};

export default PostTextArea;
