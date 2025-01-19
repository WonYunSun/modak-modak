'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { useState } from 'react';

import 'swiper/css';

import { PostImageType } from 'queries/post/getPosts';
import Image from 'next/image';

interface photoProps {
  photoList: PostImageType[];
}

export const PhotoSlider = ({ photoList }: photoProps) => {
  const [currentIndex, setCurrentIndex] = useState(1);

  return (
    <div className="w-full aspect-square mb-3 relative z-0">
      {/* 슬라이드 */}
      <Swiper
        onSlideChange={(swiper) => setCurrentIndex(swiper.activeIndex + 1)} // 현재 슬라이드 번호 업데이트
        className="w-full h-full"
      >
        {photoList.map((image, index) => (
          <SwiperSlide key={index}>
            <Image
              src={image.image_url}
              alt={`Photo ${index + 1}`}
              fill
              sizes="100vw"
              className="object-cover"
              priority={index === 0} // 첫번째 이미지만 즉시 로드
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* 페이지네이션 */}
      <div className="absolute bottom-4 right-3 bg-[#00000033] rounded-[12px] text-xs px-2 py-1 z-10">
        <span className="text-[#FAFAFA]">{currentIndex}</span>{' '}
        <span className="text-gray-400">/ {photoList.length}</span>
      </div>
    </div>
  );
};
