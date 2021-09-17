import {VStack, ScrollView} from 'native-base';
import React, {useEffect} from 'react';
import {useState} from 'react';
import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {useProfile} from '../../../Contex/profileContex';
import {IPatientProfile} from '../../../shared/Models/PatientProfile.models';
import {PatchGeneral} from '../../../shared/Requests/PatchGeneral';
import {styleElements} from '../../../Styles/styleElements';
import {styleVariables} from '../../../Styles/styleVariables';
export interface ProfileProps {
  profile: IPatientProfile | null;
}
interface IPalRatio {
  pal_ratio: number;
}
export default () => {
  const [clicked, setClicked] = useState<number>(1);
  const [show, setShow] = useState<number>();
  const [name, setName] = useState<IPalRatio>();
  const {profile, handleGetPatientProfile} = useProfile();

  useEffect(() => {
    if (profile?.pal_ratio === '1.7' && profile.gender === 'male') {
      setShow(1.7);
      setClicked(1.7);
    }
    if (profile?.pal_ratio === '1.6' && profile.gender === 'male') {
      setShow(1.6);
      setClicked(1.6);
    }
    if (profile?.pal_ratio === '1.5' && profile.gender === 'male') {
      setShow(1.5);
      setClicked(1.5);
    }
    if (profile?.pal_ratio === '1.6' && profile.gender === 'female') {
      setShow(1.6);
      setClicked(1.6);
    }
    if (profile?.pal_ratio === '1.5' && profile.gender === 'female') {
      setShow(1.5);
      setClicked(1.5);
    }
    if (profile?.pal_ratio === '1.4' && profile.gender === 'female') {
      setShow(1.4);
      setClicked(1.4);
    }
  }, [profile?.gender]);

  const handleRefreshRatio = (pal_ratio: number) => {
    const newPAL = {
      pal_ratio: pal_ratio,
    };
    setName(newPAL);
  };

  const change = async () => {
    handleRefreshRatio(clicked);

    const result = await PatchGeneral.profile({pal_ratio: show});
    if (result.error) {
      console.log('błąd patchowania', result);
      return;
    }
    console.log(result.data);
    handleGetPatientProfile();
  };

  useEffect(() => {
    if (clicked === 1) {
      setShow(1.5);
    }

    if (clicked === 2) {
      setShow(1.6);
    }

    if (clicked === 3) {
      setShow(1.7);
    }
  }, [clicked]);

  return (
    <VStack>
      <View style={styles.row}>
        <TouchableOpacity
          onPress={() => setClicked(1)}
          style={[
            styleElements.tile,
            {
              margin: 5,
              padding: 10,
              backgroundColor:
                clicked === 1 ? styleVariables.colors.green : 'white',
            },
          ]}>
          <Text
            style={[styles.title, {color: clicked === 1 ? 'white' : 'black'}]}>
            MAŁA
          </Text>
          <Text
            style={[styles.text, {color: clicked === 1 ? 'white' : 'black'}]}>
            Ponad 70% czasu w pozycji siedzącej mała aktywnośc
            fizyczna:1-2h/tydzien przewaga siedzenia,oglądanie TV , czytanie
            książek , lekkie prace domowe.
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity
          onPress={() => setClicked(2)}
          style={[
            styleElements.tile,
            {
              margin: 5,
              padding: 10,
              backgroundColor:
                clicked === 2 ? styleVariables.colors.green : 'white',
            },
          ]}>
          <Text
            style={[styles.title, {color: clicked === 2 ? 'white' : 'black'}]}>
            UMIARKOWANA
          </Text>
          <Text
            style={[styles.text, {color: clicked === 2 ? 'white' : 'black'}]}>
            Ponad 50% czasu w pozycji siedzącej lekka aktywnośc fizyczna:
            2-3h/tydzień spacery ,jazda na rowerze ,gimnastyka, praca w ogrodzie
            i inne.
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity
          onPress={() => setClicked(3)}
          style={[
            styleElements.tile,
            {
              margin: 5,
              padding: 10,
              backgroundColor:
                clicked === 3 ? styleVariables.colors.green : 'white',
            },
          ]}>
          <Text
            style={[styles.title, {color: clicked === 3 ? 'white' : 'black'}]}>
            DUŻA
          </Text>
          <Text
            style={[styles.text, {color: clicked === 3 ? 'white' : 'black'}]}>
            Ponad 70% czasu w ruchu lub praca fizzyczna aktywność fizyczna:
            {' >'}3h/tydzień jazda na rowerze ,praca w ogrodzie lub na działce
            ,bieganie , inne zajęcia sportowe.
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <Text style={styles.titlePAL}>Twój współczynnik PAL</Text>
        <View style={styles.rowPAL}>
          <View style={styles.boxPal}>
            <View
              style={[
                styleElements.tile,
                {
                  margin: RFValue(5),
                  width: RFValue(100),

                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: RFValue(5),
                },
              ]}>
              <Text style={styles.textPAL}>
                {clicked ? show : profile?.pal_ratio}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.rowButton}>
          <TouchableOpacity style={styles.button} onPress={() => change()}>
            <Text style={styles.titleButton}>Zapisz</Text>
          </TouchableOpacity>
        </View>
      </View>
    </VStack>
  );
};

const styles = StyleSheet.create({
  row: {
    width: '100%',
  },
  rowPAL: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    marginLeft: RFValue(5),
    letterSpacing: RFValue(1),
    fontSize: RFValue(13),
    marginBottom: RFValue(2),
  },
  titleActivity: {
    textAlign: 'center',
    marginLeft: RFValue(5),
    letterSpacing: RFValue(1),
    fontSize: RFValue(18),
    marginBottom: RFValue(2),
  },
  titlePAL: {
    textAlign: 'center',
    letterSpacing: 1,
    fontSize: RFValue(16),
    marginBottom: 2,
  },
  boxPal: {
    width: '100%',
    alignItems: 'center',
  },
  rowButton: {
    width: '100%',
    alignItems: 'center',
    height: RFValue(50),
    marginTop: RFValue(5),
  },
  button: {
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    height: RFValue(30),
    marginTop: RFValue(5),
    backgroundColor: '#00cc00',
    borderRadius: RFValue(10),
  },
  titleButton: {
    fontSize: RFValue(15),
    color: 'white',
  },
  text: {
    textAlign: 'justify',
    fontSize: RFValue(14),
    marginBottom: RFValue(1),
  },
  textPAL: {
    fontSize: RFValue(18),
    marginBottom: RFValue(1),
  },

  box: {
    borderWidth: 1,
  },
});
