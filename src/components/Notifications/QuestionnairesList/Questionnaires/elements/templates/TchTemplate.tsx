import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {RadioButton} from 'react-native-paper';
import {RFValue} from 'react-native-responsive-fontsize';
import {IChangeTasteProblem} from '../../../../../../shared/Models/changeTasteProblem.models';
import {styleElements} from '../../../../../../Styles/styleElements';
import {ItchQuestions} from '../questions/tchQuestions';

interface IProps {
  question: ItchQuestions;
  setQuestionnaire: React.Dispatch<React.SetStateAction<IChangeTasteProblem[]>>;
}

const TchTemplate = (props: IProps) => {
  const [checked, setChecked] = useState<string>('0');

  const radioBtns = [
    {
      value: 0,
      text: 'w ogóle',
    },
    {
      value: 1,
      text: 'trochę',
    },
    {
      value: 2,
      text: 'do pewnego stopnia',
    },
    {
      value: 3,
      text: 'znacząco',
    },
    {
      value: 4,
      text: 'bardzo znacząco',
    },
  ];

  const handleSaveAnswear = (value: string) => {
    setChecked(value);
    props.setQuestionnaire(prev => ({...prev, [props.question.name]: +value}));
  };

  useEffect(() => {
    handleSaveAnswear('0');
  }, []);

  useEffect(() => {
    console.log('uruchamia się TchTemplate');
  }, []);

  return (
    <ScrollView
      style={styles.sLContent}
      contentInsetAdjustmentBehavior="automatic">
      <Text style={styles.textCategory}>{props.question.category}</Text>
      <Text style={styles.text}>{props.question.question}</Text>
      {radioBtns.map(el => {
        return (
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
        );
      })}
      {props.question.comment ? (
        <Text style={styles.textComment}>{props.question.comment}</Text>
      ) : null}
    </ScrollView>
  );
};

export default React.memo(TchTemplate);
// export default TchTemplate;

const styles = StyleSheet.create({
  sLContent: {
    // paddingHorizontal: 10,
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
  textCategory: {
    fontWeight: '700',
    fontSize: RFValue(16),
    marginVertical: 5,
  },
  textComment: {
    fontSize: RFValue(14),
    textAlign: 'center',
    // marginHorizontal: RFValue(8),
  },
});
