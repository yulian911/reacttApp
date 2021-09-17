import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {ProgressBar} from 'react-native-paper';
import {RFValue} from 'react-native-responsive-fontsize';
import {styleElements} from '../../../Styles/styleElements';
import {styleVariables} from '../../../Styles/styleVariables';

export default ({progress}: {progress: number}) => {
  useEffect(() => {
    console.log('ładuje progressBar');
    return () => {
      console.log('rozłączam progressBar');
    };
  }, []);

  return (
    <View style={styles.progressBarContainer}>
      <View style={styleElements.tile}>
        <ProgressBar
          progress={progress}
          style={styles.progressBar}
          color={styleVariables.colors.green}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  progressBarContainer: {
    margin: 10,
  },
  progressBar: {
    borderRadius: 10,
    height: RFValue(8),
  },
});
