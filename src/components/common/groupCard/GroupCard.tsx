import Link from 'next/link';

import { Database } from '@ts/supabase';

import GroupCardContent from '@components/common/groupCard/GroupCardContent';

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
