import React from 'react';
import {Icon, IconButton as NBIconButton, IIconButtonProps} from 'native-base';
import FaIcon from 'react-native-vector-icons/FontAwesome';

type IconSize = 'sm' | 'md' | 'lg' | 'xs' | 'xl' | string;

type IconButtonProps = {
  iconName: string;
  color?: string;
  size?: IconSize;
} & IIconButtonProps;

export default function IconButton({
  iconName,
  color = 'white',
  size = 'md',
  disabled,
  ...rest
}: IconButtonProps) {
  return (
    <NBIconButton
      icon={
        <Icon
          as={FaIcon}
          textAlign="center"
          size={size}
          name={iconName}
          color={disabled ? 'gray.500' : color}
        />
      }
      borderRadius="full"
      size="lg"
      bgColor={disabled ? 'rgba(0,0,0,0.1)' : 'rgba(0,0,0,0.4)'}
      _pressed={{bgColor: 'rgba(0,0,0,0.6)'}}
      textAlign="center"
      {...rest}
    />
  );
}
