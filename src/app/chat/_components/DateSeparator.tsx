interface DateSeparatorProps {
  date: string;
}

const DateSeparator = ({ date }: DateSeparatorProps) => {
  return (
    <div className="flex items-center justify-center mb-4 mt-5">
      <div className="px-2 py-1 rounded-[20px] bg-gray-100">
        <span className="text-xs font-normal leading-[140%] text-gray-700">
          {new Date(date).toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </span>
      </div>
    </div>
  );
};
export default DateSeparator;
