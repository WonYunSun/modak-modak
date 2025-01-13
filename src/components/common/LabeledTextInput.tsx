import React from 'react';
import Label, { LabelProps } from './Label';
import TextInput, { TextInputProps } from './TextInput';

export interface LabeledTextInputProps extends LabelProps, TextInputProps {
  className?: string;
}

const LabeledTextInput = ({
  onChange,
  value,
  name,
  maxLength,
  placeHolder,
  label,
  required,
  description,
  className
}: LabeledTextInputProps) => {
  return (
    <div className={`flex flex-col gap-4 w-full ${className}`}>
      <Label htmlFor={name} label={label} required={required} description={description} />
      <TextInput placeHolder={placeHolder} name={name} onChange={onChange} value={value} maxLength={maxLength} />
    </div>
  );
};

export default LabeledTextInput;
