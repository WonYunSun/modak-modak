"use client";

import { createClient } from "@utils/supabase/client";
import { useQuery } from "@tanstack/react-query";

const groupId = '52f44a96-b8f7-4c6c-80b1-d657eafd3821';

// ✅ 데이터 패칭 함수 (Supabase에서 데이터 불러오기)
const getPosts = async () => {
    const supabase = createClient();

    const { data, error } = await supabase
        .from('posts')
        .select(`
            id, 
            content,
            groups!inner(name, description),
            users!inner(nickname, profile_image),
            schedules!inner(name, memo, start_date, end_date, start_time),
            comments(count)
        `)
        .eq('group_id', groupId)
        .order('created_at', { ascending: false });

    if (error) throw new Error(error.message);
    return data;
};

export const useGetPosts = () => {
    return useQuery({
        queryKey: [groupId, 'posts'],
        queryFn: () => getPosts,
        //staleTime: 1000 * 60 * 5, 
        //cacheTime: 1000 * 60 * 10, 
    });
};
