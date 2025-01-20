import PostSelectSection from '@app/groups/[id]/posts/new/select/_components/PostSelectSection';
import { getSchedules } from '@queries/post/getSchedules';

import { ScheduleType } from '@ts/scheduleType';

interface PostSelectPageProps {
  params: {
    id: string;
  };
}

const PostEditSelectPage = async ({ params }: PostSelectPageProps) => {
  const schedules: ScheduleType[] = await getSchedules(params.id);

  return <PostSelectSection schedules={schedules} />;
};

export default PostEditSelectPage;
