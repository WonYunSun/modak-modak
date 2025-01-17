'use client';

import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { createClient } from '@utils/supabase/client';

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
  if (isError) router.push('/login');
  return { user, isPending, isError };
};

export default useUser;
