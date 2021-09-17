import React from 'react';
import {Dimensions, StyleSheet, Text} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {RFValue} from 'react-native-responsive-fontsize';
import {styleElements} from '../../../Styles/styleElements';

export default ({navigation, route}: any) => {
  const temporary = [
    {
      id: 1,
      label: 'Onkodietetyka',
      navigation: 'Onkodietetyka',
    },
    {
      id: 2,
      label: 'Skala zmiany smaku wywołanej leczeniem',
      navigation: 'TasteChange',
    },
    {
      id: 3,
      label: 'Problemy z połykaniem',
      navigation: 'SwallowProblem',
    },
  ];

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={styles.questionnairesList}>
      {temporary.map(el => (
        <TouchableOpacity
          style={[styles.tile, styleElements.tile]}
          key={el.id}
          onPress={() => navigation.push(el.navigation)}>
          <Text style={styles.text}>{el.label}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  questionnairesList: {
    marginTop: 10,
  },
  tile: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'center',
    paddingHorizontal: 25,
    width: Dimensions.get('window').width - 20,
    marginBottom: 10,
    height: 50,
  },
  text: {
    fontSize: RFValue(16),
    width: '80%',
  },
});
