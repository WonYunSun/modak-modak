import Header from '@components/common/Header';
import TabPages from './_components/TabPages';
import { GroupCardSection } from './_components/GroupCardSection';

const GroupPage = () => {

  return (
    <div className="w-full">
      {/* 헤더 영역 */}
      <div className="w-full fixed top-0 left-0 z-30">
        <Header home={false} hasSetting={true} />
      </div>
      <div className="w-full h-[6.5rem] bg-primary-10"></div>

      <GroupCardSection />

      {/* 탭 화면 */}
      <TabPages />
    </div>
  );
};

export default GroupPage;
