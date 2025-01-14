'use client';

import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import OnboardingContent from './OnboardingContent';
import 'swiper/css';
import useDotIndicator from '@hooks/useDotIndicator';

const Onboarding = () => {
  const { DotIndicator, move } = useDotIndicator({ dotCount: 3 });

  return (
    <div className="flex flex-col items-center justify-center flex-grow">
      <div className="w-[211px] h-[239px] mb-[47px]">
        <Swiper
          slidesPerView={1}
          onSlideChange={(swiper: SwiperClass) => move(swiper.activeIndex)}
          className="w-full h-full"
        >
          {contents.map((content) => (
            <SwiperSlide key={content.title}>
              <OnboardingContent {...content} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <DotIndicator />
    </div>
  );
};

const contents = [
  { title: '모닥모닥', description: '우리만의 추억 공유 플랫폼', imageUrl: '/icons/onboarding-fire.webp' },
  { title: '추억을 공유해요', description: '친구들을 초대할 수 있어요!', imageUrl: '/icons/onboarding-heart.webp' },
  { title: '일정을 관리해요', description: '우리 일정을 관리해보세요!', imageUrl: '/icons/onboarding-calendar.webp' }
];

export default Onboarding;
