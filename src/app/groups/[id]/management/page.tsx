import Header from '@components/common/Header';
import ManagementContents from '@app/groups/[id]/management/_components/ManagementContents';

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
    <main>
      <Header home={false} label={'관리 페이지'} />
      <ManagementContents groupId={id} />
    </main>
  );
};

export default ManagementPage;
