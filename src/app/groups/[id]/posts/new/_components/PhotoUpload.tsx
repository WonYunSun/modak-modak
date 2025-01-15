'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import Button from '@components/common/Button';
import { DeletePhoto, PlusGray } from '@components/icons';

import { isValidImageFile } from '@utils/imageFileValidation';

interface PhotoUploadProps {
  selectedFiles: File[];
  setSelectedFiles: React.Dispatch<React.SetStateAction<File[]>>;
  previewUrls: string[];
  setPreviewUrls: React.Dispatch<React.SetStateAction<string[]>>;
}

const PhotoUpload = ({ selectedFiles, setSelectedFiles, previewUrls, setPreviewUrls }: PhotoUploadProps) => {
  const handleSelectPhoto = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const validFiles: File[] = [];
    const invalidFiles: string[] = [];

    files.forEach((file) => {
      if (isValidImageFile(file)) {
        validFiles.push(file);
      } else {
        invalidFiles.push(file.name);
      }
    });

    if (invalidFiles.length > 0) {
      alert(`업로드 불가능한 파일이 있습니다: \n${invalidFiles.join(', ')}`);
      return;
    }

    const remainingSlots = 10 - selectedFiles.length;
    if (validFiles.length > remainingSlots) {
      alert('최대 10개의 이미지만 선택할 수 있습니다.');
      validFiles.splice(remainingSlots);
    }

    const newUrls = validFiles.map((file) => URL.createObjectURL(file));

    setSelectedFiles([...selectedFiles, ...validFiles]);
    setPreviewUrls([...previewUrls, ...newUrls]);
  };

  const handleDelete = (indexToDelete: number) => {
    setSelectedFiles((prev) => prev.filter((_, index) => index !== indexToDelete));
    setPreviewUrls((prev) => prev.filter((_, index) => index !== indexToDelete));
  };

  return (
    <div className="w-full flex mt-[4.5rem] px-5">
      <label className="w-[5.25rem] aspect-square bg-[#F1F1F1] flex items-center justify-center mr-[1px]">
        <input type="file" multiple accept="image/*" onChange={handleSelectPhoto} className="hidden" />
        <div className="flex flex-col">
          {/* + 아이콘 */}
          <PlusGray />
          <div className="text-gray-500 text-[10px] w-6 flex justify-center">{previewUrls.length}/10</div>
        </div>
      </label>
      {/* Swiper 슬라이더 (미리보기) */}
      {previewUrls.length > 0 && (
        <Swiper spaceBetween={1} slidesPerView={'auto'} className="flex w-full justify-start">
          {previewUrls.map((url, index) => (
            <SwiperSlide key={index} style={{ flex: '0 0 auto', width: '5.25rem' }}>
              <img src={url} alt={`미리보기-${index}`} className="w-[5.25rem] aspect-square object-cover" />
              {/* 삭제 버튼 */}
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
