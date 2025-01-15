const CountBar = ({ value }: { value: number }) => {
  return (
    <div className="w-full mt-4 text-sm">
      총 <span className="text-primary">{value}</span>개
    </div>
  );
};

export default CountBar;
