import React from 'react';
import {Box} from 'native-base';
import TitleBar from '../components/TitleBar';

export default function Home() {
  return (
    <>
      <Box>
        <TitleBar leftTitle="Home Page" rightTitle="@" />
      </Box>
    </>
  );
}
