import { MessageType } from '@queries/chat/getChatList';

interface UserMessageProps {
  message: MessageType;
  marginTop: string;
}

const UserMessage = ({ message, marginTop }: UserMessageProps) => {
  return (
    <div className={`flex justify-end px-3 ${marginTop}`}>
      <div className="flex gap-1">
        <p className="flex flex-col justify-end items-end text-[10px] font-normal leading-[140%] text-gray-400">
          <span className="text-xs font-semibold leading-[140%] text-[#B94600]">
            {message.unread_count > 0 && message.unread_count}
          </span>
          {new Date(message.created_at).toLocaleTimeString('ko-KR', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
          })}
        </p>
        <p className="bg-gray-100 rounded-tl-[12px] rounded-tr-[12px] rounded-bl-[12px] rounded-br-none max-w-[306px] px-3 py-2 text-sm leading-[140%] font-normal text-gray-900">
          {message.message}
        </p>
      </div>
    </div>
  );
};

export default UserMessage;
