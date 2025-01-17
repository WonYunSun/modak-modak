const Spinner = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/50">
      <div
        className="w-8 h-8 border-2 rounded-full animate-spin border-t-[#B94600] border-l-[#FFF2EB] border-r-[#FFF2EB] border-b-transparent"
        role="status"
        aria-label="Loading"
      />
    </div>
  );
};

export default Spinner;
