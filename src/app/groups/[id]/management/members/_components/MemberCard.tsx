import Image from 'next/image';
import { Menu } from '@components/icons';

interface MemberCardBtnsProps {
  isLeader: boolean;
  mode: 'curMembers' | 'waiting';
}
const MemberCardLeaderBtns = ({ isLeader, mode }: MemberCardBtnsProps) => {
  return (
    <>
      {mode === 'curMembers' ? (
        isLeader ? (
          <span className="text-primary">대표</span>
        ) : (
          <Menu />
        )
      ) : (
        <div>
          <button type="button">수락</button>
          <button type="button" className="ml-4 px-2.5 py-[0.438rem] bg-[#3B82F6] rounded-lg text-white font-semibold">
            거절
          </button>
        </div>
      )}
    </>
  );
};

const MemberCardStandardBtns = ({ isLeader, mode }: MemberCardBtnsProps) => {
  return <>{mode === 'curMembers' && isLeader && <span className="text-primary">대표</span>}</>;
};

interface MemberCardProps {
  isLeader: boolean;
  isMe?: boolean;
  mode: 'curMembers' | 'waiting';
}
const MemberCard = ({ isLeader, isMe = false, mode }: MemberCardProps) => {
  const isLeaderUser = true;
  
  const profile =
    'https://sozcwgcoibigujehjxbf.supabase.co/storage/v1/object/public/profiles/users/ebcc66fe-bf21-4b73-99d1-e4f375025b80/winterhotchocolate.jpg';
  const name = '이름이에요';

  return (
    <div className="w-full border-b border-gray-200">
      <div className="px-5 h-16 flex bg-gray-100 justify-between items-center">
        <div className="flex gap-4">
          <div className="w-8 h-8 rounded-[50%] overflow-hidden">
            <Image src={profile} width={100} height={100} alt={'member_profile'} />
          </div>
          <span className="flex items-center gap-1">
            {name} {isMe && <span className="text-gray-500 text-sm">{'(나)'}</span>}
          </span>
        </div>
        {isLeaderUser ? (
          <MemberCardLeaderBtns isLeader={isLeader} mode={mode} />
        ) : (
          <MemberCardStandardBtns isLeader={isLeader} mode={mode} />
        )}
      </div>
    </div>
  );
};

export default MemberCard;
