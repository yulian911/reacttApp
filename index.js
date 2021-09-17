import React from 'react';
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {Provider as PaperProvider, DefaultTheme} from 'react-native-paper';
import {NativeBaseProvider} from 'native-base';

export default function Main() {
  // const theme = {
  //     ...DefaultTheme,
  //     // Specify custom property
  //     myOwnProperty: true,
  //       // Specify custom property in nested object
  //     colors: {
  //       myOwnColor: '#BADA55',
  //     }
  //   };

    const theme = {
        ...DefaultTheme,
        dark: false,
        // Specify custom property
        myOwnProperty: true,
          // Specify custom property in nested object
      };

    return (
    <PaperProvider 
    theme={theme}
    >
      <App />
    </PaperProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
