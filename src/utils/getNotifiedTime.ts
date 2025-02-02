function isTodayInKST(timestamp: string) {
  const dateKST = new Date(timestamp).toLocaleDateString('ko-KR', { timeZone: 'Asia/Seoul' });
  const todayKST = new Date().toLocaleDateString('ko-KR', { timeZone: 'Asia/Seoul' });

  return dateKST === todayKST;
}

function isISO8601format(timestamp: string) {
  const date = new Date(timestamp);
  return !isNaN(date.getTime()) && timestamp === date.toISOString();
}

const getNotifiedTime = (timestamp: string) => {
  //인자가 날짜로 변환할 수 있는 형식이 아니라면 실행 중지
  if (isISO8601format(timestamp)) throw new Error('the format of the time must be ISO8601');

  const date = new Date(timestamp);
  const isToday = isTodayInKST(timestamp);

  if (isToday) {
    const timeOptions: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      timeZone: 'Asia/Seoul',
    };

    const formattedTime = new Intl.DateTimeFormat('ko-KR', timeOptions).format(date).replace(/\./g, '');

    //리턴 형식 : 오전 00:00
    return formattedTime;
  } else {
    const dateOptions: Intl.DateTimeFormatOptions = {
      month: 'numeric',
      day: 'numeric',
      timeZone: 'Asia/Seoul',
    };

    const [month, day] = new Intl.DateTimeFormat('ko-KR', dateOptions).format(date).replace(/\./g, '').split(' ');
    const formattedDate = `${month}월 ${day}일`;

    //리턴 형식 : 00월 00일
    return formattedDate;
  }
};

export default getNotifiedTime;
