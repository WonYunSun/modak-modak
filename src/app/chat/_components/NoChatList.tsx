const NoChatList = () => {
  return (
    <div className="mt-[140px] flex flex-col items-center justify-center gap-5 text-center">
      <p className="text-2xl font-bold leading-[140%] text-[#27272A]">아직 모임이 없으시네요!</p>
      <p className="text-lg font-normal leading-[140%] text-gray-700">
        모임을 만들고 소중한 사람들과
        <br />
        채팅을 시작해보세요
      </p>
    </div>
  );
};

export default NoChatList;
