'use client';

import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import Button from '@components/common/Button';
import LabeledTextInput, { LabeledTextInputProps } from '@components/common/LabeledTextInput';
import Label, { LabelProps } from '@components/common/Label';
import ProfilePreview from '@app/signup/_components/ProfilePreview';
import useAddUser from '@hooks/user/useAddUser';
import { uploadFile } from '@utils/uploadFile';

const inputProps: Omit<LabeledTextInputProps, 'onChange' | 'value'> = {
  // input 관련
  name: 'nickname',
  maxLength: 15,
  placeHolder: '최대 15자까지 입력',
  // label 관련
  label: '닉네임',
  required: true,
  description: '사용하실 닉네임을 적어주세요',
  htmlFor: 'nickname',
};

const profileLabelProps: LabelProps = {
  label: '프로필 사진',
  required: false,
  description: '나를 나타내는 사진을 등록해주세요',
  htmlFor: 'profile',
};

export interface UserFormState {
  profile: File | null;
  nickname: string;
}

const SignupForm = () => {
  const [values, setValues] = useState<UserFormState>({ profile: null, nickname: '' });
  const { referrer, data } = Object.fromEntries(useSearchParams().entries());
  const { mutate, isPending } = useAddUser();

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setValues({ ...values, [target.name]: target.value });
  };

  const handleFileChange = (name: string, file: File | null) => {
    setValues((prev) => ({ ...prev, [name]: file }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let imageUrl = '/icons/profile-image.webp';
    if (values['profile']) {
      imageUrl = await uploadFile('profiles', 'users', values['profile']);
    }
    mutate({ nickname: values.nickname, imageUrl, options: { referrer, data } });
  };

  return (
    <form className="flex flex-col flex-grow" onSubmit={handleSubmit}>
      <section className="mt-11 mb-14">
        <Label className="mb-10" {...profileLabelProps} />
        <ProfilePreview
          width={120}
          height={120}
          name="profile"
          setValue={handleFileChange}
          className="w-[120px] h-[120px] mx-auto"
        />
      </section>
      <LabeledTextInput {...inputProps} value={values.nickname} onChange={handleChange} />
      <Button
        className="full-btn mt-auto mb-[19px]"
        disabled={!values.nickname || isPending}
        type="submit"
        label="가입하기"
      />
    </form>
  );
};

export default SignupForm;
