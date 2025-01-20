'use client';

import Image from 'next/image';
import { useParams } from 'next/navigation';
import Button from '@components/common/Button';
import GroupCard from '@components/common/groupCard/GroupCard';
import { useFetchGetGroup } from '@hooks/useFetchGetGroup';

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
    <div className="pt-[48px] w-full h-full bg-primary-10 flex flex-col justify-end gap-9">
      <div className="text-center">
        <Image
          width={100}
          height={100}
          src="/icons/join-hand-with-heart.webp"
          alt="join-page-icon"
          className="m-auto mb-8"
        />
        <h4 className="text-gray-800 text-2xl font-bold mb-5">모임에 초대되셨어요!</h4>
        <span className="text-lg text-gray-700">
          모임에 가입하고
          <br />
          추억을 자유롭게 공유해주세요
        </span>
      </div>
      <div className="w-full h-[45vh] rounded-t-[1.25rem] bg-white">
        {groupInfo && (
          <div className="px-5 pt-5">
            <h6 className="text-gray-500 mb-3">초대된 모임</h6> <GroupCard groupInfo={groupInfo} hasLink={false} />
          </div>
        )}
        <div className="px-5 w-full absolute bottom-0">
          {isJoinable ? (
            <Button type="button" className="full-btn" onClick={onQueryJoin} label={buttonLabel} />
          ) : (
            <Button type="button" className="full-btn" onClick={onQueryJoin} label={buttonLabel} disabled={true} />
          )}
        </div>
      </div>
    </div>
  );
};

export default UserQueryJoinStepOne;
