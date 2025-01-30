import Image from 'next/image';

type NotificationCardData = {
  imgUrl: string;
  title: string;
  body: string;
};
interface NotificationCardProps {
  isRead: boolean;
  cardData: NotificationCardData;
}

const NotificationCard = ({ isRead, cardData }: NotificationCardProps) => {
    const { imgUrl, title, body } = cardData;
  return (
    <div className={`w-full ${isRead ? 'bg-gray-50' : 'bg-white'}`}>
      <div className="px-5 h-16 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="w-9 h-9 rounded-full overflow-hidden">
            <Image
              src={imgUrl}
              width={36}
              height={36}
              alt={'notification_profile'}
              className="rounded-full w-full h-full object-cover"
            />
          </div>
          <div>
            <h6 className="font-semibold">{title}</h6>
            <span className="text-sm">{body}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationCard;
