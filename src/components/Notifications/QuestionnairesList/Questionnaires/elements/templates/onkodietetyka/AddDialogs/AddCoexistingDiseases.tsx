import React, {useEffect, useRef, useState} from 'react';
import {
  Alert,
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {List, Switch, TextInput, Button} from 'react-native-paper';
import {IBaseDisease} from '../../../../../../../../shared/Models/BaseDisease.models';
import {IDiseases} from '../../../../../../../../shared/Models/Diseases.models';
import {GetGeneral} from '../../../../../../../../shared/Requests/GetGeneral';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {useAuth} from '../../../../../../../../Auth/Auth';
import {getDateFormat} from '../../../../../../../../shared/Formatters/dateHourFormat';
import {styleVariables} from '../../../../../../../../Styles/styleVariables';
import {IOnkodietetyka} from '../../../../../../../../shared/Models/Onkodietetyka.models';
import {ICoexistingDiseases} from '../../../../../../../../shared/Models/CoexistingDiseases.models';
import SearchList from './components/SearchList';
import DatePicker from './components/DatePicker';

interface IProps {
  questionnaire: IOnkodietetyka;
  hideDialog: () => void;
  diseasesList: IDiseases[] | null;
  setDiseasesList: React.Dispatch<React.SetStateAction<IDiseases[] | null>>;
  addedDiseasesList: IDiseases[];
}

export default (props: IProps) => {
  const [addedCoexistingDiseases, setAddedCoexistingDiseases] =
    useState<ICoexistingDiseases>({
      disease: 0,
      diagnosed: '',
      is_diagnosed_by_doc: false,
      treatment_plan: '',
    });
  const [singleDisease, setSingleDisease] = useState<IDiseases | null>(null);

  const handleGetDiseases = async (value: string) => {
    const result = await GetGeneral.pollDiseases(value);
    if (result.error) {
      console.log('Błąd pobrania chorób.');
      return;
    }
    props.setDiseasesList(result.data);
  };

  const handleConfirm = (date: Date) => {
    setAddedCoexistingDiseases(prev => ({
      ...prev,
      diagnosed: getDateFormat(date, '-', true),
    }));
  };

  const handleSaveCoexistingDisease = (el: IDiseases) => {
    setAddedCoexistingDiseases(prev => ({
      ...prev,
      disease: el.id,
    }));
    props.addedDiseasesList.push(el);
    setSingleDisease(el);
  };

  return (
    <>
      <View style={styles.section}>
        <List.Section>
          <SearchList
            handleGetData={handleGetDiseases}
            resetData={() => props.setDiseasesList(null)}
            dataList={props.diseasesList}
            dataId={addedCoexistingDiseases.disease}
            endFunction={handleSaveCoexistingDisease}
            accordionTitle={
              singleDisease ? singleDisease.name : 'Wybierz chorobę'
            }
          />
        </List.Section>
      </View>
      <View style={styles.section}>
        <DatePicker
          label="Od kiedy"
          value={addedCoexistingDiseases.diagnosed}
          endFunction={handleConfirm}
        />
      </View>
      <View style={styles.section}>
        <View style={styles.row}>
          <Text>Zdiagnozowana przez lekarza?</Text>
          <Switch
            color={styleVariables.colors.green}
            value={addedCoexistingDiseases.is_diagnosed_by_doc}
            onValueChange={(boolean: boolean) =>
              setAddedCoexistingDiseases(prev => ({
                ...prev,
                is_diagnosed_by_doc: boolean,
              }))
            }
          />
        </View>
      </View>
      <View style={styles.section}>
        <TextInput
          label="Plan leczenia"
          multiline
          style={{height: 150}}
          value={addedCoexistingDiseases.treatment_plan}
          onChangeText={text =>
            setAddedCoexistingDiseases(prev => ({
              ...prev,
              treatment_plan: text,
            }))
          }
        />
      </View>
      <View style={styles.section}>
        <Button
          color={styleVariables.colors.green}
          icon="plus"
          style={{marginVertical: 15}}
          mode="outlined"
          onPress={() => {
            if (addedCoexistingDiseases.disease === 0) {
              Alert.alert('Błąd', 'Nie wybrano choroby.');
              return;
            }
            if (addedCoexistingDiseases.diagnosed.length === 0) {
              Alert.alert('Błąd', 'Nie wybrano daty.');
              return;
            } else {
              console.log('AAAAAAAAAAAAAAAAA', addedCoexistingDiseases);
              props.questionnaire.coexisting_diseases.push(
                addedCoexistingDiseases,
              );
              props.hideDialog();
            }
          }}>
          Dodaj chorobę
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
    marginVertical: 15,
  },
  section: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    flex: 1,
  },
});
