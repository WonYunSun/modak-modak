import Resizer from 'react-image-file-resizer';

const MAX_WIDTH = 900;
const QUALITY = 90;

// 이미지 리사이즈 함수 (React-Image-File-Resizer 사용)
export const resizeImage = (file: File): Promise<File> => {
  return new Promise((resolve, reject) => {
    Resizer.imageFileResizer(
      file, // 원본 파일
      MAX_WIDTH, // 최대 너비
      MAX_WIDTH, // 최대 높이
      'webp', // 이미지 포맷
      QUALITY, // 품질 (0 ~ 100)
      0, // 회전 각도
      (resizedFile) => {
        if (resizedFile instanceof Error) {
          reject(resizedFile.message);
        } else {
          resolve(resizedFile as File);
        }
      },
      'file' // 출력 타입 (file)
    );
  });
};
