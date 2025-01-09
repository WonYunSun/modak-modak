import Link from 'next/link';
import { Database } from '@ts/supabase';

type GroupType = Database['public']['Tables']['groups']['Row'];
interface GroupCardInfos extends Omit<GroupType, 'created_at'> {
  membersNum: number;
}
interface GroupCardProps {
  groupInfo: GroupCardInfos;
  hasLink: boolean;
}

const GroupCard = ({ groupInfo, hasLink=true }: GroupCardProps) => {
  const { /*id,*/ name, description, image_url, membersNum } = groupInfo;
  //todo: Link의 href는 모임방 페이지의 경로를 상의한 후 추가하기
  return (
    <div className="bg-[#FFF] rounded-[0.75rem] shadow-group_card">
      <div className="flex justify-start p-[0.5rem] gap-[0.563rem]">
        <div className="h-[6rem] w-[6rem] min-w-[6rem] bg-[#F2F2F2] rounded-[0.75rem] overflow-hidden">
          <img className="w-full h-full" src={`${image_url}`} alt="group_profile" />
        </div>
        <div className="overflow-hidden w-full flex flex-col justify-center p-[0.25rem 0rem] gap-[0.25rem]">
          <div className="min-w-0 flex-auto">
            <h4 className="truncate text-lg font-semibold leading-[140%]">{name}</h4>
            <span className="block truncate text-gray-600 text-[0.875rem] leading-[140%]">{description}</span>
          </div>
          <div className="h-[2rem] flex items-center justify-between">
            <div className="flex items-center gap-[0.125rem]">
              <span className="text-lg leading-[140%]">{membersNum}</span>
              <span className="text-gray-600 text-[0.75rem] leading-[140%]">명 참여 중</span>
            </div>
            {hasLink && (
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupCard;

/*
  const test = {
    id: '1234',
    name: '나의 프론트 아카데미아',
    description: '한줄소개가 길어지면 말줄임표가 생겨요 ABCDEFGHIJ',
    image_url:
      'https://mblogthumb-phinf.pstatic.net/MjAxNzA2MjBfMTU4/MDAxNDk3ODg2MjUzOTI2.EbxRHMUgpGYH5rsXkNtvfG8gVXkR0prdWmefPKa4gVEg.3i5uvgyGPeCt8_2zCv5xde1FtkZw-mIdsCkP57NTszIg.PNG.alfodpwlq/2313.PNG?type=w800',
    membersNum: 7
  };

  <GroupCard groupInfo={test} hasLink={true} />;
*/