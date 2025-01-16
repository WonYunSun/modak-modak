import dayjs from 'dayjs';
import 'dayjs/locale/ko';

dayjs.locale('ko');

export const formatDate = (dateString: string): string => {
  const parsedDate = dayjs(dateString);

  // 유효하지 않으면 기본 값 또는 "잘못된 날짜" 표시
  if (!parsedDate.isValid()) {
    return '잘못된 날짜'; // 예시로 잘못된 날짜를 처리
  }

  return parsedDate.format('YYYY.MM.DD (dd)');
};

export const formatTime = (timeString: string): string => {
  // 시간만 들어오면 임의의 날짜를 결합해서 dayjs가 인식할 수 있게 함
  const parsedTime = dayjs(`01-01 ${timeString}`, 'MM-DD HH:mm:ss');

  // 유효한 시간인지 체크
  if (!parsedTime.isValid()) {
    return '잘못된 시간'; // 예시로 잘못된 시간 처리
  }

  // 시간만 있는 경우 오전/오후 형식으로 포맷
  return parsedTime.format('A h:mm'); // 오전/오후 형식으로 시간 표시
};
