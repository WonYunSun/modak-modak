import Header from '@components/common/Header';
import Button from '@components/common/Button';
import { Plus } from '@components/icons';
import HomeContents from './_components/HomeContents';


const HomePage = () => {
  //헤더 색 변화 민후님과 대화해야 함

  return (
    <div className="bg-primary-10">
      <Header hasSetting={false} />
      <HomeContents />
      <Button label={'모임 만들기'} className={'floating-btn'} type={'button'}>
        <Plus className={'w-4 h-4'}/>
      </Button>
    </div>
  );
};

export default HomePage;
