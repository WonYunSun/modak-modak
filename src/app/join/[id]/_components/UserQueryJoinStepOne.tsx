'use client';

import { useParams } from 'next/navigation';
import Button from '@components/common/Button';
import { useFetchGetGroup } from '@hooks/useFetchGetGroup';
import QueryJoinContents from '@app/join/[id]/_components/QueryJoinContents';

interface UserQueryJoinStepOneProps {
  onQueryJoin: () => void;
  buttonLabel: string;
  isJoinable: boolean;
}
const UserQueryJoinStepOne = ({ onQueryJoin, buttonLabel, isJoinable }: UserQueryJoinStepOneProps) => {
  const { id } = useParams();
  const groupId = Array.isArray(id) ? id[0] : id;
  const { data: groupInfo } = useFetchGetGroup(groupId);

  return (
    <>
      {groupInfo && (
        <QueryJoinContents groupInfo={groupInfo}>
          {isJoinable ? (
            <Button type="button" className="full-btn" onClick={onQueryJoin} label={buttonLabel} />
          ) : (
            <Button type="button" className="full-btn" onClick={onQueryJoin} label={buttonLabel} disabled={true} />
          )}
        </QueryJoinContents>
      )}
    </>
  );
};

export default UserQueryJoinStepOne;
