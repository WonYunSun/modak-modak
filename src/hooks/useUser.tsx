'use client';

import { useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { createClient } from '@utils/supabase/client';

const supabase = createClient();

const fetchUser = async () => {
  const { data, error } = await supabase.auth.getSession();
  if (error) throw new Error('failed to fetch user');
  return data.session ? data.session.user : null;
};

const useUser = () => {
  const {
    data: user,
    isPending,
    isError,
  } = useQuery({
    queryKey: ['user'],
    queryFn: fetchUser,
    staleTime: 60 * 5 * 1000,
  });
  const queryClient = useQueryClient();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'USER_UPDATED') {
        queryClient.setQueryData(['user'], session?.user);
      }
    });
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return { user, isPending, isError };
};

export default useUser;
