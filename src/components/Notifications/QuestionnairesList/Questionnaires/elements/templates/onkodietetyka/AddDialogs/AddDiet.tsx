import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {
  Button,
  Divider,
  List,
  Searchbar,
  Text,
  TextInput,
  TouchableRipple,
} from 'react-native-paper';
import {RFValue} from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/Ionicons';
import {IDietList} from '../../../../../../../../shared/Models/DietList.models';
import {IDietPoll} from '../../../../../../../../shared/Models/DietPoll.models';
import {IOnkodietetyka} from '../../../../../../../../shared/Models/Onkodietetyka.models';
import {GetGeneral} from '../../../../../../../../shared/Requests/GetGeneral';
import {patterns} from '../../../../../../../../shared/Variables/CheckTextPatterns';
// import {patterns} from '../../../../../../../../shared/Variables/checkTextPatterns';
import {timeUnits} from '../../../../../../../../shared/Variables/TimeUnits';
import {styleElements} from '../../../../../../../../Styles/styleElements';
import {styleVariables} from '../../../../../../../../Styles/styleVariables';
import FullScreenLoading from '../../../../../../../Navigation/components/FullScreenLoading';
import SearchList from './components/SearchList';

export default ({
  questionnaire,
  hideDialog,
  dietsList,
  setDietsList,
  addedDietsList,
}: {
  questionnaire: IOnkodietetyka;
  hideDialog: () => void;
  dietsList: IDietList[] | null;
  setDietsList: React.Dispatch<React.SetStateAction<IDietList[] | null>>;
  addedDietsList: IDietList[];
}) => {
  const [singleDiet, setSingleDiet] = useState<any | null>(null);
  const [addedDiet, setAddedDiet] = useState<IDietPoll>({
    period: 0,
    unit: 'day',
    additional_info: '',
    diet: 0,
  });
  const [expandedUnit, setExpandedUnit] = useState<boolean>(false);

  const handleGetDietsPoll = async (value: string) => {
    const result = await GetGeneral.pollDiets(value);
    if (result.error) {
      console.log('Błąd pobierania diet.');
      return;
    }
    setDietsList(result.data);
  };

  const showTitle = () => {
    let name = '';
    timeUnits.map(el => {
      if (el.type === addedDiet.unit) {
        name = el.title;
      }
    });
    return name;
  };

  const handleSaveDiets = (el: IDietList) => {
    setAddedDiet(prev => ({...prev, diet: el.id}));
    addedDietsList.push(el);
    setSingleDiet(el);
  };

  const checkeBeforeSetting = (text: string, name: string) => {
    if (patterns.onlyNumbers.test(text)) {
      setAddedDiet(prev => ({...prev, [name]: +text}));
    }
  };

  return (
    <>
      <View style={styles.section}>
        <List.Section>
          <SearchList
            handleGetData={handleGetDietsPoll}
            resetData={() => setDietsList(null)}
            dataList={dietsList}
            dataId={addedDiet.diet}
            endFunction={handleSaveDiets}
            accordionTitle={singleDiet ? singleDiet.name : 'Wybierz dietę'}
          />

          <TextInput
            label="Wprowadź czas trwania"
            value={addedDiet.period.toString()}
            keyboardType="number-pad"
            style={{marginVertical: 10, width: '100%'}}
            onChangeText={text => checkeBeforeSetting(text, 'period')}
          />

          <List.Accordion
            title={addedDiet.period ? showTitle() : 'Wybierz jednostkę'}
            onPress={() => {
              setExpandedUnit(!expandedUnit);
            }}
            expanded={expandedUnit}
            id="2">
            {timeUnits.map(el => {
              return (
                <List.Item
                  key={el.id}
                  title={el.title}
                  right={props => {
                    if (el.type === addedDiet.unit) {
                      return (
                        <List.Icon {...props} color={'black'} icon="check" />
                      );
                    }
                  }}
                  onPress={() => {
                    setAddedDiet(prev => ({...prev, unit: el.type}));
                    setExpandedUnit(false);
                  }}
                />
              );
            })}
          </List.Accordion>
        </List.Section>
      </View>
      <View style={styles.section}>
        <View style={styleElements.row}>
          <TextInput
            label="Dodatkowa informacja"
            value={addedDiet.additional_info}
            style={{width: '100%', height: 150}}
            multiline
            onChangeText={text =>
              setAddedDiet(prev => ({...prev, additional_info: text}))
            }
          />
        </View>
        <View style={styleElements.row}>
          <Button
            color={styleVariables.colors.green}
            style={{width: '100%', marginVertical: 5}}
            icon="plus"
            mode="outlined"
            onPress={() => {
              questionnaire.used_diet_data.push(addedDiet);
              hideDialog();
            }}>
            Dodaj dietę
          </Button>
        </View>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
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
});
