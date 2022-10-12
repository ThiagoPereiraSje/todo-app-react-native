import React from 'react';
import {Box} from 'native-base';
import {ActivityIndicator} from 'react-native';

export default function Spinner() {
  return (
    <Box height="full" justifyContent="center">
      <ActivityIndicator size={220} color="#06b6d4" />
    </Box>
  );
}
