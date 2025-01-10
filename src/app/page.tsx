import Header from '@components/common/Header';
import Button from '@components/common/Button';
import { Plus } from '@components/icons';
import HomeContents from './_components/HomeContents';


const HomePage = () => {
  //헤더 색 변화 아직 미구현

  return (
    <div className="bg-primary-10">
      <Header hasSetting={false} home={true} />
      <HomeContents />
      <Button label={'모임 만들기'} className={'floating-btn'} type={'button'}>
        <Plus className={'w-4 h-4'} />
      </Button>
    </div>
  );
};

export default HomePage;
