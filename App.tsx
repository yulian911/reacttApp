import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {StatusBar, StyleSheet, useColorScheme, View} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import RNBootSplash from 'react-native-bootsplash';
import LoginPage from './src/components/LoginPage/LoginPage';
import Intro from './src/components/Intro/Intro';
// import 'react-native-gesture-handler'
import LinearGradient from 'react-native-linear-gradient';
import {styleVariables} from './src/Styles/styleVariables';
import {BlurView} from '@react-native-community/blur';
import Navigation from './src/components/Navigation/Navigation';
import {AuthProvider} from './src/Auth/Auth';
import {Provider} from 'react-redux';
import {store} from './src/store';
import {NativeBaseProvider} from 'native-base';
import {ProfileProvider} from './src/Contex/profileContex';

const App = () => {
  const [startApp, setStartApp] = useState<boolean>(false);

  // const isDarkMode = useColorScheme() === 'dark';

  // const backgroundStyle = {
  //   backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  // };

  useEffect(() => {
    setTimeout(() => {
      RNBootSplash.hide({fade: true});
    }, 500);
  }, []);

  return (
    <View style={styles.appContainer}>
      <StatusBar
        barStyle={'dark-content'}
        // translucent
        animated={true}
        // hidden={true}
        showHideTransition={'slide'}
        backgroundColor="transparent"
      />
      <NativeBaseProvider>
        <Provider store={store}>
          <AuthProvider>
            <ProfileProvider>
              <Navigation />
            </ProfileProvider>
          </AuthProvider>
        </Provider>
      </NativeBaseProvider>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    // justifyContent: 'center',
    // flexDirection: 'row',
    // alignItems: 'center',
    // height: '100%',
    // width: '100%',
    // marginTop: StatusBar.currentHeight,
  },
});
