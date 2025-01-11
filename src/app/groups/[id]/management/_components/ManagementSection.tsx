import React from 'react'

interface ManagementSectionProps {
    title: string;
    children: React.ReactNode
}
const ManagementSection = ({ title, children }: ManagementSectionProps) => {
  return (
    <div className='py-5 bg-white'>
      <h4 className='pl-5 py-3 text-gray-900 font-bold'>{title}</h4>
      {children}
    </div>
  );
};

export default ManagementSection