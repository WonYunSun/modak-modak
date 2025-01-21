import { useState } from 'react';
import LabeledTextInput, { LabeledTextInputProps } from '@components/common/LabeledTextInput';
import Layout from '@app/groups/[id]/schedules/_components/layout/Layout';
import { GroupsType } from '@ts/supabaseTableRowTypes';

type GroupNameFormProps = {
  onNext: (data: Pick<GroupsType, 'name' | 'description'>) => void;
  onPrev: () => void;
  prevData: { name: GroupsType['name']; description: GroupsType['description'] };
};

const nameData: Omit<LabeledTextInputProps, 'onChange' | 'value'> = {
  // input 관련
  name: 'groupName',
  maxLength: 20,
  placeHolder: '최대 20자까지 입력',
  // label 관련
  label: '모임명',
  required: true,
  description: '만드실 모임의 이름을 적어주세요',
  htmlFor: 'groupName',
};

const descriptionData: Omit<LabeledTextInputProps, 'onChange' | 'value'> = {
  // input 관련
  name: 'groupDescription',
  maxLength: 30,
  placeHolder: '최대 30자까지 입력',
  // label 관련
  label: '모임 한 줄 소개',
  required: true,
  description: '모임을 한 줄로 소개해주세요',
  htmlFor: 'groupDescription',
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

  return (
    <Layout isDisabled={isDisabled} onNext={handleNext} onPrev={onPrev}>
      <div className="space-y-6">
        <LabeledTextInput {...nameData} value={values.groupName} onChange={handleChange} />
        <LabeledTextInput {...descriptionData} value={values.groupDescription} onChange={handleChange} />
      </div>
    </Layout>
  );
};

export default GroupNameForm;
