'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import ProfileInputs from '@app/groups/[id]/management/_components/modal/changeGroupProfile/ProfileInputs';
import ProfileConfirmBtns from '@app/groups/[id]/management/_components/modal/changeGroupProfile/ProfileConfirmBtns';
import { useFetchGetGroup } from '@hooks/useFetchGetGroup';
import useUpdateGroupProfile from '@hooks/management/useUpdateGroupProfile';
import { Modification } from '@components/icons';

const ChangeGroupProfileModal = () => {
  const { id } = useParams();
  const groupId = Array.isArray(id) ? id[0] : id;
  const { data, isPending, isError } = useFetchGetGroup(groupId);
  const updateGroupProfile = useUpdateGroupProfile({ groupId });

  const [groupProfileImg, setGroupProfileImg] = useState<File | null>(null);
  const [groupProfileImgUrl, setGroupProfileImgUrl] = useState('');
  const [groupName, setGroupName] = useState('');
  const [description, setDescription] = useState('');

  const onProfileImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    const imageUrl = file ? URL.createObjectURL(file) : null;
    if (imageUrl) {
      setGroupProfileImgUrl(imageUrl);
      setGroupProfileImg(file);
    }
  };

  const onConfirmUpdate = async () => {
    const groupProfileData = { groupName, description, groupProfileImg };
    updateGroupProfile(groupProfileData);
  };

  useEffect(() => {
    if (data) {
      setGroupProfileImgUrl(data['image_url']);
      setGroupName(data['name']);
      setDescription(data['description']);
    }
  }, [data]);

  if (isPending)
    return (
      <div className="h-[444px] p-5 flex flex-col items-center justify-center">
        <div>Loading...</div>
      </div>
    );
  if (isError) return <div>Error!</div>;

  return (
    <div className="p-5 flex flex-col items-center">
      <h4 className="mb-6 font-semibold text-xl text-gray-900 text-center">모임 프로필 변경</h4>
      <div>
        <div className="m-auto w-24 h-24 relative">
          <div className="w-full h-full rounded-xl overflow-hidden">
            <Image
              src={groupProfileImgUrl ? groupProfileImgUrl : ''}
              alt={'그룹 프로필'}
              width={100}
              height={100}
              className="w-full h-full"
            />
          </div>
          <label htmlFor="profilePhoto" className="block absolute bottom-[-8px] right-[-14px]">
            <Modification />
          </label>
        </div>
        <input
          type="file"
          accept="image/*"
          name="profilePhoto"
          id="profilePhoto"
          onChange={onProfileImgChange}
          className="hidden"
        />
      </div>
      <div className="w-64 px-2">
        <ProfileInputs
          groupName={groupName}
          description={description}
          onGroupNameChange={(e) => setGroupName(e.currentTarget.value)}
          onDescriptionChange={(e) => setDescription(e.currentTarget.value)}
        />
      </div>
      <div className="w-full mt-6 flex gap-2 justify-center">
        <ProfileConfirmBtns onConfirm={onConfirmUpdate} />
      </div>
    </div>
  );
};

export default ChangeGroupProfileModal;
