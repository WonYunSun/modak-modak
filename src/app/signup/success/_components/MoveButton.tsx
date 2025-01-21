'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import Button from '@components/common/Button';
import useUser from '@hooks/useUser';
import { joinGroup } from '@lib/join/joinGroup';

const MoveButton = () => {
  const { referrer, data } = Object.fromEntries(useSearchParams().entries());
  const { user } = useUser();
  const router = useRouter();

  const handleButtonClick = async () => {
    if (referrer === 'join' && user) {
      const result = await joinGroup({ groupId: data, user });
      return router.push(`/join/${data}?is_successful=${result}`);
    }
    router.push('/');
  };

  return <Button className="full-btn mb-11 mt-auto" type="button" label="바로 시작하기" onClick={handleButtonClick} />;
};

export default MoveButton;
