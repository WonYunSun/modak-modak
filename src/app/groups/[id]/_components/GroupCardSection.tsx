'use client'

import GroupCard from "@components/common/GroupCard"
import { useFetchPosts } from "hooks/useFetchPosts";

export const GroupCardSection = () => {
     // const {posts, groups, isPending, isError} = useFetchPosts();

    return (
        <div className="w-full px-5 -mt-[2.75rem] z-10">
        <GroupCard
          groupInfo={{
            id: '123',
            name: '모각코!',
            description: '안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요',
            image_url: '/',
            membersNum: 7
          }}
          hasLink={false}
        />
      </div>
    )
}