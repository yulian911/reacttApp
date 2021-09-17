import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {DefaultTheme, RadioButton} from 'react-native-paper';
import {IspQuestions} from '../questions/SpQuestions';
import {useTheme} from 'react-native-paper';
import {ISwallowProblem} from '../../../../../../shared/Models/SwallowProblem.models';
import {styleElements} from '../../../../../../Styles/styleElements';
import {RFValue} from 'react-native-responsive-fontsize';

interface IProps {
  question: IspQuestions;
  setQuestionnaire: React.Dispatch<React.SetStateAction<ISwallowProblem[]>>;
}

const SpTemplate = (props: IProps) => {
  const [checked, setChecked] = useState<string>('0');

  const radioBtns = [
    {
      value: 0,
      text: '0 - nie mam problemu ',
    },
    {
      value: 1,
      text: '1',
    },
    {
      value: 2,
      text: '2',
    },
    {
      value: 3,
      text: '3',
    },
    {
      value: 4,
      text: '4 - mam poważny problem',
    },
  ];

  const handleSaveAnswear = (value: string) => {
    setChecked(value);
    props.setQuestionnaire(prev => ({...prev, [props.question.name]: +value}));
  };

  useEffect(() => {
    handleSaveAnswear('0');
  }, []);

  return (
    <ScrollView style={styles.sLContent}>
      <Text style={styles.text}>{props.question.question}</Text>
      {radioBtns.map(el => (
        <TouchableOpacity
          style={[styleElements.tile, styles.radioBtn]}
          key={el.value}
          onPress={() => handleSaveAnswear(`${el.value}`)}>
          <RadioButton
            value={`${el.value}`}
            status={checked === `${el.value}` ? 'checked' : 'unchecked'}
            onPress={() => handleSaveAnswear(`${el.value}`)}
          />
          <Text>{el.text}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default React.memo(SpTemplate);

const styles = StyleSheet.create({
  sLContent: {
    height: '100%',
  },
  radioBtn: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    padding: 8,
    marginVertical: 8,
    marginHorizontal: 8,
  },
  text: {
    marginVertical: 5,
    fontSize: RFValue(16),
  },
});
