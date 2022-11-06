import React from 'react';
import {Icon, Pressable, Stack, Text} from 'native-base';
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
      bgColor="pri.800"
      _pressed={{bgColor: 'rgba(0,0,0,0.5)'}}>
      <Stack direction="row" space="3" p="5" alignItems="center">
        <Icon as={FaIcon} name={iconName} size="lg" />
        <Text fontSize="18">{label}</Text>
      </Stack>
    </Pressable>
  );
}
