'use client';

import { useEffect } from 'react';
import NotificationCard from '@app/notifications/_components/NotificationCard';
import SpinnerContainer from '@components/common/SpinnerContainer';
import useFetchNotifications from '@hooks/notifications/useFetchNotifications';
import useReadNotifications from '@hooks/notifications/useReadNotifications';
import { NotificationCardDataType } from '@queries/notifications/fetchNotifications';

const NotificationsContents = () => {
  const { data: notificationData, isPending, isError } = useFetchNotifications();
  const readNotification = useReadNotifications();

  useEffect(() => {
    return () => {
      if (notificationData?.unRead) {
        const unReadNotifications = notificationData.unRead as NotificationCardDataType[];
        readNotification(unReadNotifications);
      }
    };
  }, []);

  return (
    <div className="mb-5 mt-3">
      {notificationData === undefined && <SpinnerContainer />}
      {!(isPending || isError) && notificationData && (
        <div className="border-b border-gray-200 mb-36">
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
        </div>
      )}
    </div>
  );
};

export default NotificationsContents;
