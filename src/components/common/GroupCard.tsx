import Link from 'next/link';
import { Database } from '@ts/supabase';

type GroupType = Database['public']['Tables']['groups']['Row'];
interface GroupCardProps extends GroupType {
  membersNum: number;
}

const GroupCard = ({ id, name, description, image_url, membersNum }: GroupCardProps) => {
  //todo: Link의 href는 모임방 페이지의 경로를 상의한 후 추가하기
  //todo: 이미지 규격 맞추는 방식 디자이너님과 상의하기
  return (
    <div className="bg-[#FFF] rounded-[12px] shadow-group_card">
      <div className="flex justify-around p-[0.5rem] gap-[0.563rem]">
        <div className="h-[6rem] w-[6rem] bg-[#F2F2F2] rounded-[12px]">
          <img className="w-full h-full" src={`${image_url}`} alt="group_profile" />
        </div>
        <div className="overflow-hidden flex flex-col justify-center p-[0.25rem 0rem] gap-[0.25rem]">
          <div className="min-w-0 flex-auto">
            <h4 className="truncate text-lg font-semibold leading-[140%]">{name}</h4>
            <span className="block truncate text-gray-600 text-[0.875rem] leading-[140%]">{description}</span>
          </div>
          <div className="h-[2rem] flex items-center justify-between">
            <div className="flex items-center gap-[2px]">
              <span className="text-lg leading-[140%]">{membersNum}</span>
              <span className="text-gray-600 text-[0.75rem] leading-[140%]">명 참여 중</span>
            </div>
            <Link href={'/'}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M10 18L15.2929 12.7071C15.6834 12.3166 15.6834 11.6834 15.2929 11.2929L10 6"
                  stroke="#A1A1AA"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupCard;

/**/
