'use client';

interface PostTextAreaProps {
  text: string;
  setText: (text: string) => void;
}

const PostTextArea = ({ text, setText }: PostTextAreaProps) => {
  return (
    <div className="w-full mt-5 px-5">
      <textarea
        className="w-full h-60 p-3 border border-gray-300 rounded-lg"
        placeholder="공유하고 싶은 추억을 작성해주세요."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    </div>
  );
};

export default PostTextArea;
