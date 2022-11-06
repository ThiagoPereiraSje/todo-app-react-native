/**:
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect} from 'react';
import {NativeBaseProvider, StatusBar} from 'native-base';
import theme from './src/theme';
import Navigator from './src/components/Navigator';
import DrawerProvider from './src/contexts/drawer';
import RouterProvider from './src/contexts/route';
import TimerProvider from './src/contexts/timer';
import TaskProvider from './src/contexts/task';
import Sound from './src/services/sound';

const App = () => {
  useEffect(() => {
    return () => {
      Sound.release();
    };
  }, []);

  return (
    <NativeBaseProvider theme={theme}>
      <DrawerProvider>
        <RouterProvider>
          <TimerProvider>
            <TaskProvider>
              <StatusBar hidden />
              <Navigator />
            </TaskProvider>
          </TimerProvider>
        </RouterProvider>
      </DrawerProvider>
    </NativeBaseProvider>
  );
};

export default App;
