import TextInput from "@components/common/TextInput";

interface ProfileInputsProps {
  groupName: string;
  description: string;
  onGroupNameChange: (e: React.FormEvent<HTMLInputElement>) => void;
  onDescriptionChange: (e: React.FormEvent<HTMLInputElement>) => void;
}
const ProfileInputs = ({ groupName, description, onGroupNameChange, onDescriptionChange }: ProfileInputsProps) => {
  return (
    <>
      <div className="mt-5">
        <label htmlFor="groupName" className="text-sm text-gray-700">
          모임명
        </label>
        <TextInput
          value={groupName}
          name={'groupName'}
          onChange={(e) => {
            onGroupNameChange(e);
          }}
          maxLength={20}
          mode={'underBar'}
        />
      </div>
      <div className="mt-5">
        <label htmlFor="description" className="text-sm text-gray-700">
          한 줄 소개
        </label>
        <TextInput
          value={description}
          name={'description'}
          onChange={(e) => {
            onDescriptionChange(e);
          }}
          maxLength={30}
          mode={'underBar'}
        />
      </div>
    </>
  );
};

export default ProfileInputs;