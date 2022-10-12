import React from 'react';
import {Box} from 'native-base';
import TitleBar from '../components/TitleBar';
import IconButton from '../components/IconButton';

export default function Home() {
  return (
    <>
      <Box>
        <TitleBar leftTitle="Home Page" rightTitle="@" />
        <IconButton iconName="save" />
      </Box>
    </>
  );
}
