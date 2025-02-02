import Image from 'next/image';

import { NextArrow } from '@components/icons';

import { GroupCardInfosType } from '@components/common/groupCard/GroupCard';

interface GroupCardContentProps {
  groupInfo: GroupCardInfosType;
  hasLink?: boolean;
}
const GroupCardContent = ({ groupInfo, hasLink = true }: GroupCardContentProps) => {
  const { name, description, image_url, membersNum } = groupInfo;

  return (
    <div className="h-[7.938rem] bg-[#FFF] rounded-xl shadow-group-card">
      <div className="h-full flex justify-start items-center px-2 py-3 gap-[0.563rem]">
        <div className="h-24 w-24 min-w-24 bg-[#F2F2F2] rounded-xl overflow-hidden">
          <Image
            width={100}
            height={100}
            className="w-full h-full object-cover"
            src={`${image_url}`}
            alt="group_profile"
            priority={!hasLink}
          />
        </div>
        <div className="overflow-hidden w-full h-full flex flex-col justify-center py-1 gap-1">
          <div className="min-w-0 flex-auto">
            <h4 className={`${hasLink ? 'truncate' : ''} text-lg font-semibold leading-[140%]`}>{name}</h4>
            <span className={`block text-gray-600 text-[0.875rem] leading-[140%]`}>{description}</span>
          </div>
          <div className="h-[2rem] flex items-center justify-between">
            <div className="flex items-center gap-0.5">
              <span className="text-lg leading-[140%]">{membersNum}</span>
              <span className="text-gray-600 text-xs leading-[140%]">명 참여 중</span>
            </div>
            {hasLink && <NextArrow />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupCardContent;
