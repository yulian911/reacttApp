import React, {useEffect} from 'react';
import {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {IOnkodietetyka} from '../../../../../../../shared/Models/Onkodietetyka.models';
import {styleElements} from '../../../../../../../Styles/styleElements';
import {styleVariables} from '../../../../../../../Styles/styleVariables';

interface IQuestions {
  name: string;
  id: number;
  question: string;
}

interface IProps {
  question: IQuestions;
  setQuestionnaire: React.Dispatch<React.SetStateAction<IOnkodietetyka>>;
}

export default (props: IProps) => {
  const [show, setShow] = useState<string>('low');

  useEffect(() => {
    props.setQuestionnaire(prev => ({
      ...prev,
      [props.question.name]: show,
    }));
  }, [show]);

  return (
    <>
      <Text style={styles.textTop}>{props.question.question}</Text>
      <View style={styles.row}>
        <TouchableOpacity
          onPress={() => setShow('low')}
          style={[
            styleElements.tile,
            {
              margin: 5,
              padding: 10,
              backgroundColor:
                show === 'low' ? styleVariables.colors.green : 'white',
            },
          ]}>
          <Text
            style={[styles.title, {color: show === 'low' ? 'white' : 'black'}]}>
            MAŁA
          </Text>
          <Text
            style={[styles.text, {color: show === 'low' ? 'white' : 'black'}]}>
            Ponad 70% czasu w pozycji siedzącej mała aktywnośc
            fizyczna:1-2h/tydzien przewaga siedzenia,oglądanie TV , czytanie
            książek , lekkie prace domowe.
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity
          onPress={() => setShow('medium')}
          style={[
            styleElements.tile,
            {
              margin: 5,
              padding: 10,
              backgroundColor:
                show === 'medium' ? styleVariables.colors.green : 'white',
            },
          ]}>
          <Text
            style={[
              styles.title,
              {color: show === 'medium' ? 'white' : 'black'},
            ]}>
            UMIARKOWANA
          </Text>
          <Text
            style={[
              styles.text,
              {color: show === 'medium' ? 'white' : 'black'},
            ]}>
            Ponad 50% czasu w pozycji siedzącej lekka aktywnośc fizyczna:
            2-3h/tydzień spacery ,jazda na rowerze ,gimnastyka, praca w ogrodzie
            i inne.
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity
          onPress={() => setShow('high')}
          style={[
            styleElements.tile,
            {
              margin: 5,
              padding: 10,
              backgroundColor:
                show === 'high' ? styleVariables.colors.green : 'white',
            },
          ]}>
          <Text
            style={[
              styles.title,
              {color: show === 'high' ? 'white' : 'black'},
            ]}>
            DUŻA
          </Text>
          <Text
            style={[styles.text, {color: show === 'high' ? 'white' : 'black'}]}>
            Ponad 70% czasu w ruchu lub praca fizzyczna aktywność fizyczna:{' '}
            {'>'}3h/tydzień jazda na rowerze ,praca w ogrodzie lub na działce
            ,bieganie , inne zajęcia sportowe.
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  sLContent: {
    height: '100%',
  },
  row: {
    width: '100%',
  },
  title: {
    marginLeft: 5,
    letterSpacing: 1,
    fontSize: RFValue(13),
    marginBottom: 2,
  },
  text: {
    marginLeft: 5,
    fontSize: RFValue(13),
    marginBottom: RFValue(1),
  },
  box: {
    borderWidth: 1,
  },

  titleTop: {
    marginVertical: 10,
    fontSize: RFValue(18),
    // textAlign: 'center',
    fontWeight: '700',
  },
  textTop: {
    marginVertical: 5,
    fontSize: RFValue(16),
  },
});
