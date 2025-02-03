'use client';

import { useRouter } from 'next/navigation';

import { PrevArrow } from '@components/icons';

interface FunnelHeaderProps {
  label: string;
}

const FunnelHeader = ({ label = '' }: FunnelHeaderProps) => {
  const router = useRouter();

  const handleNaivation = () => router.back();

  return (
    <header>
      <div className="relative w-full max-w-[600px] mx-auto h-12 flex items-center justify-center bg-white border-x border-gray-200">
        <PrevArrow
          onClick={handleNaivation}
          className="absolute w-6 h-6 top-[50%] transform translate-y-[-50%] left-5 cursor-pointer"
        />
        <h3 className="text-center text-xl font-semibold leading-[140%]">{label}</h3>
      </div>
    </header>
  );
};

export default FunnelHeader;
