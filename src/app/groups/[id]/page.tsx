import GroupSection from '@app/groups/[id]/_components/GroupSection';

const GroupPage = () => {
  return (
    <div className="max-w-[600px] h-screen m-auto overflow-y-scroll scrollbar-hide border-x border-gray-200">
      <GroupSection />
    </div>
  );
};

export default GroupPage;
