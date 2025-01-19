import { ScheduleDetail } from '../_components/ScheduleDetail';

type Props = {
  params: {
    id: string;
    scheduleid: string;
  };
};

const page = ({ params }: Props) => {
  console.log(params.scheduleid);
  return <ScheduleDetail scheduleId={params.scheduleid} />;
};

export default page;
