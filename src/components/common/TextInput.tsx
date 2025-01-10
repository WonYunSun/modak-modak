import React from 'react';

export interface TextInputProps {
  name: string;
  onChange: (e: React.FormEvent<HTMLInputElement>) => void;
  maxLength: number;
  placeHolder?: string;
  value?: string;
  mode?: 'roundBorder' | 'underBar';
}

const TextInput = ({ placeHolder, value, name, onChange, maxLength, mode = 'roundBorder' }: TextInputProps) => {
  const modes = {
    roundBorder: 'border border-solid border-gray-300 px-4 py-3 text-base rounded-lg focus:outline-gray-700',
    underBar: 'border-b border-solid border-gray-400 py-2 text-base focus:outline-none'
  };

  return (
    <div className="flex flex-col gap-2">
      <input
        className={modes[mode]}
        name={name}
        type="text"
        onChange={onChange}
        placeholder={placeHolder}
        value={value}
        maxLength={maxLength}
      />
      <p className="ml-auto font-normal	text-gray-400 text-sm leading-[140%]">
        {value ? value.length : 0} / {maxLength}자
      </p>
    </div>
  );
};

export default TextInput;
