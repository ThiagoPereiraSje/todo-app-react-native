import React from 'react';
import {Icon, IconButton as NBIconButton, IIconButtonProps} from 'native-base';
import FaIcon from 'react-native-vector-icons/FontAwesome';

type IconButtonProps = {
  iconName: string;
  color?: string;
} & IIconButtonProps;

export default function IconButton({
  iconName,
  color = 'white',
  ...rest
}: IconButtonProps) {
  return (
    <NBIconButton
      icon={
        <Icon
          as={FaIcon}
          textAlign="center"
          size="md"
          name={iconName}
          color={color}
        />
      }
      borderRadius="full"
      size="lg"
      bgColor="rgba(0,0,0,0.4)"
      _pressed={{bgColor: 'rgba(0,0,0,0.6)'}}
      textAlign="center"
      {...rest}
    />
  );
}
