// import Header from '@components/common/Header';
// import Button from '@components/common/Button';
// import { Plus } from '@components/icons';
// import HomeContents from './_components/HomeContents';

// const HomePage = () => {
//   //헤더 색 변화 아직 미구현

//   return (
//     <div className="bg-primary-10">
//       <Header hasSetting={false} home={true} />
//       <HomeContents />
//       <Button label={'모임 만들기'} className={'floating-btn'} type={'button'}>
//         <Plus className={'w-4 h-4'} active={true}/>
//       </Button>
//     </div>
//   );
// };

// export default HomePage;

'use client';

import CommentList from '@components/comment/CommentList';
import { Comments } from '@components/icons';
import { useState } from 'react';

const HomePage = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleModalOpen = () => setIsOpen(true);

  const handleModalClose = () => setIsOpen(false);

  return (
    <div>
      HomePage
      <Comments onClick={handleModalOpen} />
      <CommentList isOpen={isOpen} onClose={handleModalClose} postId="6a910701-aa04-491d-b47d-7f7d0e2713a9" />
    </div>
  );
};

export default HomePage;
