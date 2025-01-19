'use client';

import Image from 'next/image';

import { useRouter } from 'next/navigation';

import { Notification, PrevArrow, Setting } from '@components/icons';

import useHeaderStore from '@stores/useHeaderStore';

interface HeaderProps {
  home: boolean;
  label?: string;
  hasSetting?: boolean;
  isScrolled?: boolean;
}

const Header = ({ home = false, label, hasSetting, isScrolled }: HeaderProps) => {
  const router = useRouter();

  const handleNavigation = () => router.back();

  const { groupName } = useHeaderStore();

  return (
    <header
      className={`w-full sticky top-0 left-0 right-0 z-10 transition-colors ${isScrolled ? 'bg-white' : 'bg-inherit'} `}
    >
      <div className="px-5 h-12 flex items-center justify-between">
        {home ? (
          <Image src="/icons/modakLogo.webp" width={80} height={34} alt="Modak Modak Logo" className="w-20 h-10" />
        ) : (
          <div className="w-20 p-2 flex items-center justify-start">
            <PrevArrow onClick={handleNavigation} className="w-6 h-6" />
          </div>
        )}

        {label && <h3 className="text-xl font-semibold leading-[140%] text-gray-900">{label}</h3>}
        {isScrolled && groupName && (
          <h3 className="text-xl font-semibold leading-[140%] text-gray-900 overflow-hidden whitespace-nowrap text-ellipsis break-all">
            {groupName}
          </h3>
        )}

        <div className="flex items-center justify-between">
          <div className="w-10 p-2">
            <Notification className="cursor-pointer" />
          </div>
          {hasSetting && (
            <div className="w-10 p-2">
              <Setting className="cursor-pointer" />
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
