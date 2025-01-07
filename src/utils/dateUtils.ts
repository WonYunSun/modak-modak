export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const dayOfWeek = new Intl.DateTimeFormat('ko-KR', { weekday: 'short' }).format(date);

  // 날짜 포맷
  const formattedDate = new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);

  return `${formattedDate}(${dayOfWeek})`;
};

export const formatTime = (timeString: string): string => {
  const [hours, minutes] = timeString.split(':').map(Number);

  // 24시간을 12시간으로 변환
  const isPM = hours >= 12;
  const hour12 = hours % 12 || 12; // 12시간제 형식
  const ampm = isPM ? '오후' : '오전';

  return `${ampm} ${hour12}:${minutes.toString().padStart(2, '0')}`;
};
