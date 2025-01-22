import { ScheduleDetail } from '../_components/ScheduleDetail';

type Props = {
  params: {
    id: string;
    scheduleid: string;
  };
};

const page = ({ params }: Props) => {
  return <ScheduleDetail scheduleId={params.scheduleid} groupId={params.id} />;
};

export default page;
