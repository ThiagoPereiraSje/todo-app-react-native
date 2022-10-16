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
import Database from './src/services/database';
import Home from './src/pages/home';
import DrawerProvider from './src/contexts/drawer';
import RouterProvider from './src/contexts/route';

const App = () => {
  Database.init();

  return (
    <NativeBaseProvider theme={theme}>
      <DrawerProvider>
        <RouterProvider>
          <StatusBar hidden />
          <Home />
        </RouterProvider>
      </DrawerProvider>
    </NativeBaseProvider>
  );
};

export default App;
