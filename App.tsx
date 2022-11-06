/**:
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {NativeBaseProvider, StatusBar} from 'native-base';
import theme from './src/theme';
import Navigator from './src/components/Navigator';
import DrawerProvider from './src/contexts/drawer';
import RouterProvider from './src/contexts/route';
import TimerProvider from './src/contexts/timer';

import SoundPlayer from 'react-native-sound-player';

const App = () => {
  SoundPlayer.loadSoundFile('alarm', 'mp3');
  // SoundPlayer.setNumberOfLoops(-1);
  SoundPlayer.setVolume(10);

  return (
    <NativeBaseProvider theme={theme}>
      <DrawerProvider>
        <RouterProvider>
          <TimerProvider>
            <StatusBar />
            <Navigator />
          </TimerProvider>
        </RouterProvider>
      </DrawerProvider>
    </NativeBaseProvider>
  );
};

export default App;
