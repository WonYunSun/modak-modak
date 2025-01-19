import PostSelectSection from '@app/groups/[id]/posts/new/select/_components/PostSelectSection';

import { getSchedule } from '@queries/post/getSchedule';

import { ScheduleType } from '@ts/scheduleType';

interface PostSelectPageProps {
  params: {
    id: string;
  };
}

const PostNewSelectPage = async ({ params }: PostSelectPageProps) => {
  const schedules: ScheduleType[] = await getSchedule(params.id);

  return <PostSelectSection schedules={schedules} />;
};

export default PostNewSelectPage;
