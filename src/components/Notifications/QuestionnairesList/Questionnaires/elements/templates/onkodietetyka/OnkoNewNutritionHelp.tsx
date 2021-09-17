import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {DefaultTheme, RadioButton, TextInput} from 'react-native-paper';
import {IspQuestions} from '../../questions/SpQuestions';
import {useTheme} from 'react-native-paper';
import {ISwallowProblem} from '../../../../../../../shared/Models/SwallowProblem.models';
import {styleElements} from '../../../../../../../Styles/styleElements';
import {RFValue} from 'react-native-responsive-fontsize';
import {IOnkodietetyka} from '../../../../../../../shared/Models/Onkodietetyka.models';
import {styleVariables} from '../../../../../../../Styles/styleVariables';

interface IProps {
  item: any;
  setQuestionnaire: React.Dispatch<React.SetStateAction<IOnkodietetyka>>;
  questionnaire: IOnkodietetyka;
}

const OnkoNewNutritionHelp = (props: IProps) => {
  return (
    <>
      <Text style={styles.text}>{props.item.question}</Text>
      <TextInput
        style={styles.input}
        label="Treść"
        outlineColor={styleVariables.colors.green}
        multiline
        value={`${props.questionnaire.new_nutrition_way_help}`}
        onChangeText={text =>
          props.setQuestionnaire(prev => ({
            ...prev,
            new_nutrition_way_help: text,
          }))
        }
      />
    </>
  );
};

export default React.memo(OnkoNewNutritionHelp);

const styles = StyleSheet.create({
  sLContent: {
    height: '80%',
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
  input: {
    marginTop: 15,
    height: 300,
  },
});
