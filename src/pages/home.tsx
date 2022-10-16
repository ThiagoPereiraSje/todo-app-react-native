import React, {useState} from 'react';
import {Box} from 'native-base';
import TitleBar from '../components/TitleBar';
import IconButton from '../components/IconButton';
import InputMask, {formatTime} from '../components/InputMask';
import MenuItem from '../components/MenuItem';

export default function Home() {
  const [text, setText] = useState('');

  return (
    <>
      <Box>
        <TitleBar leftTitle="Home Page" rightTitle="@" />
        <IconButton iconName="save" />
        <InputMask
          value={text}
          maxLength={8}
          keyboardType="numeric"
          onMaskText={formatTime}
          onChangeText={value => setText(value)}
        />

        <MenuItem label="MenuItem" />
      </Box>
    </>
  );
}
