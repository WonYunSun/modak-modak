'use client';

import { useParams, useRouter } from 'next/navigation';
import Button from '@components/common/Button';
import GroupCard from '@components/common/groupCard/GroupCard';
import { useFetchGetGroup } from '@hooks/useFetchGetGroup';

import Image from 'next/image';

const NonUserQueryJoin = () => {
  const router = useRouter();
  const { id } = useParams();
  const groupId = Array.isArray(id) ? id[0] : id;
  const onQueryJoin = async () => {
    router.push(`/login?referrer=join&data=${groupId}`);
  };

  return (
    <>
      <div className="w-full h-full bg-primary-10 flex flex-col justify-center gap-9">
        <div className="text-center">
          <h4 className="text-gray-800 text-2xl font-bold mb-5">모임에 초대되셨어요!</h4>
          <span className="block text-lg text-gray-700 mb-11">
            모임에 가입하고
            <br />
            추억을 자유롭게 공유해주세요
          </span>
          <Image
            width={168}
            height={168}
            src="/icons/join-hand-with-heart.webp"
            alt="join-page-icon"
            className="m-auto"
          />
        </div>
        <div className="px-5 w-full absolute bottom-0">
          <Button type="button" className="full-btn" onClick={onQueryJoin} label="로그인하고 모임 가입하기" />
        </div>
      </div>
    </>
  );
};

export default NonUserQueryJoin;
