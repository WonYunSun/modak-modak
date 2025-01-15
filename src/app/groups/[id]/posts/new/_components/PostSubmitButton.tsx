'use client';

import Button from '@components/common/Button';

interface PostSubmitButtonProps {
  disabled: boolean;
}

const PostSubmitButton = ({ disabled }: PostSubmitButtonProps) => {
  return (
    <div className="w-full fixed bottom-0 px-5 pb-2">
      <Button label="작성 완료" className="full-btn" disabled={disabled} type="submit" />
    </div>
  );
};

export default PostSubmitButton;
