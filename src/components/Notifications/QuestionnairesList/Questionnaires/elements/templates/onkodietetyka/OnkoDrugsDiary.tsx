import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {
  Button,
  Dialog,
  List,
  Portal,
  TouchableRipple,
} from 'react-native-paper';
import {RFValue} from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {getDateFormat} from '../../../../../../../shared/Formatters/dateHourFormat';
import {IMealTypes} from '../../../../../../../shared/Models/Local/Meals.models';
import {IMealProducts} from '../../../../../../../shared/Models/MealProducts.models';
import {IOnkodietetyka} from '../../../../../../../shared/Models/Onkodietetyka.models';
import {IProductUnits} from '../../../../../../../shared/Models/ProductUnits.models';
import {meals as mealVar} from '../../../../../../../shared/Variables/Meals';
import {styleVariables} from '../../../../../../../Styles/styleVariables';
import AddDrugsDiary from './AddDialogs/AddDrugsDiary';
import AddMealDiary from './AddDialogs/AddMealDiary';
import PortalDialog from './AddDialogs/components/PortalDialog';

interface IQuestions {
  name: string;
  id: number;
  title: string;
  question: string;
}

interface IProps {
  question: IQuestions;
  setQuestionnaire: React.Dispatch<React.SetStateAction<IOnkodietetyka>>;
  questionnaire: IOnkodietetyka;
}

export default (props: IProps) => {
  const [drugsDiaryModal, setDrugsDiaryModal] = useState(false);

  const hideDrugsDiaryModal = () => setDrugsDiaryModal(false);
  // const openDrugsDiaryModal = () => {
  //   setMealDiaryModal(true);
  // };

  return (
    <>
      <View style={styles.section}>
        <View style={styles.row}>
          {/* <Text style={styles.text}></Text> */}
          <Button
            color={styleVariables.colors.green}
            icon="plus"
            style={{width: '100%'}}
            mode="outlined"
            onPress={() => setDrugsDiaryModal(true)}>
            Dodaj
          </Button>
        </View>
      </View>
      <View style={styles.section}>
        {props.questionnaire.meal_diary && (
          <View style={styles.row}>
            <View style={styles.section}>
              <List.Section>
                {props.questionnaire.drugs_diary.map((el, index) => {
                  console.log('el', el);
                  return (
                    <List.Accordion title={el.name} id={index} key={index}>
                      <List.Item
                        titleNumberOfLines={1}
                        title={`Od kiedy?: ${el.date_from}`}
                      />
                      <List.Item
                        titleNumberOfLines={1}
                        title={`Do kiedy?: ${el.date_to}`}
                      />
                      <List.Item
                        titleNumberOfLines={1}
                        title={`Dawka: ${el.dose}`}
                      />
                      <List.Item
                        titleNumberOfLines={1}
                        title={`Częstotliwość: ${el.frequency}`}
                      />
                      <List.Item
                        titleNumberOfLines={5}
                        title={`Uwagi, dolegliwości: ${el.note}`}
                      />
                      <List.Item
                        titleNumberOfLines={1}
                        title={`Kto zlecił?: ${el.commited_by}`}
                      />
                      <TouchableRipple
                        style={{padding: 15, alignSelf: 'flex-end'}}
                        onPress={() => {
                          props.questionnaire.drugs_diary.map(
                            (ele, eleIndex) => {
                              const new1 = [...props.questionnaire.drugs_diary];

                              if (
                                ele.date_from === el.date_from &&
                                ele.name === el.name
                              ) {
                                new1.splice(eleIndex, 1);
                                console.log('newState', new1);
                                props.setQuestionnaire(prev => ({
                                  ...prev,
                                  drugs_diary: new1,
                                }));
                              }
                            },
                          );
                        }}
                        rippleColor="rgba(0, 0, 0, .32)">
                        <View style={{flexDirection: 'row'}}>
                          <Text style={{fontSize: 20, marginRight: 10}}>
                            Usuń
                          </Text>
                          <Icon name="trash" color="black" size={RFValue(25)} />
                        </View>
                      </TouchableRipple>
                    </List.Accordion>
                  );
                })}
              </List.Section>
            </View>
          </View>
        )}
      </View>
      <PortalDialog visible={drugsDiaryModal} onDismiss={hideDrugsDiaryModal}>
        <AddDrugsDiary
          questionnaire={props.questionnaire}
          setQuestionnaire={props.setQuestionnaire}
          hideDialog={hideDrugsDiaryModal}
        />
      </PortalDialog>
    </>
  );
};

const styles = StyleSheet.create({
  pt1Content: {
    height: '80%',
    marginBottom: RFValue(80),
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
    // textAlign: 'center',
    fontWeight: '700',
  },
  text: {
    marginVertical: 5,
    fontSize: RFValue(16),
  },
  section: {
    flex: 1,
  },
  dialog: {
    width: '100%',
    height: '100%',
  },
});
