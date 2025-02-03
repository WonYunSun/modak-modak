import { useEffect, useState } from 'react';

import { createClient } from '@utils/supabase/client';
import { useQueryClient } from '@tanstack/react-query';

const useChatRoomPresence = (chatRoomId: string, userId: string) => {
  const supabase = createClient();
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);

  const queryClient = useQueryClient();

  useEffect(() => {
    const channel = supabase.channel(`chat_room_presence_${chatRoomId}`, {
      config: {
        presence: {
          key: userId,
        },
      },
    });

    channel
      .on('presence', { event: 'sync' }, async () => {
        const presenceState = channel.presenceState();
        const onlineUserIds = Object.keys(presenceState).map((key) => key);
        setOnlineUsers(onlineUserIds);
      })
      .on('presence', { event: 'join' }, async ({ key }) => {
        setOnlineUsers((prev) => [...prev, key]);
        queryClient.invalidateQueries({ queryKey: ['messageList', chatRoomId] });
      })
      .on('presence', { event: 'leave' }, async ({ key }) => {
        setOnlineUsers((prev) => prev.filter((user) => user !== key));
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          await channel.track({ online_at: new Date().toISOString() });
        }
      });

    return () => {
      channel.untrack();
      supabase.removeChannel(channel);
    };
  }, [chatRoomId, userId, supabase]);

  return onlineUsers;
};

export default useChatRoomPresence;
