'use client';

import { useParams, useRouter } from 'next/navigation';

import { HasNotification, Logo, Notification, PrevArrow, Setting } from '@components/icons';

import useHeaderStore from '@stores/useHeaderStore';
import useFetchNotifications from '@hooks/notifications/useFetchNotifications';

interface HeaderProps {
  home: boolean;
  label?: string;
  hasSetting?: boolean;
  isScrolled?: boolean;
}

const Header = ({ home = false, label, hasSetting, isScrolled }: HeaderProps) => {
  const router = useRouter();
  const { data: notificationsData } = useFetchNotifications();

  const { id } = useParams();
  const groupId = Array.isArray(id) ? id[0] : id;

  const { groupName } = useHeaderStore();

  const handleNavigation = () => router.push('/');

  const handleGroupManagement = (groupId: string) => {
    router.push(`/groups/${groupId}/management`);
  };

  const handleNotifications = () => {
    router.push(`/notifications`);
  };

  return (
    <header
      className={`m-auto w-full max-w-[600px] h-12 sticky top-0 left-0 right-0 z-10 transition-colors ${isScrolled ? 'bg-white' : 'bg-primary-10'} ${hasSetting && 'border-x boreder-gray-200'} `}
    >
      <div className="px-5 h-12 flex items-center justify-between">
        {home ? (
          <Logo className="w-20 h-10" />
        ) : (
          <div className={`w-10 h-10 ${hasSetting && 'mr-10'} flex items-center justify-start cursor-pointer pl-2`}>
            <PrevArrow onClick={handleNavigation} />
          </div>
        )}

        {label && <h3 className="text-xl font-semibold leading-[140%] text-gray-900">{label}</h3>}
        {isScrolled && groupName && (
          <h3 className="text-xl font-semibold leading-[140%] text-gray-900 overflow-hidden whitespace-nowrap text-ellipsis break-all">
            {groupName}
          </h3>
        )}

        <div className="flex items-center justify-between">
          <div className="w-10 p-2" onClick={handleNotifications}>
            {notificationsData !== undefined && (
              <>
                {notificationsData === null || notificationsData?.unRead.length ? (
                  <HasNotification className="cursor-pointer" />
                ) : (
                  <Notification className="cursor-pointer" />
                )}
              </>
            )}
          </div>
          {hasSetting && (
            <div className="w-10 p-2" onClick={() => handleGroupManagement(groupId)}>
              <Setting className="cursor-pointer" />
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
