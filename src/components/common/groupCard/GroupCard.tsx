import Link from 'next/link';
import { Database } from '@ts/supabase';
import GroupCardContent from './GroupCardContent';

type GroupType = Database['public']['Tables']['groups']['Row'];
export interface GroupCardInfosType extends GroupType {
  membersNum: number;
}

export interface GroupCardProps {
  groupInfo: GroupCardInfosType;
  hasLink: boolean;
}

const GroupCard = ({ groupInfo, hasLink = true }: GroupCardProps) => {
  //const { id } = groupInfo;
  //todo: Link의 href는 모임방 페이지의 경로를 상의한 후 추가하기

  return (
    <>
      {hasLink ? (
        <Link href={'/'}>
          <GroupCardContent groupInfo={groupInfo} hasLink={hasLink} />
        </Link>
      ) : (
        <GroupCardContent groupInfo={groupInfo} hasLink={hasLink} />
      )}
    </>
  );
};

export default GroupCard;
