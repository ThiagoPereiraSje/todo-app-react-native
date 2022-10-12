import React from 'react';
import {Box, Text} from 'native-base';
import Spinner from '../components/Spinner';

export default function Home() {
  return (
    <>
      <Box>
        <Text>Home Page</Text>
        <Spinner />
      </Box>
    </>
  );
}
