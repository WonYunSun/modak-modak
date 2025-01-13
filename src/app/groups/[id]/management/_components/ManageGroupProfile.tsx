'use client';
//안 쓰게 될지도...?
import ManagementCard from './ManagementCard';
import { NextArrow } from '@components/icons';
import { ModalModeType } from './ManagementContents';

interface ManageGroupProfileProps {
  handleOpenModal : (mode: ModalModeType)=>void;
}
const ManageGroupProfile = ({ handleOpenModal }: ManageGroupProfileProps) => {

  return (
    <ManagementCard label={'모임 프로필 변경'} handleClick={()=>{handleOpenModal('changeProfile');}}>
      <NextArrow />
    </ManagementCard>
  );
};

export default ManageGroupProfile;
