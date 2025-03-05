'use client';

import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import Button from '@components/common/Button';
import { DeletePhoto, PlusGray } from '@components/icons';

import { resizeImage } from '@utils/imageUtils';

const MAX_FILES = 10; // 최대 파일 수

interface PhotoUploadProps {
  selectedFiles: File[];
  setSelectedFiles: React.Dispatch<React.SetStateAction<File[]>>;
  OpenImageCountAlert: () => void;
}

const PhotoUpload = ({ selectedFiles, setSelectedFiles, OpenImageCountAlert }: PhotoUploadProps) => {
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/jpeg': ['.jpeg', '.jpg'],
      'image/png': ['.png'],
    },
    onDrop: async (acceptedFiles) => {
      const totalFiles = selectedFiles.length + acceptedFiles.length;

      if (totalFiles > MAX_FILES) {
        OpenImageCountAlert();
        return;
      }

      try {
        const resizedResults = await Promise.all(
          acceptedFiles.map(async (file, index) => {
            const resizedFile = await resizeImage(file); // 이미지 파일 리사이즈
            const newUrl = URL.createObjectURL(resizedFile); // 이미지 URL
            return { index, resizedFile, newUrl };
          })
        );

        // 원래 순서대로 정렬
        const sortedResults = resizedResults.sort((a, b) => a.index - b.index);

        // 파일과 URL을 업데이트
        const resizedFiles = sortedResults.map((result) => result.resizedFile);
        const newUrls = sortedResults.map((result) => result.newUrl);

        setSelectedFiles((prevFiles) => [...prevFiles, ...resizedFiles]);
        setPreviewUrls((prevUrls) => [...prevUrls, ...newUrls]);
      } catch (error) {
        console.error('Image resize failed:', error);
      }
    },
  });

  // 선택한 index에 해당하는 이미지 미리보기 파일과 이미지 파일 삭제
  const handleDelete = (indexToDelete: number) => {
    setSelectedFiles(selectedFiles.filter((_, index) => index !== indexToDelete));
    setPreviewUrls(previewUrls.filter((_, index) => index !== indexToDelete));
  };

  return (
    <div className="w-full flex mt-0 px-5">
      {/* 파일 선택 버튼 */}
      <div
        {...getRootProps()}
        className="relative flex items-center justify-center w-[8.75rem] h-[8.75rem] bg-[#F1F1F1] cursor-pointer flex-shrink-0 mr-[1px]"
      >
        <input {...getInputProps()} type="file" multiple accept="image/jpeg, image/png, image/gif, image/svg+xml" />
        <div className="flex flex-col items-center">
          <p className="absolute top-[32px] right-[48px] text-[#FF3B30]">*</p>
          <PlusGray />
          <div className="text-gray-500 text-base w-6 flex justify-center">
            {previewUrls.length}/{MAX_FILES}
          </div>
        </div>
      </div>

      {/* Swiper 슬라이더 (미리보기) */}
      {previewUrls.length > 0 && (
        <Swiper spaceBetween={1} slidesPerView={'auto'} className="w-full justify-start">
          {previewUrls.map((url, index) => (
            <SwiperSlide key={index} style={{ flex: '0 0 auto', width: '8.625rem' }}>
              <img src={url} alt={`미리보기-${index}`} className="w-[8.75rem] aspect-square object-cover" />
              <Button
                label=""
                type="button"
                onClick={() => handleDelete(index)}
                className="absolute top-0 right-0 p-[6px] rounded-full bg-[#00000080]"
              >
                <DeletePhoto />
              </Button>
            </SwiperSlide>
          ))}
          {/* 미리보기 우측 그라디언트 효과 */}
          <div className="absolute top-0 right-0 w-[28px] h-[8.75rem] pointer-events-none bg-gradient-to-r from-transparent to-white z-10"></div>
        </Swiper>
      )}
    </div>
  );
};

export default PhotoUpload;
