"use client"

import Link from 'next/link';

interface ManagementCardProps {
  label: string;
  children: React.ReactNode;
  link?: string | null;
  handleClick?: () => void;
}
const ManagementCard = ({ label, children, link = null, handleClick = () => {} }: ManagementCardProps) => {
  return (
    <>
      {link ? (
        <Link href="/">
          <div className="w-full" onClick={handleClick}>
            <div className="px-5 h-14 flex items-center justify-between">
              <span>{label}</span> {children}
            </div>
          </div>
        </Link>
      ) : (
        <div className="w-full" onClick={handleClick}>
          <div className="px-5 h-14 flex items-center justify-between">
            <span>{label}</span> {children}
          </div>
        </div>
      )}
    </>
  );
};

export default ManagementCard;
