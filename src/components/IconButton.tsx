import React from 'react';
import {Icon, IconButton as NBIconButton, IIconButtonProps} from 'native-base';
import FaIcon from 'react-native-vector-icons/FontAwesome';

type IconButtonProps = {
  iconName: string;
  color?: string;
  _pressed?: IIconButtonProps;
};

export default function IconButton({
  iconName,
  color = 'white',
  _pressed,
}: IconButtonProps) {
  return (
    <NBIconButton
      icon={
        <Icon as={FaIcon} textAlign="center" name={iconName} color={color} />
      }
      borderRadius="full"
      bgColor="rgba(0,0,0,0.4)"
      _pressed={_pressed}
      textAlign="center"
    />
  );
}
