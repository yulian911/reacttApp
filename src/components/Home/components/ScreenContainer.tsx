import React from 'react';
import {StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {styleVariables} from '../../../Styles/styleVariables';

export const ScreenContainer = ({children}: {children: any}) => (
  // <LinearGradient
  //   colors={[styleVariables.colors.greenOpacity, 'white']}
  //   start={{x: 1, y: 0}}
  //   end={{x: 0.5, y: 1}}
  //   locations={[0, 1]}>
  <View style={styles.screen}>{children}</View>
  // </LinearGradient>
);

const styles = StyleSheet.create({
  screen: {
    height: '100%',
    justifyContent: 'space-around',
    padding: 10,
    position: 'relative',
  },
});
