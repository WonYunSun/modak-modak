'use client';

import NotificationCard from '@app/notifications/_components/NotificationCard';
import SpinnerContainer from '@components/common/SpinnerContainer';
import useFetchNotifications from '@hooks/notifications/useFetchNotifications';

const NotificationsContents = () => {
  const { data: notificationData, isPending, isError } = useFetchNotifications();

  return (
    <div className="border-b border-gray-200 mb-5 mt-3 mb-36">
      {notificationData === undefined && <SpinnerContainer/>}
      {!(isPending || isError) && notificationData && (
        <>
          <div className="divide-y divide-gray-200">
            {notificationData.unRead.map((data) => {
              if (!data) return null;
              const { isRead, iconStyle, config } = data;
              return <NotificationCard key={data.id} isRead={isRead} cardData={config} iconType={iconStyle} />;
            })}
          </div>
          <div className="divide-y divide-gray-200">
            {notificationData.alreadyRead.map((data) => {
              if (!data) return null;
              const { isRead, iconStyle, config } = data;
              return <NotificationCard key={data.id} isRead={isRead} cardData={config} iconType={iconStyle} />;
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default NotificationsContents;
