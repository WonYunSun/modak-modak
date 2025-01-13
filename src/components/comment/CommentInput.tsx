'use client';

import { useRef, useState } from 'react';

import Button from '@components/common/Button';

import useCommentInput from '@hooks/comment/useCommentInput';

interface CommentInputProps {
  postId: string;
}

const CommentInput = ({ postId }: CommentInputProps) => {
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  const [commentValue, setCommentValue] = useState<string>('');

  const mutation = useCommentInput(postId);

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setCommentValue(value);

    if (textAreaRef.current) {
      textAreaRef.current.style.height = 'auto';
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;

      const maxHeight = 100;
      if (textAreaRef.current.scrollHeight > maxHeight) {
        textAreaRef.current.style.height = `${maxHeight}px`;
        textAreaRef.current.style.overflow = 'auto';
      } else {
        textAreaRef.current.style.overflow = 'hidden';
      }
    }
  };

  const handleSubmit = () => {
    if (!commentValue.trim()) return;
    mutation.mutate(commentValue, {
      onSuccess: () => {
        setCommentValue('');
        if (textAreaRef.current) {
          textAreaRef.current.style.height = 'auto';
        }
      }
    });
  };

  return (
    <div className="w-[92%] bg-white absolute bottom-[5%] left-1/2 transform translate-x-[-50%] px-3 py-2 border rounded-lg h-auto flex items-center gap-2">
      <textarea
        rows={1}
        ref={textAreaRef}
        value={commentValue}
        onChange={handleInput}
        placeholder="프론트 마스터 님께 댓글 남기기.."
        className="overflow-hidden resize-none border-none outline-none max-h-[100px] w-[90%] min-h-6 h-6 text-sm"
      />
      <Button
        type="button"
        label="등록"
        onClick={handleSubmit}
        className={`w-[10%] text-sm font-semibold leading-[140%] ${
          commentValue ? '!bg-inherit text-sm !text-primary' : '!bg-inherit text-sm !text-gray-400'
        }`}
      />
    </div>
  );
};

export default CommentInput;
