'use client';

import useModalStore from 'stores/useModalStore';
import ManagementCard from './ManagementCard';
import { NextArrow } from '@components/icons';

const ManageGroupProfile = () => {
  const { openModal } = useModalStore();

  return (
    <ManagementCard label={'모임 프로필 변경'} handleClick={openModal}>
      <NextArrow />
    </ManagementCard>
  );
};

export default ManageGroupProfile;
