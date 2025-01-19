import { useState } from 'react';
import Image from 'next/image';
import Layout from '@app/groups/[id]/schedules/_components/layout/Layout';
import Label from '@components/common/Label';
import { uploadFile } from '@utils/uploadFile';
import { GroupsType } from '@ts/supabaseTableRowTypes';
import { Modification } from '@components/icons';

type GroupImageFormProps = {
  onNext: (data: Pick<GroupsType, 'image_url'>) => void;
  onPrev: () => void;
  prevData: { imgurl: GroupsType['image_url'] };
};

const GroupImageForm = ({ onNext, onPrev, prevData }: GroupImageFormProps) => {
  const [values, setValues] = useState({ imgurl: prevData.imgurl || '/icons/group-image.webp' });

  const handleNext = () => {
    onNext({ image_url: values.imgurl });
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const publicUrl = await uploadFile('profiles', 'groups', file);
      setValues((prev) => ({ ...prev, imgurl: publicUrl }));
    } catch (error) {
      console.error('이미지 업로드 실패:', error);
    }
  };

  return (
    <Layout isDisabled={false} onNext={handleNext} onPrev={onPrev}>
      <div>
        <Label htmlFor="" label="대표 사진" required={true} description="모임을 대표할 사진을 등록해주세요" />
        <div>
          <div className="p-5 flex flex-col items-center">
            <div>
              <div className="relative">
                <div className="m-auto w-24 h-24">
                  <Image src={values.imgurl} alt={'그룹 프로필'} width={200} height={200} />
                </div>
                <label htmlFor="profilePhoto" className="block absolute bottom-[-8px] right-[-14px]">
                  <Modification />
                </label>
              </div>
            </div>
            <input
              type="file"
              accept="image/*"
              name="profilePhoto"
              id="profilePhoto"
              className="hidden"
              onChange={handleChange}
            />
          </div>
          <p className="text-gray-400 text-sm">실제로 반영되는 사진 크기에요</p>
        </div>
      </div>
    </Layout>
  );
};

export default GroupImageForm;
