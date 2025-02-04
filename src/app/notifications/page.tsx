import NotificationsContents from '@app/notifications/_components/NotificationsContents';
import FunnelHeader from '@components/common/FunnelHeader';

const Notification = () => {
  return (
    <div className="mx-auto max-w-[600px] h-[100dvh] overflow-y-scroll scrollbar-hide border-x border-gray-200 focus:outline-none">
      <div className="sticky w-full left-0 top-0 bg-white">
        <FunnelHeader label="알림" />
      </div>
      <NotificationsContents />
    </div>
  );
};

export default Notification;
