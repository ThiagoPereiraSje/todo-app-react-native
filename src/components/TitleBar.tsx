import React from 'react';
import {Box, Text} from 'native-base';

type TitleBarProps = {
  leftTitle?: string;
  rightTitle?: string;
};

export default function TitleBar({leftTitle, rightTitle}: TitleBarProps) {
  return (
    <Box
      bgColor="sec.750"
      p="2"
      flexDirection="row"
      justifyContent="space-between">
      <Text fontWeight="bold" fontSize="18">
        {leftTitle}
      </Text>
      <Text fontWeight="bold" fontSize="18">
        {rightTitle}
      </Text>
    </Box>
  );
}
