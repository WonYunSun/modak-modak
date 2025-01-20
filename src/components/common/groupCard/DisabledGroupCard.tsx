import { GroupCardInfosType } from '@components/common/groupCard/GroupCard';
import GroupCardContent from '@components/common/groupCard/GroupCardContent';

interface GroupCardContentProps {
  groupInfo: GroupCardInfosType;
}
const DisabledGroupCard = ({ groupInfo }: GroupCardContentProps) => {
  return (
    <div className="relative flex items-center justify-center rounded-xl overflow-hidden">
      <p className="font-bold text-gray-900 text-2xl absolute">대기 중</p>
      <div className="w-full h-full absolute bg-gray-900 z-10 opacity-20"></div>
      <div className="w-full opacity-25">
        <GroupCardContent groupInfo={groupInfo} />
      </div>
    </div>
  );
};

export default DisabledGroupCard;
