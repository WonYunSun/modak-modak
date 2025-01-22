import Image from 'next/image';
import React from 'react';

interface OnboardingSlideProps {
  title: string;
  description: string;
  imageUrl: string;
}

const OnboardingContent = ({ title, description, imageUrl }: OnboardingSlideProps) => {
  return (
    <div className="flex flex-col items-center">
      <Image src={imageUrl} width={145} height={145} alt="bonfire" className="mb-6" />
      <p className="text-2xl font-bold mb-2 leading-[140%]">{title}</p>
      <p className="text-gray-700 text-xl font-normal">{description}</p>
    </div>
  );
};

export default OnboardingContent;
