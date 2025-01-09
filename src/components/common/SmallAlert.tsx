'use client';

type SmallAlertProps = {
  children: React.ReactNode;
  show: boolean;
};

const SmallAlert = ({ children, show }: SmallAlertProps) => {
  if (!show) return null;
  return (
    <div className="w-full flex justify-center items-center fixed bottom-[6rem]">
      <div className="animate-fade-up animate-once animate-duration-450 bg-black text-white py-2 px-4 rounded-[0.75rem]">
        <div className="flex items-center gap-1">{children}</div>
      </div>
    </div>
  );
};

export default SmallAlert;
