import React from 'react';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import styled from 'styled-components/native';

import {styleVariables} from '../../../Styles/styleVariables';
import {RFValue} from 'react-native-responsive-fontsize';

interface ProgressProps {
  data: any;
  capacity: number;
  unit?: string;
}
export const ProgressCircle = ({data, capacity, unit}: ProgressProps) => {
  return (
    <AnimatedCircularProgress
      size={RFValue(110)}
      width={10}
      backgroundWidth={1}
      rotation={225}
      backgroundColor={styleVariables.colors.green}
      fill={capacity}
      duration={500}
      lineCap="round"
      children={(fill: number) => (
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Text style={styles.value}>{data}</Text>
          {unit && <Text style={styles.unitTitle}>{unit}</Text>}
        </View>
      )}
      // children={(fill: number) => <Text>{fill}</Text>}
      tintColor={styleVariables.colors.green}
      arcSweepAngle={270}
      // onAnimationComplete={() => console.log('onAnimationComplete')}
    />
  );
};

const styles = StyleSheet.create({
  value: {
    fontSize: RFValue(16),
  },
  unitTitle: {
    marginTop: 5,
    fontSize: RFValue(12),
    // textAlign: 'center',
    // justifyContent: 'center',
    // position: 'absolute',
    // top: 100,
  },
});
