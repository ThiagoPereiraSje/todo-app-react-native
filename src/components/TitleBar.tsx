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
      p="4px"
      flexDirection="row"
      justifyContent="space-between">
      <Text fontWeight="bold" fontSize={13}>
        {leftTitle}
      </Text>
      <Text fontWeight="bold" fontSize={13}>
        {rightTitle}
      </Text>
    </Box>
  );
}
