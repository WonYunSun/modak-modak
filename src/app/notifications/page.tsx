import NotificationsContents from '@app/notifications/_components/NotificationsContents';
import FunnelHeader from '@components/common/FunnelHeader';

const Notification = () => {
  return (
    <div className="mx-auto max-w-[600px] h-screen overflow-y-scroll scrollbar-hide">
      <div className="sticky w-[600px] left-0 top-0 bg-white">
        <FunnelHeader label="알림" />
      </div>
      <NotificationsContents/>
    </div>
  );
};

export default Notification;
