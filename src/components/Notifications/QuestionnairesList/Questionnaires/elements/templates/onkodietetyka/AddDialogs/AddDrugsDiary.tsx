import React, {useState} from 'react';
import {Alert, ScrollView, StyleSheet, View, Text} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import {getDateFormat} from '../../../../../../../../shared/Formatters/dateHourFormat';
import {styleVariables} from '../../../../../../../../Styles/styleVariables';
import {IOnkodietetyka} from '../../../../../../../../shared/Models/Onkodietetyka.models';
import {RFValue} from 'react-native-responsive-fontsize';
import {styleElements} from '../../../../../../../../Styles/styleElements';
import {IDrugsDiary} from '../../../../../../../../shared/Models/DrugsDiary.models';
import DatePicker from './components/DatePicker';

interface IProps {
  setQuestionnaire: React.Dispatch<React.SetStateAction<IOnkodietetyka>>;
  questionnaire: IOnkodietetyka;
  hideDialog: () => void;
}

export default (props: IProps) => {
  const [singleDrugsDiary, setSingleDrugsDiary] = useState<IDrugsDiary>({
    name: '',
    date_from: '',
    date_to: '',
    dose: '',
    frequency: '',
    note: '',
    commited_by: '',
  });

  const handleConfirmFrom = (date: Date) => {
    setSingleDrugsDiary(prev => ({
      ...prev,
      date_from: getDateFormat(date, '-', true),
    }));
  };

  const handleConfirmTo = (date: Date) => {
    setSingleDrugsDiary(prev => ({
      ...prev,
      date_to: getDateFormat(date, '-', true),
    }));
  };

  const handleAddDrugsDiary = () => {
    const checkInputs = () => {
      let result = false;
      Object.values(singleDrugsDiary).map(value => {
        if (value.length === 0) {
          result = true;
        } else {
          result = false;
        }
      });
      return result;
    };

    if (checkInputs()) {
      Alert.alert('Błąd', `Wszystkie pola muszą być wypełnione.`);
    } else {
      props.questionnaire.drugs_diary.push(singleDrugsDiary);
      props.hideDialog();
    }
  };

  return (
    <>
      <View style={styles.section}>
        <View style={styleElements.row}>
          <TextInput
            style={styles.input}
            label="Nazwa handlowa"
            outlineColor={styleVariables.colors.green}
            value={`${singleDrugsDiary.name}`}
            onChangeText={text =>
              setSingleDrugsDiary(prev => ({...prev, name: text}))
            }
          />
        </View>
      </View>
      <View style={styles.section}>
        <View style={styleElements.row}>
          <DatePicker
            value={singleDrugsDiary.date_from}
            endFunction={handleConfirmFrom}
            label="Od kiedy"
            widthPercent="45%"
          />
          <DatePicker
            value={singleDrugsDiary.date_to}
            endFunction={handleConfirmTo}
            label="Do kiedy"
            widthPercent="45%"
          />
        </View>
      </View>
      <View style={styles.section}>
        <View style={styleElements.row}>
          <TextInput
            style={styles.input}
            label="Dawka"
            outlineColor={styleVariables.colors.green}
            value={`${singleDrugsDiary.dose}`}
            onChangeText={text =>
              setSingleDrugsDiary(prev => ({...prev, dose: text}))
            }
          />
        </View>
        <View style={styleElements.row}>
          <TextInput
            style={styles.input}
            label="Częstotliwość przyjmowania"
            outlineColor={styleVariables.colors.green}
            value={`${singleDrugsDiary.frequency}`}
            onChangeText={text =>
              setSingleDrugsDiary(prev => ({...prev, frequency: text}))
            }
          />
        </View>
        <View style={styleElements.row}>
          <TextInput
            label="Uwagi, dolegliwości"
            multiline
            style={[styles.input, {height: 150}]}
            value={singleDrugsDiary.note}
            onChangeText={text =>
              setSingleDrugsDiary(prev => ({
                ...prev,
                note: text,
              }))
            }
          />
        </View>
        <View style={styleElements.row}>
          <TextInput
            style={styles.input}
            label="Kto zlecił"
            outlineColor={styleVariables.colors.green}
            value={`${singleDrugsDiary.commited_by}`}
            onChangeText={text =>
              setSingleDrugsDiary(prev => ({...prev, commited_by: text}))
            }
          />
        </View>
      </View>
      <View style={styles.section}>
        <Button
          color={styleVariables.colors.green}
          icon="plus"
          style={{marginVertical: 15}}
          mode="outlined"
          onPress={() => {
            Alert.alert('Komunikat', `Czy na pewno zapisać suplement/lek?`, [
              {text: 'Anuluj', onPress: undefined},
              {text: 'Zapisz', onPress: () => handleAddDrugsDiary()},
            ]);
          }}>
          <Text>Dodaj</Text>
        </Button>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    // paddingVertical: 24,
    // height: '100%',
    // justifyContent: 'flex-start',
    // alignItems: 'center',
    paddingHorizontal: 5,
    // width: '100%',
  },
  row: {
    paddingVertical: '1%',
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 15,
  },
  input: {
    width: '100%',
  },
  section: {
    paddingBottom: 5,
    flexDirection: 'column',
    justifyContent: 'space-around',
    width: '100%',
  },
  listText: {
    fontSize: RFValue(16),
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  textInput: {
    width: '45%',
  },
});
