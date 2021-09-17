import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {RFValue} from 'react-native-responsive-fontsize';
import {useProfile} from '../../../Contex/profileContex';
import {styleElements} from '../../../Styles/styleElements';
import InputICE from './InputICE';
import InputProfile from './InputProfile';

export default () => {
  const {ice} = useProfile();

  const [inputNumber, setInputNumber] = useState<string>('');
  const [inputLastName, setLastName] = useState<string>('');
  const [inputFirstName, setFirstName] = useState<string>('');
  const [inputAddress, setInputAdress] = useState<string>('');

  const handleChangeNumber = (value: any) => {
    setInputNumber(value);
  };
  const handleChangeLastName = (value: string) => {
    setLastName(value);
  };
  const handleChangeFirstName = (value: string) => {
    setFirstName(value);
  };
  const handleChangeAdsress = (value: string) => {
    setInputAdress(value);
  };

  return (
    <ScrollView style={styles.rowBox}>
      <View style={styles.row}>
        <InputICE
          profileData={ice?.first_name}
          typeKeyboard="default"
          title="Imię"
          value={inputFirstName}
          setValue={handleChangeFirstName}
        />
        <View style={styles.row}>
          <InputICE
            profileData={ice?.last_name}
            typeKeyboard="default"
            title="Nazwisko"
            value={inputLastName}
            setValue={handleChangeLastName}
          />
        </View>
        <View style={styles.row}>
          <InputICE
            profileData={ice?.phone_number}
            typeKeyboard="numeric"
            title="Numer telefonu"
            value={inputNumber}
            setValue={handleChangeNumber}
          />
        </View>
        <View style={styles.row}>
          <InputICE
            profileData={ice?.address}
            typeKeyboard="default"
            title="Adres"
            value={inputAddress}
            setValue={handleChangeAdsress}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  rowBox: {
    width: '100%',
    paddingVertical: '1%',
    flex: 1,
    flexDirection: 'column',
  },
  row: {
    width: '100%',
  },
  text: {
    marginLeft: RFValue(5),
    fontSize: RFValue(17),
    marginBottom: RFValue(5),
  },
  input: {
    marginLeft: RFValue(5),
    fontSize: RFValue(17),
    width: '95%',
    marginBottom: RFValue(15),
    padding: RFValue(5),
  },
});
