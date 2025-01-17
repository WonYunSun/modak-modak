import Layout from '@app/groups/[id]/schedules/_components/layout/Layout';
import GroupCard from '@components/common/groupCard/GroupCard';
import Label from '@components/common/Label';
import { GroupsType } from 'queries/home/fetchGroupInfo';

type GroupPreviewProps = {
  onNext: () => void;
  onPrev: () => void;
  prevData: GroupsType;
};

const GroupPreview = ({ onNext, onPrev, prevData }: GroupPreviewProps) => {
  return (
    <Layout isDisabled={false} onNext={onNext} onPrev={onPrev}>
      <div className="space-y-8">
        <Label htmlFor="" label="모임 미리보기" description="실제로 보여질 모임 리스트에요" />
        <GroupCard
          groupInfo={{
            ...prevData,
            membersNum: 0,
          }}
          hasLink={false}
        />
      </div>
    </Layout>
  );
};

export default GroupPreview;
