'use client'

import GroupCard from "@components/common/groupCard/GroupCard"


export const GroupCardSection = () => {

    return (
        <div className="w-full px-5 -mt-[2.75rem] z-10">
        <GroupCard
          groupInfo={{
            id: '123',
            name: '모각코!',
            description: '안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요',
            image_url: '/',
            membersNum: 7,
            created_at: '2025-01-14'
          }}
          hasLink={false}
        />
      </div>
    )
}