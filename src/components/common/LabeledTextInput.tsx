import React from 'react';
import Label, { LabelProps } from './Label';
import TextInput, { TextInputProps } from './TextInput';

export interface LabeledTextInputProps extends LabelProps, TextInputProps {}

const LabeledTextInput = ({
  onChange,
  value,
  name,
  maxLength,
  placeHolder,
  label,
  required,
  description
}: LabeledTextInputProps) => {
  return (
    <div className="flex flex-col gap-4">
      <Label htmlFor={name} label={label} required={required} description={description} />
      <TextInput
        placeHolder={placeHolder}
        name={name}
        onChange={onChange}
        value={value}
        maxLength={maxLength}
      />
    </div>
  );
};

export default LabeledTextInput;
