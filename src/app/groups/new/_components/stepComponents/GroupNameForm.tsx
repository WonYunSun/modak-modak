import { useState } from 'react';
import Layout from '@app/schedules/_components/layout/Layout';
import LabeledTextInput, { LabeledTextInputProps } from '@components/common/LabeledTextInput';
import { GroupsType } from '@queries/home/fetchGroupInfo';

type GroupNameFormProps = {
  onNext: (data: Pick<GroupsType, 'name' | 'description'>) => void;
  onPrev: () => void;
  prevData: { name: GroupsType['name']; description: GroupsType['description'] };
};

const GroupNameForm = ({ onNext, onPrev, prevData }: GroupNameFormProps) => {
  const [values, setValues] = useState({
    groupName: prevData.name || '',
    groupDescription: prevData.description || '',
  });

  const isDisabled = !values.groupName.trim() || !values.groupDescription.trim();

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setValues({ ...values, [target.name]: target.value });
  };

  const handleNext = () => {
    onNext({ name: values.groupName, description: values.groupDescription });
  };

  const nameData: LabeledTextInputProps = {
    // input 관련
    onChange: handleChange,
    value: values['groupName'],
    name: 'groupName',
    maxLength: 20,
    placeHolder: '최대 20자까지 입력',
    // label 관련
    label: '모임명',
    required: true,
    description: '만드실 모임의 이름을 적어주세요',
    htmlFor: 'groupName',
  };
  const descriptionData: LabeledTextInputProps = {
    // input 관련
    onChange: handleChange,
    value: values['groupDescription'],
    name: 'groupDescription',
    maxLength: 30,
    placeHolder: '최대 30자까지 입력',
    // label 관련
    label: '모임 한 줄 소개',
    required: true,
    description: '모임을 한 줄로 소개해주세요',
    htmlFor: 'groupDescription',
  };

  return (
    <Layout isDisabled={isDisabled} onNext={handleNext} onPrev={onPrev}>
      <LabeledTextInput {...nameData} />
      <LabeledTextInput {...descriptionData} />
    </Layout>
  );
};

export default GroupNameForm;
