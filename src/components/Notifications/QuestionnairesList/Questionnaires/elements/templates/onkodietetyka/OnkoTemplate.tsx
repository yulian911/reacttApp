import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {DefaultTheme, RadioButton} from 'react-native-paper';
import {IspQuestions} from '../../questions/SpQuestions';
import {useTheme} from 'react-native-paper';
import {ISwallowProblem} from '../../../../../../../shared/Models/SwallowProblem.models';
import {styleElements} from '../../../../../../../Styles/styleElements';
import {RFValue} from 'react-native-responsive-fontsize';
import {IOnkodietetyka} from '../../../../../../../shared/Models/Onkodietetyka.models';

interface IRadioButtons {
  value: number;
  text: string;
}

interface IQuestions {
  name: string;
  id: number;
  title: string;
  question: string;
  radioBtns?: IRadioButtons[];
}

interface IProps {
  question: IQuestions;
  setQuestionnaire: React.Dispatch<React.SetStateAction<IOnkodietetyka>>;
}

const OnkoTemplate = (props: IProps) => {
  const [checked, setChecked] = useState<string>('0');

  const radioBtns: IRadioButtons[] = [
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

  const radioButtons = () => {
    if (props.question.radioBtns) {
      return props.question.radioBtns;
    } else {
      return radioBtns;
    }
  };

  return (
    <>
      <Text style={styles.text}>{props.question.question}</Text>
      {radioButtons().map(el => (
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
    </>
  );
};

export default React.memo(OnkoTemplate);

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
  title: {
    marginVertical: 10,
    fontSize: RFValue(18),
    // textAlign: 'center',
    fontWeight: '700',
  },
  text: {
    marginVertical: 5,
    fontSize: RFValue(16),
  },
});
