'use client';

import { useDropzone } from 'react-dropzone';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import Button from '@components/common/Button';
import { DeletePhoto, PlusGray } from '@components/icons';

interface PhotoUploadProps {
  selectedFiles: File[];
  setSelectedFiles: React.Dispatch<React.SetStateAction<File[]>>;
  previewUrls: string[];
  setPreviewUrls: React.Dispatch<React.SetStateAction<string[]>>;
}

const MAX_FILES = 10; // 최대 파일 수

const PhotoUpload = ({ selectedFiles, setSelectedFiles, previewUrls, setPreviewUrls }: PhotoUploadProps) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/jpeg': ['.jpeg', '.jpg'],
      'image/png': ['.png'],
      'image/gif': ['.gif'],
      'image/svg+xml': ['.svg'],
    },
    onDrop: (acceptedFiles) => {
      const totalFiles = selectedFiles.length + acceptedFiles.length;

      if (totalFiles > MAX_FILES) {
        alert(`최대 ${MAX_FILES}개의 파일만 업로드할 수 있습니다.`);
        return;
      }

      const newUrls = acceptedFiles.map((file) => URL.createObjectURL(file));
      setSelectedFiles((prev) => [...prev, ...acceptedFiles]);
      setPreviewUrls((prev) => [...prev, ...newUrls]);
    },
  });

  const handleDelete = (indexToDelete: number) => {
    setSelectedFiles((prev) => prev.filter((_, index) => index !== indexToDelete));
    setPreviewUrls((prev) => prev.filter((_, index) => index !== indexToDelete));
  };

  console.log('selectedFiles', selectedFiles);

  return (
    <div className="w-full flex mt-[4.5rem] px-5">
      {/* 파일 선택 버튼 */}
      <div
        {...getRootProps()}
        className="flex items-center justify-center w-[5.25rem] h-[5.25rem] bg-[#F1F1F1] cursor-pointer flex-shrink-0 mr-[1px]"
      >
        <input {...getInputProps()} type="file" multiple accept="image/jpeg, image/png, image/gif, image/svg+xml" />
        <div className="flex flex-col items-center">
          <PlusGray />
          <div className="text-gray-500 text-[10px] w-6 flex justify-center">
            {previewUrls.length}/{MAX_FILES}
          </div>
        </div>
      </div>

      {/* Swiper 슬라이더 (미리보기) */}
      {previewUrls.length > 0 && (
        <Swiper spaceBetween={1} slidesPerView={'auto'} className="flex w-full justify-start">
          {previewUrls.map((url, index) => (
            <SwiperSlide key={index} style={{ flex: '0 0 auto', width: '5.25rem' }}>
              <img src={url} alt={`미리보기-${index}`} className="w-[5.25rem] aspect-square object-cover" />
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
        </Swiper>
      )}
    </div>
  );
};

export default PhotoUpload;
