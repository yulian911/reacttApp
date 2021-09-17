import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {styleVariables} from '../../../Styles/styleVariables';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {RFValue} from 'react-native-responsive-fontsize';

export const DoneButton = (title: string = 'Zakończ') => (
  <View style={styleNextButton}>
    <Text style={[styles.buttonNextText, styles.buttonText]}>{title}</Text>
  </View>
);

export const NextButton = () => (
  <View style={styleNextButton}>
    <Text style={[styles.buttonNextText, styles.buttonText]}>Dalej</Text>
    <Icon name="arrow-forward-ios" color="#fff" size={20} />
  </View>
);

export const SaveButton = ({
  bgColor,
  textColor,
}: {
  bgColor: string;
  textColor: string;
}) => (
  <View style={[styles.buttons, {backgroundColor: bgColor}]}>
    <Text style={[{color: textColor}, styles.buttonText]}>Zapisz</Text>
    <Icon name="arrow-forward-ios" color={textColor} size={RFValue(20)} />
  </View>
);

export const PrevButton = (title: string = 'Wstecz') => (
  <View style={stylePrevButton}>
    <Icon name="arrow-back-ios" color="gray" size={20} />
    <Text style={[styles.buttonPrevText, styles.buttonText]}>{title}</Text>
  </View>
);

const styles = StyleSheet.create({
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: RFValue(10),
    padding: RFValue(10),
    width: RFValue(100),
    borderRadius: RFValue(10),
  },
  buttonPrev: {
    backgroundColor: '#fff',
  },
  buttonNext: {
    backgroundColor: styleVariables.colors.green,
  },
  buttonText: {
    fontSize: RFValue(16),
    // textAlign: 'center',
  },
  buttonNextText: {
    color: '#fff',
  },
  buttonPrevText: {
    color: 'gray',
  },
});

const styleNextButton = StyleSheet.flatten([styles.buttons, styles.buttonNext]);
const stylePrevButton = StyleSheet.flatten([styles.buttons, styles.buttonPrev]);
