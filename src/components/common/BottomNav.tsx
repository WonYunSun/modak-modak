'use client';

import Link from 'next/link';
import Image from 'next/image';
import useNavStore from 'stores/useNavStore';

const buttons = [
  { id: 'home', label: '홈', iconOff: '/icons/Icon_home_off.png', iconOn: '/icons/Icon_home_on.png', href: '/' },
  { id: 'chat', label: '채팅', iconOff: '/icons/Icon_chat_off.png', iconOn: '/icons/Icon_chat_on.png', href: '/chat' },
  {
    id: 'mypage',
    label: '마이페이지',
    iconOff: '/icons/Icon_mypage_off.png',
    iconOn: '/icons/Icon_mypage_on.png',
    href: '/mypage'
  }
];

const BottomNav = () => {
  const { activeButton, setActiveButton } = useNavStore();

  return (
    <div className="fixed bottom-0 left-0 w-full h-16 bg-white flex shadow-md z-30">
      {buttons.map((button) => (
        <Link href={button.href} key={button.id} className="flex-1 flex justify-center items-center">
          <button className="flex flex-col justify-end items-center" onClick={() => setActiveButton(button.id)}>
            <Image
              src={activeButton === button.id ? button.iconOn : button.iconOff}
              alt={button.label}
              width={activeButton === button.id ? 64 : 24}
              height={activeButton === button.id ? 32 : 24}
              className={activeButton === button.id ? 'mb-1' : 'mb-2 mt-1'}
            />
            <div className={`text-sm ${activeButton === button.id ? 'text-primary' : 'text-gray-500'}`}>
              {button.label}
            </div>
          </button>
        </Link>
      ))}
    </div>
  );
};

export default BottomNav;
