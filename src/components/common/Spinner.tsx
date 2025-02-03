const Spinner = () => {
  return (
    <div
      className="w-8 h-8 border-2 rounded-full animate-spin border-t-[#B94600] border-l-[#FFF2EB] border-r-[#FFF2EB] border-b-transparent"
      role="status"
      aria-label="Loading"
    />
  );
};

export default Spinner;
