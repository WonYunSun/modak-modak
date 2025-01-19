import Link from 'next/link';

import GroupCardContent from '@components/common/groupCard/GroupCardContent';
import { GroupsType } from '@ts/supabaseTableRowTypes';
import DisabledGroupCard from '@components/common/groupCard/DisabledGroupCard';

export interface GroupCardInfosType extends GroupsType {
  membersNum: number;
}

export interface GroupCardProps {
  groupInfo: GroupCardInfosType;
  hasLink: boolean;
  disabled?: boolean;
}

const GroupCard = ({ groupInfo, hasLink = true, disabled = false }: GroupCardProps) => {
  const { id } = groupInfo;

  return (
    <>
      {disabled ? (
        <DisabledGroupCard groupInfo={groupInfo} />
      ) : (
        <>
          {hasLink ? (
            <Link href={`/groups/${id}`}>
              <GroupCardContent groupInfo={groupInfo} hasLink={hasLink} />
            </Link>
          ) : (
            <GroupCardContent groupInfo={groupInfo} hasLink={hasLink} />
          )}
        </>
      )}
    </>
  );
};

export default GroupCard;
