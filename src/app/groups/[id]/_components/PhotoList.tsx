'use client';

import { NoPhoto } from '@app/groups/[id]/_components/NoPhoto';
import Button from '@components/common/Button';
import { ModificationLine } from '@components/icons';
import { useFetchPhotos } from '@hooks/photo/useFetchPhotos';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

const PhotoList = () => {
  const router = useRouter();
  const { id } = useParams();
  const groupId = Array.isArray(id) ? id[0] : id;

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const { data, isPending, isError } = useFetchPhotos(groupId);

  const getImageURL = (url: string) => {
    return `${supabaseUrl}/storage/v1/object/public/post-photos/${url}`;
  };

  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  const handleClose = () => {
    setSelectedImage(null);
  };

  if (isPending) return <p>로딩 중</p>;

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
              <Image src={getImageURL(image.image_url)} alt={`이미지-${index}`} layout="fill" objectFit="cover" />
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
            <Image src={getImageURL(selectedImage)} alt="Image" layout="responsive" width={1} height={1} />
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
