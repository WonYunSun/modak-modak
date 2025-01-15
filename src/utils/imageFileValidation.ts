/**
 * - 이미지 확장자 검사 (JPEG, PNG, GIF, WEBP, SVG만 허용)
 * - 파일명이 영어, 숫자, 특수문자(-, _, .)만 허용
 *
 * @param file - 업로드 파일
 * @returns {boolean} - 파일이 유효한 경우 true, 그렇지 않으면 false를 반환
 */
export const isValidImageFile = (file: File): boolean => {
  // 허용되는 이미지 확장자
  const allowedExtensions = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
  // 허용되는 파일명 패턴 (영어, 숫자, - _ . 만 가능)
  const filenamePattern = /^[a-zA-Z0-9._-]+$/;

  // 파일 확장자 검사
  const isValidExtension = allowedExtensions.includes(file.type);

  // 파일명 검사 (파일 이름만 추출)
  const fileNameWithoutExtension = file.name.split('.').slice(0, -1).join('.');
  const isValidFilename = filenamePattern.test(fileNameWithoutExtension);

  // 둘 다 true인 경우만 유효한 파일로 간주
  return isValidExtension && isValidFilename;
};
