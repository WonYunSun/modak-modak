import Image from 'next/image';
import React from 'react';

interface OnboardingSlideProps {
  title: string;
  description: string;
  imageUrl: string;
}

const OnboardingContent = ({ title, description, imageUrl }: OnboardingSlideProps) => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <Image src={imageUrl} width={120} height={130} alt="bonfire" className="mb-6" />
      <p className="text-2xl font-bold leading-[140%]">{title}</p>
      <p className="text-gray-700 text-xl font-normal">{description}</p>
    </div>
  );
};

export default OnboardingContent;
