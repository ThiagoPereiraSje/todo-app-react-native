import React from 'react';
import {Avatar, Box, Text} from 'native-base';
import MenuItem from '../MenuItem';

type NavViewProps = {
  content?: JSX.Element;
};

function DefaultContent() {
  return (
    <Box>
      <MenuItem label="Voltar" />
    </Box>
  );
}

export default function NavView({content}: NavViewProps) {
  return (
    <Box bgColor="pri.800" flex={1}>
      <Box alignItems="center" p="20px">
        <Avatar source={require('../../assets/user.png')} size="xl" />

        <Text fontWeight="bold" fontSize={20}>
          Thiago Pereira
        </Text>
      </Box>
      {content || <DefaultContent />}
    </Box>
  );
}
