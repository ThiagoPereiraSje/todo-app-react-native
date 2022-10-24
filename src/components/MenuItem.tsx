import React from 'react';
import {Icon, Pressable, Text} from 'native-base';
import FaIcon from 'react-native-vector-icons/FontAwesome';

type MenuItemProps = {
  label: string;
  iconName?: string;
  onPress?: () => void;
};

export default function MenuItem({
  label,
  iconName = 'calendar-o',
  onPress,
}: MenuItemProps) {
  return (
    <Pressable
      onPress={onPress}
      _pressed={{bgColor: 'rgba(0,0,0,0.5)'}}
      flexDirection="row"
      alignItems="center"
      p="8px">
      <Icon
        as={FaIcon}
        size={6}
        textAlign="center"
        name={iconName}
        marginRight="8px"
      />

      <Text>{label}</Text>
    </Pressable>
  );
}
