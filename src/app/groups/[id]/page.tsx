import GroupCard from '@components/common/groupCard/GroupCard';
import Header from '@components/common/Header';
import TabPages from './_components/TabPages';

const GroupPage = () => {
  return (
    <div className="w-full">
      {/* 헤더 영역 */}
      <div className="w-full fixed top-0 left-0 z-30">
        <Header home={false} hasSetting={true} />
      </div>
      <div className="w-full h-[6.5rem] bg-primary-10"></div>

      <div className="w-full px-5 -mt-[2.75rem] z-10">
        <GroupCard
          groupInfo={{
            created_at: '',
            id: '123',
            name: '모각코!',
            description: '안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요',
            image_url: '/',
            membersNum: 7
          }}
          hasLink={false}
        />
      </div>

      {/* 탭 화면 */}
      <TabPages />
    </div>
  );
};

export default GroupPage;
