import React, {useState} from 'react';
import {Alert, ScrollView, Text} from 'react-native';
import {IOnkodietetyka} from '../../../../../../../../shared/Models/Onkodietetyka.models';
import {PostGeneral} from '../../../../../../../../shared/Requests/PostGeneral';
import OnkoAllergies from '../OnkoAllergies';
import OnkoCertificate from '../OnkoCertificate';
import OnkoDrugsDiary from '../OnkoDrugsDiary';
import OnkoHealthState from '../OnkoHealthState';
import OnkoMealDiary from '../OnkoMealDiary';
import OnkoNewNutritionHelp from '../OnkoNewNutritionHelp';
import OnkoPhysicalActivity from '../OnkoPhysicalActivity';
import OnkoTemplate from '../OnkoTemplate';

export const OnkoScreens = (item: any): JSX.Element => {
  // const [questionnaire, setQuestionnaire] = useState<IOnkodietetyka>({
  //     user: 2, // TODO TESTOWO !!!
  //     body_mass: '',
  //     body_mass_3m: '',
  //     body_mass_6m: '',

  //     new_tastes_problem: 0,
  //     new_nutrition_way_problem: 0,
  //     new_supplememnts_problem: 0,
  //     new_nutrition_way_help: '',

  //     is_used_diet: false,
  //     is_base_disease: false,
  //     is_coexisting_diseases: false,
  //     is_specialist_clinic_care: false,
  //     is_allergy_intolerance: false,

  //     used_diet_data: [],
  //     base_disease: null,
  //     coexisting_diseases: [],
  //     specialist_clinic_care: [],
  //     allergy_intolerance: [],

  //     drugs_diary: [],
  //     meal_diary: [],

  //     meal_completion: 0,
  //     physical_activity: 0,
  //   });

  //   const handleSendResults = async (data: IOnkodietetyka) => {
  //     console.log('data', data);
  //     const result = await PostGeneral.onkodietetyka(data);
  //     if (result.error) {
  //       Alert.alert('Błąd', 'Ankieta nie została wysłana. Spróbuj ponownie.', [
  //         {text: 'Zakończ', onPress: () => navigation.goBack()},
  //         {text: 'Anuluj', onPress: undefined},
  //         {
  //           text: 'Spróbuj ponownie',
  //           onPress: () => handleSendResults(questionnaire),
  //         },
  //       ]);
  //       return;
  //     }
  //     Alert.alert('Powiadomienie', 'Pomyślnie wysłano ankietę.', [
  //       {text: 'OK', onPress: () => navigation.goBack()},
  //     ]);
  //   };

  return (
    <>
      {/* <Text style={styles.elTitle}>{item.title}</Text>
        <ScrollView style={styles.elContainer}>
          {item.id === 1 && (
            <OnkoCertificate
              item={item}
              setQuestionnaire={setQuestionnaire}
              questionnaire={questionnaire}
            />
          )}
          {item.id === 2 && (
            <OnkoTemplate question={item} setQuestionnaire={setQuestionnaire} />
          )}
          {item.id === 3 && (
            <OnkoTemplate question={item} setQuestionnaire={setQuestionnaire} />
          )}
          {item.id === 4 && (
            <OnkoTemplate question={item} setQuestionnaire={setQuestionnaire} />
          )}
          {item.id === 5 && (
            <OnkoNewNutritionHelp
              item={item}
              setQuestionnaire={setQuestionnaire}
              questionnaire={questionnaire}
            />
          )}
          {item.id === 6 && (
            <OnkoHealthState
              item={item}
              setQuestionnaire={setQuestionnaire}
              questionnaire={questionnaire}
            />
          )}
          {item.id === 7 && (
            <OnkoTemplate question={item} setQuestionnaire={setQuestionnaire} />
          )}
          {item.id === 8 && (
            <OnkoPhysicalActivity
              question={item}
              setQuestionnaire={setQuestionnaire}
            />
          )}
          {item.id === 9 && (
            <OnkoDrugsDiary
              question={item}
              setQuestionnaire={setQuestionnaire}
              questionnaire={questionnaire}
            />
          )}
          {item.id === 10 && (
            <OnkoMealDiary
              question={item}
              setQuestionnaire={setQuestionnaire}
              questionnaire={questionnaire}
            />
          )}
          {item.id === 11 && (
            <OnkoAllergies
              question={item}
              setQuestionnaire={setQuestionnaire}
              questionnaire={questionnaire}
            />
          )}
        </ScrollView> */}
    </>
  );
};
