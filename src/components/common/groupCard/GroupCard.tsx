import Link from 'next/link';
import GroupCardContent from './GroupCardContent';
import { Database } from '@ts/supabase';

type GroupType = Database['public']['Tables']['groups']['Row'];
export interface GroupCardInfosType extends GroupType {
  membersNum: number;
}

export interface GroupCardProps {
  groupInfo: GroupCardInfosType;
  hasLink: boolean;
}

const GroupCard = ({ groupInfo, hasLink = true }: GroupCardProps) => {
  const { id } = groupInfo;

  return (
    <>
      {hasLink ? (
        <Link href={`/groups/${id}`}>
          <GroupCardContent groupInfo={groupInfo} hasLink={hasLink} />
        </Link>
      ) : (
        <GroupCardContent groupInfo={groupInfo} hasLink={hasLink} />
      )}
    </>
  );
};

export default GroupCard;
