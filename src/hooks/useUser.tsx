'use client';

import { useRouter } from 'next/navigation';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { createClient } from '@utils/supabase/client';
import { useEffect } from 'react';

const supabase = createClient();

const fetchUser = async () => {
  const { data, error } = await supabase.auth.getUser();
  if (error) throw new Error('failed to fetch user');
  return data.user;
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
  const router = useRouter();
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

  if (isError) router.push('/login');
  return { user, isPending, isError };
};

export default useUser;
