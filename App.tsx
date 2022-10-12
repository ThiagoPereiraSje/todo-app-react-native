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
import Database from './src/services/database';

const App = () => {
  Database.init();

  return (
    <NativeBaseProvider>
      <StatusBar hidden />
    </NativeBaseProvider>
  );
};
export default App;
