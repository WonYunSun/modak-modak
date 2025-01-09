'use client';

import { useRouter } from 'next/navigation';

import { Notification, PrevArrow, Setting } from '@components/icons';

interface HeaderProps {
  home: boolean;
  label?: string;
  hasSetting?: boolean;
}

const Header = ({ home = false, label, hasSetting }: HeaderProps) => {
  const router = useRouter();

  const handleNavigation = () => router.back();

  return (
    <header>
      <div className="w-full h-12 flex items-center justify-between">
        {home ? <img src="" alt="Modak Modak Logo" className="w-20 h-10" /> : <PrevArrow onClick={handleNavigation} />}

        {label && <h3 className="text-xl font-semibold leading-[140%] text-gray-900">{label}</h3>}

        <div className="flex items-center justify-between gap-[10px] p-[10px]">
          <Notification className="cursor-pointer" />
          {hasSetting && <Setting className="cursor-pointer" />}
        </div>
      </div>
    </header>
  );
};

export default Header;
