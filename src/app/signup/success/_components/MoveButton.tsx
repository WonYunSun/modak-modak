'use client';

import { useRouter } from 'next/navigation';
import Button from '@components/common/Button';

const MoveButton = () => {
  const router = useRouter();

  const handleButtonClick = async () => {
    router.push('/');
  };

  return <Button className="full-btn mb-11 mt-auto" type="button" label="바로 시작하기" onClick={handleButtonClick} />;
};

export default MoveButton;
