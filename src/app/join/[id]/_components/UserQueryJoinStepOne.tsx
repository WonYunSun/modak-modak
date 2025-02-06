'use client';

import { useParams, useRouter } from 'next/navigation';
import Button from '@components/common/Button';
import QueryJoinContents from '@app/join/[id]/_components/QueryJoinContents';
import { useFetchGetGroup } from '@hooks/common/useFetchGetGroup';

interface UserQueryJoinStepOneProps {
  onQueryJoin: () => void;
  buttonLabel: string;
  isJoinable: boolean;
  joinState: string;
}
const UserQueryJoinStepOne = ({ onQueryJoin, buttonLabel, isJoinable, joinState }: UserQueryJoinStepOneProps) => {
  const { id } = useParams();
  const groupId = Array.isArray(id) ? id[0] : id;
  const { data: groupInfo } = useFetchGetGroup(groupId);
  const router = useRouter();

  const handleGoHome = () => {
    router.push('/'); // 홈으로 이동
  };

  return (
    <div className="flex-grow">
      {groupInfo && (
        <QueryJoinContents groupInfo={groupInfo} isWaiting={joinState === 'waiting'}>
          {isJoinable ? (
            <Button type="button" className="full-btn" onClick={onQueryJoin} label={buttonLabel} />
          ) : (
            <div>
              <p className="text-center mb-2 text-primary">{buttonLabel}</p>
              <Button type="button" className="full-btn" onClick={handleGoHome} label={'홈으로 바로가기'} />
            </div>
          )}
        </QueryJoinContents>
      )}
    </div>
  );
};

export default UserQueryJoinStepOne;
