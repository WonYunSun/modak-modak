import GroupCard from '@components/common/GroupCard';

const GroupList = () => {
  //그룹 리스트 화면에 모임 카드와 스크롤을 나타나게 하기 위해서 더미데이터를 넣어두었습니다.
  const test = {
    id: '1234',
    name: '나의 프론트 아카데미아',
    description: '한줄소개가 길어지면 말줄임표가 생겨요 ABCDEFGHIJ',
    image_url:
      'https://mblogthumb-phinf.pstatic.net/MjAxNzA2MjBfMTU4/MDAxNDk3ODg2MjUzOTI2.EbxRHMUgpGYH5rsXkNtvfG8gVXkR0prdWmefPKa4gVEg.3i5uvgyGPeCt8_2zCv5xde1FtkZw-mIdsCkP57NTszIg.PNG.alfodpwlq/2313.PNG?type=w800',
    membersNum: 7
  };
  return (
    <>
      <div className="flex flex-col gap-y-4">
        <GroupCard groupInfo={test} hasLink={true} />
        <GroupCard groupInfo={test} hasLink={true} />
        <GroupCard groupInfo={test} hasLink={true} />
        <GroupCard groupInfo={test} hasLink={true} />
        <GroupCard groupInfo={test} hasLink={true} />
        <GroupCard groupInfo={test} hasLink={true} />
        <GroupCard groupInfo={test} hasLink={true} />
      </div>
    </>
  );
};

export default GroupList;
