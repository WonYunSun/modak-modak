'use client';

import Link from 'next/link';
import Image from 'next/image';
import useNavStore from 'stores/useNavStore';
import { Home, Chat, User } from '@components/icons';

const buttons = [
  {
    id: 'home',
    label: '홈',
    iconOff: <Home className="w-6 h-6" active={false} />,
    iconOn: <Home className="w-6 h-6" active={true} />,
    href: '/'
  },
  {
    id: 'chat',
    label: '채팅',
    iconOff: <Chat className="w-6 h-6" active={false} />,
    iconOn: <Chat className="w-6 h-6" active={true} />,
    href: '/chat'
  },
  {
    id: 'mypage',
    label: '마이페이지',
    iconOff: <User className="w-6 h-6" active={false} />,
    iconOn: <User className="w-6 h-6" active={true} />,
    href: '/mypage'
  }
];

const BottomNav = () => {
  const { activeButton, setActiveButton } = useNavStore();

  console.log('activeButton', activeButton);

  return (
    <div className="fixed bottom-0 left-0 w-full h-16 bg-white flex shadow-[0px_-4px_4px_0px_rgba(0,0,0,0.1)] z-30">
      {buttons.map((button) => (
        <Link href={button.href} key={button.id} className="flex-1 flex justify-center items-center">
          <button className="flex flex-col justify-end items-center" onClick={() => setActiveButton(button.id)}>
            {activeButton === button.id ? button.iconOn : button.iconOff}
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
