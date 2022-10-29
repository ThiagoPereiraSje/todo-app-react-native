import React from 'react';
import {Input, IInputProps} from 'native-base';

interface InputMaskProps extends IInputProps {
  mask: RegExp;
  replace: RegExp;
  delimiter: string;
  onChangeText: (text: string) => void;
}

export default function InputMask({
  mask,
  replace,
  delimiter,
  onChangeText,
  ...rest
}: InputMaskProps) {
  const handleMask = (value: string) => {
    if (mask.test(value)) {
      const newValue = value.match(mask);
      onChangeText(newValue.join(delimiter));

      return;
    }

    onChangeText(value.replace(replace, ''));
  };

  return <Input {...rest} onChangeText={handleMask} />;
}
