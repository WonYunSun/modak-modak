'use client';

import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';

import Button from '@components/common/Button';
import Spinner from '@components/common/Spinner';
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

  if (isPending) return <Spinner />;

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
              className="relative w-[calc(25%-0.75px)] aspect-square bg-white"
              onClick={() => handleImageClick(image.image_url)}
            >
              <Image
                src={image.image_url}
                alt={`이미지-${index}`}
                fill
                sizes="25vw"
                className="object-cover"
                priority={index < 20}
              />
            </div>
          ))
        )}
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50"
          onClick={handleClose}
        >
          <div className="relative w-[80%] h-auto">
            <Image src={selectedImage} alt="Image" className="w-full h-auto" width={1} height={1} />
          </div>
        </div>
      )}

      {/* 플로팅 버튼 */}
      <Button
        label="게시글 쓰기"
        className="floating-btn"
        type="button"
        onClick={() => router.push(`/groups/${groupId}/posts/new`)}
      >
        <ModificationLine />
      </Button>
    </section>
  );
};

export default PhotoList;
