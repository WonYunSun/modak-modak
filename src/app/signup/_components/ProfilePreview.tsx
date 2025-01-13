'use client'

import Image from 'next/image';
import { useRef, useState } from 'react';
import { Modification, ProfileAlter } from '@components/icons';

interface ProfilePreviewProps {
  width: number;
  height: number;
  name: string;
  setValue: (name: string, file: File | null) => void;
  imageUrl?: string;
  className?: string;
}

const ProfilePreview = ({ width, height, name, setValue, imageUrl, className }: ProfilePreviewProps) => {
  const [profileFile, setProfileFile] = useState<File | null>(null);
  const profileRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setProfileFile(file);
    setValue(name, file);
  };

  return (
    // tailwind는 동적으로 클래스를 생성할 수 없어서 box 크기를 props로 받아와 설정할 수 없음
    // className으로 넣어주거나 사이즈를 정해놓은 부모 박스가 필요
    <div
      className={`relative ${className}`}
      onClick={() => profileRef.current?.click()}
    >
      {profileFile ? (
        <Image
          src={imageUrl ? imageUrl : URL.createObjectURL(profileFile)}
          width={width}
          height={height}
          alt="selected profile image"
          className="rounded-full object-cover w-full h-full"
        />
      ) : (
        <div className="rounded-full bg-gray-100 p-[14px]">
          <ProfileAlter />
        </div>
      )}
      <input type="file" accept="image/*" ref={profileRef} onChange={handleChange} className="hidden" />
      <Modification className="absolute bottom-[-5px] right-[-5px]" />
    </div>
  );
};

export default ProfilePreview;
