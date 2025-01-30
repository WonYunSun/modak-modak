import NotificationCard from '@app/notification/_components/NotificationCard';
import FunnelHeader from '@components/common/FunnelHeader';

const SAMPLETEXT = {
  imgUrl:
    'https://sozcwgcoibigujehjxbf.supabase.co/storage/v1/object/public/profiles/groups/a4724b36-a096-47b8-8b71-6bef455ae4db',
  title: '일정이 등록되었습니다.',
  body: '자세한 내용은 일정 페이지에서 확인해주세요.',
};

const Notification = () => {
  return (
    <div className="mx-auto max-w-[600px] h-screen overflow-y-scroll scrollbar-hide">
      <div className="sticky w-[600px] left-0 top-0 bg-white">
        <FunnelHeader label="알림" />
      </div>
      <div className="border-b border-gray-200 mb-5 mt-3">
        <div className="px-5 py-3 flex items-center gap-2 font-semibold">
          <h6 className="text-lg">안 읽은 알림</h6>
          <span className="text-primary">0</span>
        </div>
        <div className="divide-y divide-gray-200">
          <NotificationCard isRead={false} cardData={SAMPLETEXT} />
          <NotificationCard isRead={false} cardData={SAMPLETEXT} />
          <NotificationCard isRead={false} cardData={SAMPLETEXT} />
        </div>
      </div>

      <div className="border-b border-gray-200 mb-36">
        <h6 className="px-5 py-3 font-semibold text-lg">전체</h6>
        <div className="divide-y divide-gray-200">
          <NotificationCard isRead={true} cardData={SAMPLETEXT} />
          <NotificationCard isRead={true} cardData={SAMPLETEXT} />
          <NotificationCard isRead={true} cardData={SAMPLETEXT} />
          <NotificationCard isRead={true} cardData={SAMPLETEXT} />
          <NotificationCard isRead={true} cardData={SAMPLETEXT} />
          <NotificationCard isRead={true} cardData={SAMPLETEXT} />
          <NotificationCard isRead={true} cardData={SAMPLETEXT} />
          <NotificationCard isRead={true} cardData={SAMPLETEXT} />
        </div>
      </div>
    </div>
  );
};

export default Notification;
