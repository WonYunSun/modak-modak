import { useEffect, useState } from 'react';
import ProfileConfirmBtns from '@app/groups/[id]/management/_components/modal/changeGroupProfile/ProfileConfirmBtns';
import ProfilePreview from '@app/signup/_components/ProfilePreview';
import { UserFormState } from '@app/signup/_components/SignupForm';
import TextInput from '@components/common/TextInput';
import useUser from '@hooks/common/useUser';
import { updateUser } from '@queries/users/users';
import { uploadFile } from '@utils/uploadFile';
import { createClient } from '@utils/supabase/client';
import { useQueryClient } from '@tanstack/react-query';

const ProfileUpdateModalContent = () => {
  const { user, isPending } = useUser();
  const [values, setValues] = useState<UserFormState>({ profile: null, nickname: '' });
  const [imageUrl, setImageUrl] = useState<string>('/icons/profile-image.webp');

  const queryClient = useQueryClient();

  useEffect(() => {
    if (!isPending && user) {
      setValues({
        profile: null,
        nickname: user.user_metadata.nickname || '',
      });
      setImageUrl(user.user_metadata.profile_image);
    }
  }, [isPending, user]);

  if (isPending) return null;

  const handleTextChange = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setValues({ ...values, [target.name]: target.value });
  };

  const handleFileChange = (name: string, file: File | null) => {
    setValues((prev) => ({ ...prev, [name]: file }));
  };

  const onConfirmChange = async () => {
    const supabase = createClient();
    let imageUrl: string = user?.user_metadata.profile_image;
    try {
      if (values['profile']) {
        imageUrl = await uploadFile('profiles', 'users', values['profile']);
      }
      await updateUser({ nickname: values.nickname, profile_image: imageUrl });
      await supabase.auth.updateUser({
        data: { nickname: values.nickname, profile_image: imageUrl },
      });
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    } catch (error) {
      console.error((error as Error).message);
    }
  };

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
          innerClass="bottom-[-11px] right-[-11px]"
          imageUrl={imageUrl}
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
        <ProfileConfirmBtns disabled={!values.nickname} onConfirm={onConfirmChange} />
      </div>
    </div>
  );
};

export default ProfileUpdateModalContent;
