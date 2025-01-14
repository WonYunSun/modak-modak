import Header from '@components/common/Header';
import MembersPageContents from './_components/MembersPageContents';

const MembersPage = () => {
  return (
    <>
      <Header home={false} label={'멤버 목록'} />
      <div className="pt-6 mb-36">
        <MembersPageContents/>
      </div>
    </>
  );
};

export default MembersPage;
