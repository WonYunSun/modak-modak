import Image from 'next/image';
import Link from 'next/link';
import getNotifiedTime from '@utils/getNotifiedTime';

export type IconStyleType = 'groupImg' | 'memberImg';

type NotificationCardData = {
  notificationImgUrl: string;
  linkTo: string;
  title: string;
  body: string;
  createdAt: string;
};

interface NotificationCardProps {
  isRead: boolean;
  cardData: NotificationCardData;
  iconType: IconStyleType;
}

const ICONSTYLE = {
  groupImg: 'rounded-lg',
  memberImg: 'rounded-full',
};

const NotificationCard = ({ isRead, cardData, iconType }: NotificationCardProps) => {
  const { notificationImgUrl, linkTo, title, body, createdAt } = cardData;
  const notifiedTime = createdAt ? getNotifiedTime(createdAt) : '';

  return (
    <div className={`w-full ${isRead ? 'bg-white' : 'bg-primary-10'}`}>
      <Link href={linkTo}>
        <div className="px-5 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className={`w-[3.25rem] h-[3.25rem] ${ICONSTYLE[iconType]} overflow-hidden`}>
              <Image
                src={notificationImgUrl}
                width={100}
                height={100}
                alt={'notification_profile'}
                className={`${ICONSTYLE[iconType]} w-full h-full object-cover`}
              />
            </div>
            <div className="leading-[140%]">
              <h6 className="font-semibold mb-1">{title}</h6>
              <p className="text-sm">{body}</p>
              <p className="text-xs text-gray-500">{notifiedTime}</p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default NotificationCard;
