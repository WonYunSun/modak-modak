import Header from '@components/common/Header';
import { Copy, NextArrow } from '@components/icons';
import ManagementCard from './_components/ManagementCard';
import ManagementSection from './_components/ManagementSection';
import ToggleBox from './_components/ToggleBox';
import ManagementBtns from './_components/ManagementBtns';

interface ManagementPageProps {
  params: {
    id: string;
  };
}
const ManagementPage = ({ params }: ManagementPageProps) => {
  const { id } = params;
  //52f44a96-b8f7-4c6c-80b1-d657eafd3821 모닥모닥팀 아이디
  //1113b74a-2ec2-4f35-b044-4f42925cc076 얼그레이 연구회 아이디

  return (
    <>
      <Header home={false} label={'관리 페이지'} />
      <div className="pt-12 mb-36">
        <div className="mb-6 w-full flex flex-col gap-y-2 bg-gray-200">
          <ManagementSection title={'모임 관리'}>
            <ManagementCard label={'모임 프로필 변경'}>
              <NextArrow />
            </ManagementCard>
            <ManagementCard label={'모임 대표 양도'}>
              <NextArrow />
            </ManagementCard>
          </ManagementSection>

          <ManagementSection title={'알림 관리'}>
            <ManagementCard label={'모임방 전체 알림'}>
              <ToggleBox isChecked={false} />
            </ManagementCard>
          </ManagementSection>

          <ManagementSection title={'멤버 관리'} isLast={true}>
            <ManagementCard label={'멤버 초대링크 복사하기'}>
              <Copy />
            </ManagementCard>
            <ManagementCard label={'멤버 목록'} link={`/groups/${id}/management/members`}>
              <NextArrow />
            </ManagementCard>
          </ManagementSection>
        </div>
        <ManagementBtns/>
      </div>
    </>
  );
};

export default ManagementPage;
