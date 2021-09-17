import React, {useState} from 'react';
import {Alert, StyleSheet, Text, View} from 'react-native';
import {
  Button,
  HelperText,
  List,
  Switch,
  TextInput,
  TouchableRipple,
} from 'react-native-paper';
import {RFValue} from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/Ionicons';
import {IDietList} from '../../../../../../../shared/Models/DietList.models';
import {TimeTypes} from '../../../../../../../shared/Models/Local/TimeUnits.models';
import {IOnkodietetyka} from '../../../../../../../shared/Models/Onkodietetyka.models';
import {styleElements} from '../../../../../../../Styles/styleElements';
import {styleVariables} from '../../../../../../../Styles/styleVariables';
import AddDiet from './AddDialogs/AddDiet';
import PortalDialog from './AddDialogs/components/PortalDialog';
import {checkNumbers} from './functions/checkNumbers';

const OnkoCertificate = ({
  item,
  setQuestionnaire,
  questionnaire,
}: {
  item: any;
  setQuestionnaire: React.Dispatch<React.SetStateAction<IOnkodietetyka>>;
  questionnaire: IOnkodietetyka;
}) => {
  const [visible, setVisible] = useState(false);
  const [dietsList, setDietsList] = useState<IDietList[] | null>(null);
  const [addedDietsList, setAddedDietsList] = useState<IDietList[]>([]);

  const hideDialog = () => setVisible(false);

  const showTimeUnitFormat = (period: number, unit: TimeTypes) => {
    switch (unit) {
      case 'day':
        if (period === 1) return 'dzień';
        if (period > 1) return 'dni';
        return unit;
      case 'week':
        if (period === 1) return 'tydzień';
        if ((period > 1 && period < 5) || period >= 32) return 'tygodnie';
        if (period >= 5 || period >= 25) return 'tygodni';
        return unit;
      case 'month':
        if (period === 1) return 'miesiąc';
        if ((period > 1 && period < 5) || period >= 22) return 'miesiące';
        if (period >= 5 || period >= 25) return 'miesięcy';
        return unit;
      case 'year':
        if (period === 1) return 'rok';
        if ((period > 1 && period < 5) || period >= 22) return 'lata';
        if (period >= 5 || period >= 25) return 'lat';
        return unit;
      default:
        return unit;
    }
  };

  return (
    <>
      <View style={styles.section}>
        <View style={styleElements.row}>
          <View style={styles.section}>
            <TextInput
              style={styles.input}
              label="Masa ciała dzisiaj (w kg)"
              outlineColor={styleVariables.colors.green}
              keyboardType="numeric"
              value={questionnaire.body_mass}
              onChangeText={text =>
                setQuestionnaire(prev => ({...prev, body_mass: text}))
              }
            />
            {checkNumbers(questionnaire.body_mass) ? (
              <HelperText
                type="error"
                visible={checkNumbers(questionnaire.body_mass)}>
                Waga jest niepoprawna!
              </HelperText>
            ) : null}
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.section}>
            <TextInput
              style={styles.input}
              label="Masa ciała 3 miesiące temu (w kg)"
              outlineColor={styleVariables.colors.green}
              keyboardType="numeric"
              value={questionnaire.body_mass_3m}
              onChangeText={text =>
                setQuestionnaire(prev => ({...prev, body_mass_3m: text}))
              }
            />
            {checkNumbers(questionnaire.body_mass_3m) ? (
              <HelperText
                type="error"
                visible={checkNumbers(questionnaire.body_mass_3m)}>
                Waga jest niepoprawna!
              </HelperText>
            ) : null}
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.section}>
            <TextInput
              style={styles.input}
              label="Masa ciała 6 miesięcy temu (w kg)"
              keyboardType="numeric"
              outlineColor={styleVariables.colors.green}
              value={questionnaire.body_mass_6m}
              onChangeText={text =>
                setQuestionnaire(prev => ({...prev, body_mass_6m: text}))
              }
            />
            {checkNumbers(questionnaire.body_mass_6m) ? (
              <HelperText
                type="error"
                visible={checkNumbers(questionnaire.body_mass_6m)}>
                Waga jest niepoprawna!
              </HelperText>
            ) : null}
          </View>
        </View>
      </View>
      <View style={styles.section}>
        <View style={styles.row}>
          <Text>Czy stosowałeś/łaś już kiedyś jakąkolwiek dietę?</Text>
          <Switch
            color={styleVariables.colors.green}
            value={questionnaire.is_used_diet}
            onValueChange={(boolean: boolean) => {
              if (boolean === false && questionnaire.used_diet_data.length) {
                Alert.alert(
                  'Komunikat',
                  `Istnieją dodane diety.\nJeśli kontunuujesz, dodane diety zostaną usunięte.`,
                  [
                    {text: 'Anuluj ', onPress: undefined},
                    {
                      text: 'Kontunuuj ',
                      onPress: () => {
                        setQuestionnaire(prev => ({
                          ...prev,
                          is_used_diet: boolean,
                        }));
                        setQuestionnaire(prev => ({
                          ...prev,
                          used_diet_data: [],
                        }));
                      },
                    },
                  ],
                );
                return;
              }
              setQuestionnaire(prev => ({...prev, is_used_diet: boolean}));
            }}
          />
        </View>
        {questionnaire.is_used_diet ? (
          <View style={styles.row}>
            <Button
              color={styleVariables.colors.green}
              icon="plus"
              mode="outlined"
              onPress={() => setVisible(true)}>
              Dodaj dietę
            </Button>
          </View>
        ) : null}
      </View>
      {questionnaire.used_diet_data ? (
        <View style={styles.section}>
          <List.Section>
            {questionnaire.used_diet_data.map((el, index) => {
              console.log('el', el);
              return (
                <List.Accordion
                  title={addedDietsList?.find(fd => fd.id === el.diet)?.name}
                  id={index}
                  key={index}>
                  <List.Item
                    titleNumberOfLines={1}
                    title={`Okres trwania: ${el.period} ${showTimeUnitFormat(
                      el.period,
                      el.unit,
                    )}`}
                  />
                  <List.Item
                    titleNumberOfLines={5}
                    title={`Dodatkowa informacja: ${el.additional_info}`}
                  />
                  <TouchableRipple
                    style={{padding: 15, alignSelf: 'flex-end'}}
                    onPress={() => {
                      questionnaire.used_diet_data.map((ele, eleIndex) => {
                        const new1 = [...questionnaire.used_diet_data];
                        if (
                          ele.diet === el.diet &&
                          ele.period === el.period &&
                          ele.unit === el.unit
                        ) {
                          new1.splice(eleIndex, 1);
                          setQuestionnaire(prev => ({
                            ...prev,
                            used_diet_data: new1,
                          }));
                        }
                      });
                    }}
                    rippleColor="rgba(0, 0, 0, .32)">
                    <View style={{flexDirection: 'row'}}>
                      <Text style={{fontSize: 20, marginRight: 10}}>Usuń</Text>
                      <Icon name="trash" color="black" size={RFValue(25)} />
                    </View>
                  </TouchableRipple>
                </List.Accordion>
              );
            })}
          </List.Section>
        </View>
      ) : null}

      <PortalDialog visible={visible} onDismiss={hideDialog}>
        <AddDiet
          questionnaire={questionnaire}
          hideDialog={hideDialog}
          dietsList={dietsList}
          setDietsList={setDietsList}
          addedDietsList={addedDietsList}
        />
      </PortalDialog>
    </>
  );
};

export default OnkoCertificate;

const styles = StyleSheet.create({
  pt1Content: {
    height: '80%',
  },
  inputsContainer: {
    justifyContent: 'space-between',
    height: '50%',
  },
  input: {
    width: '100%',
  },
  row: {
    paddingVertical: '1%',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    marginVertical: 10,
    fontSize: RFValue(18),
    fontWeight: '700',
  },
  text: {
    marginVertical: 5,
    fontSize: RFValue(16),
  },
  section: {
    flex: 1,
  },
});
