import { ScheduleDetail } from '../_components/ScheduleDetail';

type Props = {
  params: {
    id: string;
  };
};
const page = ({ params }: Props) => {
  return <ScheduleDetail scheduleId={params.id} />;
};

export default page;
