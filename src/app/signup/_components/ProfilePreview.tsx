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
    <div
      className={`w-[${width}px] h-[${height}px] relative mx-auto ${className}`}
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
