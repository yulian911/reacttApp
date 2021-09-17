import React, {useState} from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  // Text,
  View,
} from 'react-native';
import {Text} from 'react-native-paper';
import {TextInput, Button} from 'react-native-paper';
import {useAuth} from '../../../../../../../../Auth/Auth';
import {styleVariables} from '../../../../../../../../Styles/styleVariables';
import {IOnkodietetyka} from '../../../../../../../../shared/Models/Onkodietetyka.models';
import {RFValue} from 'react-native-responsive-fontsize';
import {styleElements} from '../../../../../../../../Styles/styleElements';
import {AllergiesType} from '../../../../../../../../shared/Models/Local/Allergies.models';
import {IAllergyIntolerance} from '../../../../../../../../shared/Models/AllergyIntolerance.models';

interface IProps {
  questionnaire: IOnkodietetyka;
  allergyType: AllergiesType;
  hideDialog: () => void;
}

export default (props: IProps) => {
  const [singleAllergy, setSingleAllergy] = useState<IAllergyIntolerance>({
    type: props.allergyType,
    name: '',
    symptoms: '',
    diagnosed_by: '',
    treatment: '',
  });

  const handleAddAllergy = () => {
    const checkInputs = () => {
      let result = false;
      Object.values(singleAllergy).map(value => {
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
      props.questionnaire.allergy_intolerance.push(singleAllergy);
      props.hideDialog();
    }
  };

  return (
    <>
      <View style={styles.section}>
        <View style={styleElements.row}>
          <TextInput
            style={styles.input}
            label="Na co?"
            outlineColor={styleVariables.colors.green}
            value={`${singleAllergy.name}`}
            onChangeText={text =>
              setSingleAllergy(prev => ({...prev, name: text}))
            }
          />
        </View>
        <View style={styleElements.row}>
          <TextInput
            style={styles.input}
            label="Objawy"
            outlineColor={styleVariables.colors.green}
            value={`${singleAllergy.symptoms}`}
            onChangeText={text =>
              setSingleAllergy(prev => ({...prev, symptoms: text}))
            }
          />
        </View>
        <View style={styleElements.row}>
          <TextInput
            style={styles.input}
            label="Kto zlecił?"
            outlineColor={styleVariables.colors.green}
            value={`${singleAllergy.diagnosed_by}`}
            onChangeText={text =>
              setSingleAllergy(prev => ({...prev, diagnosed_by: text}))
            }
          />
        </View>
        <View style={styleElements.row}>
          <TextInput
            label="Zalecenia leczenia"
            multiline
            style={[styles.input, {height: 150}]}
            value={singleAllergy.treatment}
            onChangeText={text =>
              setSingleAllergy(prev => ({
                ...prev,
                treatment: text,
              }))
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
            Alert.alert(
              'Komunikat',
              `Czy na pewno zapisać alergie/nietolerancje?`,
              [
                {text: 'Anuluj', onPress: undefined},
                {text: 'Zapisz', onPress: handleAddAllergy},
              ],
            );
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
