import { useState } from 'react';
import ProfileConfirmBtns from '@app/groups/[id]/management/_components/modal/changeGroupProfile/ProfileConfirmBtns';
import ProfilePreview from '@app/signup/_components/ProfilePreview';
import { UserFormState } from '@app/signup/_components/SignupForm';
import TextInput from '@components/common/TextInput';

const ProfileUpdateModalContent = () => {
  const [values, setValues] = useState<UserFormState>({ profile: null, nickname: '' });

  const handleTextChange = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setValues({ ...values, [target.name]: target.value });
  };

  const handleFileChange = (name: string, file: File | null) => {
    setValues((prev) => ({ ...prev, [name]: file }));
  };

  const onConfirmChange = () => {};

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <h4 className="mb-6 font-semibold text-xl text-gray-900 text-center">프로필 변경</h4>
      <div className="flex justify-center w-full">
        <ProfilePreview
          width={84}
          height={84}
          name="profile"
          setValue={handleFileChange}
          className="w-[84px] h-[84px]"
          innerClass='bottom-[-10px] right-[-10px]'
        />
      </div>
      <div className="w-64 px-2">
        <div className="mt-5">
          <label htmlFor="groupName" className="text-sm text-gray-700">
            닉네임
          </label>
          <TextInput
            value={values.nickname}
            name={'nickname'}
            onChange={(e) => {
              handleTextChange(e);
            }}
            maxLength={20}
            mode={'underBar'}
          />
        </div>
      </div>
      <div className="w-full mt-6 flex gap-2 justify-center">
        <ProfileConfirmBtns onConfirm={onConfirmChange} />
      </div>
    </div>
  );
};

export default ProfileUpdateModalContent;
