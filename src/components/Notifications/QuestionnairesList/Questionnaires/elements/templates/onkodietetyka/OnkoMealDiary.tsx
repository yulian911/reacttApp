import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button, List, TouchableRipple} from 'react-native-paper';
import {RFValue} from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {getDateFormat} from '../../../../../../../shared/Formatters/dateHourFormat';
import {IMealTypes} from '../../../../../../../shared/Models/Local/Meals.models';
import {IMealProducts} from '../../../../../../../shared/Models/MealProducts.models';
import {IOnkodietetyka} from '../../../../../../../shared/Models/Onkodietetyka.models';
import {IProductUnits} from '../../../../../../../shared/Models/ProductUnits.models';
import {meals as mealVar} from '../../../../../../../shared/Variables/Meals';
import {styleVariables} from '../../../../../../../Styles/styleVariables';
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
  const [mealDiaryModal, setMealDiaryModal] = useState(false);
  const [mealType, setMealType] = useState<IMealTypes | null>(null);

  const [meals, setMeals] = useState<IMealProducts[]>([]);
  const [units, setUnits] = useState<IProductUnits[]>([]);

  const hideMealDiaryModal = () => setMealDiaryModal(false);
  const openMealDiaryModal = (meal: IMealTypes) => {
    setMealType(meal);
    setMealDiaryModal(true);
  };

  const handleGetName = (type: string, id: number): string => {
    let meal = 'Składnik';
    let unit = 'Jednostka';

    switch (type) {
      case 'meal':
        meal = meals.find(fd => fd.id === id)?.name || meal;
        return meal;
      case 'unit':
        unit = units.find(fd => fd.id === id)?.name || unit;
        return unit;
      default:
        return 'brak';
    }
  };

  return (
    <>
      <View style={styles.section}>
        {mealVar.map(el => {
          return (
            <View key={el.id} style={[styles.row, {marginVertical: 5}]}>
              <Text style={styles.text}>{el.title}</Text>
              <Button
                color={styleVariables.colors.green}
                icon="plus"
                mode="outlined"
                onPress={() => openMealDiaryModal(el)}>
                Dodaj
              </Button>
            </View>
          );
        })}
      </View>
      <View style={styles.section}>
        {props.questionnaire.meal_diary && (
          <View style={styles.row}>
            <View style={styles.section}>
              <List.AccordionGroup>
                {props.questionnaire.meal_diary.map((el, index) => {
                  console.log('el', el);
                  return (
                    <List.Accordion
                      title={`${getDateFormat(el.date_time)} - ${
                        mealVar.filter(fl => fl.type === el.type)[0].title
                      } `}
                      id={index + 1}
                      key={index}>
                      {el.meal_diary_products
                        ? el.meal_diary_products.map((mdp, mdpIndex) => {
                            return (
                              <List.Item
                                key={mdpIndex + 1}
                                titleNumberOfLines={1}
                                title={`${handleGetName(
                                  'meal',
                                  mdp.meal_product,
                                )} ${mdp.quantity} ${handleGetName(
                                  'unit',
                                  mdp.product_unit,
                                )}`}
                              />
                            );
                          })
                        : null}
                      <List.Item
                        key={1}
                        titleNumberOfLines={5}
                        title={`Notatka: ${el.note}`}
                      />
                      <TouchableRipple
                        style={{padding: 15, alignSelf: 'flex-end'}}
                        onPress={() => {
                          props.questionnaire.meal_diary.map((ele, index) => {
                            const new1 = [...props.questionnaire.meal_diary];

                            if (
                              ele.date_time === el.date_time &&
                              ele.type === el.type
                            ) {
                              new1.splice(index, 1);
                              console.log('newState', new1);
                              props.setQuestionnaire(prev => ({
                                ...prev,
                                meal_diary: new1,
                              }));
                            }
                          });
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
              </List.AccordionGroup>
            </View>
          </View>
        )}
      </View>
      <PortalDialog visible={mealDiaryModal} onDismiss={hideMealDiaryModal}>
        {mealType && (
          <AddMealDiary
            mealType={mealType}
            questionnaire={props.questionnaire}
            hideDialog={hideMealDiaryModal}
            setMeals={setMeals}
            setUnits={setUnits}
            handleGetName={handleGetName}
          />
        )}
      </PortalDialog>
    </>
  );
};

const styles = StyleSheet.create({
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
