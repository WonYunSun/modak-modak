interface CountBarProps {
  postsCount: number | undefined;
}

const CountBar = ({ postsCount }: CountBarProps) => {
  return (
    <div className="w-full mt-4 text-sm">
      총 <span className="text-primary"> {postsCount}</span>개
    </div>
  );
};

export default CountBar;
