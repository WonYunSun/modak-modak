import Header from '@components/common/Header';
import ManagementContents from '@app/groups/[id]/management/_components/ManagementContents';

interface ManagementPageProps {
  params: {
    id: string;
  };
}
const ManagementPage = ({ params }: ManagementPageProps) => {
  const { id } = params;

  return (
    <main>
      <Header home={false} label={'관리 페이지'} />
      <ManagementContents groupId={id} />
    </main>
  );
};

export default ManagementPage;
