import FunnelHeader from '@components/common/FunnelHeader';

import ManagementContents from '@app/groups/[id]/management/_components/ManagementContents';

interface ManagementPageProps {
  params: {
    id: string;
  };
}
const ManagementPage = ({ params }: ManagementPageProps) => {
  const { id } = params;

  return (
    <div className="mx-auto max-w-[600px] h-[100dvh] overflow-y-scroll scrollbar-hide">
      <div className="h-full border-x border-gray-200">
        <FunnelHeader label={'관리 페이지'} />
        <ManagementContents groupId={id} />
      </div>
    </div>
  );
};

export default ManagementPage;
