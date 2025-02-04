'use client';

import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';

import Button from '@components/common/Button';
import SpinnerContainer from '@components/common/SpinnerContainer';
import NoPhoto from '@app/groups/[id]/_components/NoPhoto';
import { ModificationLine } from '@components/icons';

import { useFetchPhotos } from '@hooks/photo/useFetchPhotos';

const PhotoList = () => {
  const router = useRouter();
  const { id } = useParams();
  const groupId = Array.isArray(id) ? id[0] : id;

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const { data, isPending, isError } = useFetchPhotos(groupId);

  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  const handleClose = () => {
    setSelectedImage(null);
  };

  if (isPending) return <SpinnerContainer />;

  if (isError) return <p>에러 발생!</p>;

  if (!data || data.length === 0) {
    return <NoPhoto />;
  }

  return (
    <section className="w-full flex flex-col mb-28">
      <div className="w-full flex flex-wrap mt-6 gap-[1px]">
        {data.map((post) =>
          post.post_images.map((image, index) => (
            <div
              key={index}
              className="relative w-[calc(25%-0.75px)] aspect-square bg-white cursor-pointer"
              onClick={() => handleImageClick(image.image_url)}
            >
              <Image src={image.image_url} alt={`이미지-${index}`} layout="fill" objectFit="cover" />
            </div>
          ))
        )}
      </div>

      {selectedImage && (
        <div
          className="fixed inset-y-0 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-80 flex justify-center items-center z-50 w-full max-w-[600px]"
          onClick={handleClose}
        >
          <div className="relative w-[80%] h-auto">
            <Image src={selectedImage} alt="Image" layout="responsive" width={1} height={1} />
          </div>
        </div>
      )}

      {/* 플로팅 버튼 */}
      <div className="ml-[calc(100%-124px)]">
        <Button
          label="게시글 쓰기"
          className="floating-btn"
          type="button"
          onClick={() => router.push(`/groups/${groupId}/posts/new`)}
        >
          <ModificationLine />
        </Button>
      </div>
    </section>
  );
};

export default PhotoList;
