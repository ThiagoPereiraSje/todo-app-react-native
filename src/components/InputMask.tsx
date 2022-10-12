import React from 'react';
import {Input, IInputProps} from 'native-base';

interface InputMaskProps extends IInputProps {
  onMaskText: (text: string) => string;
  onChangeText: (text: string) => void;
}

export function formatTime(value: string): string {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{2})/, '$1:')
    .replace(/(\d{2}:\d{2})/, '$1:');
}

export default function InputMask({
  onMaskText,
  onChangeText,
  ...rest
}: InputMaskProps) {
  const handleChangeText = (text: string) => {
    onChangeText(onMaskText(text));
  };

  return <Input {...rest} onChangeText={handleChangeText} />;
}
