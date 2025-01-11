'use client';

import Link from 'next/link';

interface ManagementCardProps {
  children: React.ReactNode;
  label: string;
  link?: string | null;
  handleClick?: () => void;
}
const ManagementCard = ({ children, label, link = null, handleClick = () => {} }: ManagementCardProps) => {
  return (
    <>
      {link ? (
        <Link href="/">
          <div className={`w-full`} onClick={handleClick}>
            <div className="px-5 h-14 flex items-center justify-between">
              <span>{label}</span> {children}
            </div>
          </div>
        </Link>
      ) : (
        <div className={`w-full`} onClick={handleClick}>
          <div className="px-5 h-14 flex items-center justify-between">
            <span>{label}</span> {children}
          </div>
        </div>
      )}
    </>
  );
};

export default ManagementCard;
