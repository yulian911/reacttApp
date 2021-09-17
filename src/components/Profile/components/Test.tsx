import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {useProfile} from '../../../Contex/profileContex';
import {getDateFormat} from '../../../shared/Formatters/dateHourFormat';
import {IPatientProfile} from '../../../shared/Models/PatientProfile.models';
import InputProfile from './InputProfile';

export interface ProfileProps {
  profile: IPatientProfile | null;
}

export default () => {
  const {profile} = useProfile();

  const [inputHeight, setInputHeight] = useState<string>('');
  const [inputWeight, setInputWeight] = useState<string>('');

  const handleChangeHeight = (value: any) => {
    setInputHeight(value);
  };
  const handleChangeWeight = (value: any) => {
    setInputWeight(value);
  };

  enum GENDER {
    male = 'Mężczyzna',
    female = 'Kobieta',
  }

  useEffect(() => {
    console.log('ładuje Test');
    return () => {
      console.log('rozłączam Test');
    };
  }, []);

  useEffect(() => {
    if (profile) {
      setInputHeight(profile.height ? profile.height.toString() : '');
      setInputWeight(profile.body_weight ? profile.body_weight.toString() : '');
    }
  }, [profile]);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.row}>
          <Text style={[styles.title, {textAlign: 'center'}]}>Twoja płeć</Text>
          <View style={styles.box}>
            <Text style={styles.title}>
              {profile?.gender
                ? profile.gender === 'male'
                  ? GENDER.male
                  : GENDER.female
                : 'Nie podano'}
            </Text>
          </View>
        </View>
        <View style={styles.row}>
          <Text style={[styles.title, {textAlign: 'center'}]}>
            Data urodzenia
          </Text>
          <View style={styles.box}>
            <Text style={styles.title}>
              {profile
                ? `${getDateFormat(profile.date_of_birth)}`
                : 'Nie podano'}
            </Text>
          </View>
        </View>
        <View style={styles.containerRow}>
          <View style={styles.row}>
            <InputProfile
              profileData={profile?.height}
              typeKeyboard="numeric"
              unit="cm"
              title="Wzrost"
              value={inputHeight}
              setValue={handleChangeHeight}
            />
          </View>
          <View style={styles.row}>
            <InputProfile
              profileData={profile?.body_weight}
              typeKeyboard="numeric"
              unit="kg"
              title="Masa ciała"
              value={inputWeight}
              setValue={handleChangeWeight}
            />
          </View>
        </View>

        {/* <View style={styles.row}>
          <Button title="Wyloguj" onPress={() => signOut()} />
        </View> */}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  row: {
    width: '100%',
    // height: RFValue(100),
  },
  container: {
    flex: 1,
  },
  title: {
    marginLeft: RFValue(5),
    letterSpacing: 1,
    fontSize: RFValue(18),
    marginBottom: RFValue(5),
  },
  text: {
    fontSize: RFValue(15),
    fontWeight: 'bold',
    color: 'white',
  },
  input: {
    marginLeft: RFValue(5),
    fontSize: RFValue(17),
    width: '40%',
    marginBottom: RFValue(15),
    padding: RFValue(5),
  },
  box: {
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    marginHorizontal: RFValue(10),
    alignItems: 'center',
    justifyContent: 'center',
    height: RFValue(50),
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 5,
  },
  containerRow: {
    marginLeft: RFValue(9),
    marginRight: RFValue(9),
  },
});
