'use client';

import { useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { createClient } from '@utils/supabase/client';

const supabase = createClient();

const fetchUser = async () => {
  const { data } = await supabase.auth.getUser();
  return data.user ? data.user : null;
};

const useUser = () => {
  const {
    data: user,
    isPending,
    isError,
  } = useQuery({
    queryKey: ['user'],
    queryFn: fetchUser,
  });
  const queryClient = useQueryClient();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'USER_UPDATED') {
        queryClient.setQueryData(['user'], session?.user);
      } else if (event === 'SIGNED_OUT') {
        queryClient.removeQueries({ queryKey: ['user'] });
      }
    });
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return { user, isPending, isError };
};

export default useUser;
