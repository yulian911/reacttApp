import React, {useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {
  Button,
  Dialog,
  List,
  Portal,
  Switch,
  TouchableRipple,
} from 'react-native-paper';
import {RFValue} from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {AllergiesType} from '../../../../../../../shared/Models/Local/Allergies.models';
import {IOnkodietetyka} from '../../../../../../../shared/Models/Onkodietetyka.models';
import {allergies} from '../../../../../../../shared/Variables/Allergies';
import {styleVariables} from '../../../../../../../Styles/styleVariables';
import AddAllergies from './AddDialogs/AddAllergies';
import AddDiet from './AddDialogs/AddDiet';
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
  const [allergiesModal, setAllergiesModal] = useState(false);
  const [allergiesType, setAllergiesType] = useState<AllergiesType | null>(
    null,
  );

  const hideAllergiesModal = () => setAllergiesModal(false);
  const openAllergiesModal = (type: AllergiesType) => {
    setAllergiesType(type);
    setAllergiesModal(true);
  };

  return (
    <>
      <View style={styles.section}>
        <View style={styles.row}>
          <Text>Allergie i/lub nietolerancje?</Text>
          <Switch
            color={styleVariables.colors.green}
            value={props.questionnaire.is_allergy_intolerance}
            onValueChange={(boolean: boolean) =>
              props.setQuestionnaire(prev => ({
                ...prev,
                is_allergy_intolerance: boolean,
              }))
            }
          />
        </View>
        {props.questionnaire.is_allergy_intolerance
          ? allergies.map(el => {
              return (
                <View key={el.id} style={[styles.row, {marginVertical: 5}]}>
                  <Text style={styles.text}>{el.title}</Text>
                  <Button
                    color={styleVariables.colors.green}
                    icon="plus"
                    mode="outlined"
                    onPress={() => openAllergiesModal(el.type)}>
                    Dodaj
                  </Button>
                </View>
              );
            })
          : null}
      </View>
      <View style={styles.section}>
        {props.questionnaire.allergy_intolerance && (
          <View style={styles.row}>
            <View style={styles.section}>
              <List.Section>
                {props.questionnaire.allergy_intolerance.map((el, index) => {
                  console.log('el', el);
                  return (
                    <List.Accordion
                      title={`${
                        allergies.filter(fl => fl.type === el.type)[0].title
                      } - ${el.name}`}
                      id={index}
                      key={index}>
                      <List.Item
                        titleNumberOfLines={1}
                        title={`Objawy: ${el.symptoms}`}
                      />
                      <List.Item
                        titleNumberOfLines={1}
                        title={`Kto zlecił?: ${el.diagnosed_by}`}
                      />
                      <List.Item
                        titleNumberOfLines={3}
                        title={`Zalecenia leczenia: ${el.treatment}`}
                      />
                      <TouchableRipple
                        style={{padding: 15, alignSelf: 'flex-end'}}
                        onPress={() => {
                          props.questionnaire.allergy_intolerance.map(
                            (ele, index) => {
                              const new1 = [
                                ...props.questionnaire.allergy_intolerance,
                              ];

                              if (
                                ele.type === el.type &&
                                ele.name === el.name
                              ) {
                                new1.splice(index, 1);
                                props.setQuestionnaire(prev => ({
                                  ...prev,
                                  allergy_intolerance: new1,
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
      <PortalDialog visible={allergiesModal} onDismiss={hideAllergiesModal}>
        {allergiesType && (
          <AddAllergies
            allergyType={allergiesType}
            questionnaire={props.questionnaire}
            hideDialog={hideAllergiesModal}
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
});
