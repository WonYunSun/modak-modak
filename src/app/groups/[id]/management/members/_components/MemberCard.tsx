import { Menu } from '@components/icons';
import Image from 'next/image';
import React from 'react';

interface MemberCardProps {
  isLeader: boolean;
  isMe?: boolean;
  mode: 'curMembers' | 'waiting'
}
const MemberCard = ({ isLeader, isMe=false, mode }: MemberCardProps) => {
    const profile = "https://sozcwgcoibigujehjxbf.supabase.co/storage/v1/object/public/profiles/users/ebcc66fe-bf21-4b73-99d1-e4f375025b80/winterhotchocolate.jpg";
    
  return (
    <div className="w-full border-b border-gray-200">
      <div className="px-5 h-16 flex bg-gray-100 justify-between items-center">
        <div className="flex gap-4">
          <div className="w-8 h-8 rounded-[50%] overflow-hidden">
            <Image src={profile} width={100} height={100} alt={'member_profile'} />
          </div>
          <span className="align-middle">
            이름이에요 {isMe && <span className="text-gray-500 text-sm">{'(나)'}</span>}
          </span>
        </div>
        {mode==='curMembers' && isLeader ? <span className="text-primary">대표</span> : <Menu />}
      </div>
    </div>
  );
};

export default MemberCard;
