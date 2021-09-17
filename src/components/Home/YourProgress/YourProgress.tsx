import React, {memo, useEffect, useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import {styleElements} from '../../../Styles/styleElements';
import {styleVariables} from '../../../Styles/styleVariables';
import {ScreenContainer} from '../components/ScreenContainer';
import {RFValue} from 'react-native-responsive-fontsize';
import ProgressDay from './components/ProgressDay';
import ProgressWeek from './components/ProgressWeek';

const YourProgress = () => {
  const [clickedRange, setClickedRange] = useState<number>(1);

  useEffect(() => {
    if (clickedRange === 1) {
      return;
    }
    if (clickedRange === 2) {
      return;
    }
  }, [clickedRange]);

  useEffect(() => {
    // console.log(Fetcher)
  }, []);

  return (
    // <ScreenContainer>
    <>
      <View style={styles.header}>
        <TouchableHighlight
          onPress={() => setClickedRange(1)}
          activeOpacity={0.9}
          underlayColor={styleVariables.colors.greenOpacity}
          style={[
            styleElements.tile,
            styles.headerEl,
            clickedRange === 1 && {
              backgroundColor: styleVariables.colors.green,
            },
          ]}>
          <Text
            style={[
              styles.headerElTitle,
              clickedRange === 1 && {
                color: '#fff',
              },
            ]}>
            Dziś
          </Text>
        </TouchableHighlight>
        {/* 
        // TODO Zrobić wykresy //
        <TouchableHighlight
          onPress={() => setClickedRange(2)}
          activeOpacity={0.9}
          disabled
          underlayColor={styleVariables.colors.greenOpacity}
          style={[
            styleElements.tile,
            styles.headerEl,
            clickedRange === 2 && {
              backgroundColor: styleVariables.colors.green,
            },
          ]}>
          <Text
            style={[
              styles.headerElTitle,
              clickedRange === 2 && {
                color: '#fff',
              },
            ]}>
            Ostatnie 7 dni
          </Text>
        </TouchableHighlight> */}
      </View>
      {/* <View style={styles.progress}> */}
      {clickedRange === 1 && <ProgressDay />}
      {clickedRange === 2 && <ProgressWeek />}
      {/* </View> */}
    </>
    // </ScreenContainer>
  );
};

export default memo(YourProgress);

const styles = StyleSheet.create({
  headerElTitle: {
    fontWeight: '600',
    fontSize: RFValue(16),
    textAlign: 'center',
    color: 'black',
  },
  header: {
    // maxHeight: 50,
    // width: Dimensions.get('window').width - 20,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerEl: {
    // width: '49%', // Jak będą wykresy
    width: '100%',
    padding: 10,
  },
  progress: {
    flex: 1,
    justifyContent: 'space-between',
  },
});
