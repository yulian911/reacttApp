import React, {useState} from 'react';
import {Alert, ScrollView, StyleSheet, View} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import {getDateFormat} from '../../../../../../../../shared/Formatters/dateHourFormat';
import {styleVariables} from '../../../../../../../../Styles/styleVariables';
import {IOnkodietetyka} from '../../../../../../../../shared/Models/Onkodietetyka.models';
import {ISpecialistClinicCare} from '../../../../../../../../shared/Models/SpecialistClinicCare.models';
import DatePicker from './components/DatePicker';

interface IProps {
  questionnaire: IOnkodietetyka;
  hideDialog: () => void;
}

export default (props: IProps) => {
  const [addedSpecialistClinicCare, setAddedSpecialistClinicCare] =
    useState<ISpecialistClinicCare>({
      clinic: '',
      date_from: '',
    });

  const handleConfirm = (date: Date) => {
    setAddedSpecialistClinicCare(prev => ({
      ...prev,
      date_from: getDateFormat(date, '-', true),
    }));
  };

  return (
    <>
      <View style={styles.section}>
        <View style={styles.row}>
          <TextInput
            label="Nazwa poradni"
            style={{width: '100%'}}
            outlineColor={styleVariables.colors.green}
            value={addedSpecialistClinicCare.clinic}
            onChangeText={text =>
              setAddedSpecialistClinicCare(prev => ({
                ...prev,
                clinic: text,
              }))
            }
          />
        </View>
        <View style={styles.row}>
          <DatePicker
            label="Od kiedy"
            value={addedSpecialistClinicCare.date_from}
            endFunction={handleConfirm}
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
            if (addedSpecialistClinicCare.clinic.length === 0) {
              Alert.alert('Błąd', 'Nie wprowadzono poradni.');
              return;
            }
            if (addedSpecialistClinicCare.date_from.length === 0) {
              Alert.alert('Błąd', 'Nie wybrano daty.');
              return;
            } else {
              props.questionnaire.specialist_clinic_care.push(
                addedSpecialistClinicCare,
              );
              props.hideDialog();
            }
          }}>
          Dodaj poradnię
        </Button>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    paddingVertical: 24,
  },
  row: {
    paddingVertical: '1%',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
  },
  section: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    flex: 1,
  },
});
