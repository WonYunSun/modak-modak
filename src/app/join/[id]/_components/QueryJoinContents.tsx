import Image from 'next/image';
import GroupCard, { GroupCardInfosType } from '@components/common/groupCard/GroupCard';
import useUser from '@hooks/common/useUser';

interface QueryJoinContentsProps {
  groupInfo: GroupCardInfosType;
  children: React.ReactNode;
  isWaiting?: boolean;
}

const QueryJoinContents = ({ groupInfo, children, isWaiting = false }: QueryJoinContentsProps) => {
  const { user } = useUser();
  return (
    <div className="pt-[48px] w-full h-full bg-primary-10 flex flex-col justify-end gap-9">
      {user ? (
        <div className="text-center">
          <Image
            width={120}
            height={120}
            src="/icons/hand-with-paperairplane.webp"
            alt="join-page-icon"
            className="m-auto mb-8"
          />
          <h4 className="text-gray-800 text-2xl font-bold mb-5">가입 신청을 해주세요!</h4>
          <span className="text-lg text-gray-700">
            모임에 가입하고
            <br />
            추억을 자유롭게 공유해주세요
          </span>
        </div>
      ) : (
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
      )}
      <div className="w-full h-[45vh] rounded-t-[1.25rem] bg-white flex flex-col">
        {groupInfo && (
          <div className="px-5 pt-5 flex-grow">
            <h6 className="text-gray-500 mb-3">초대된 모임</h6>
            <GroupCard groupInfo={groupInfo} hasLink={false} disabled={isWaiting} />
          </div>
        )}
        <div className="px-5 w-full pb-[12px]">{children}</div>
      </div>
    </div>
  );
};

export default QueryJoinContents;
