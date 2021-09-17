import React, {useEffect, useState} from 'react';
import {Alert, ScrollView, StyleSheet, Text, View} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import {
  DoneButton,
  NextButton,
  PrevButton,
} from '../../../../shared/Components/Buttons/NextPrevDoneBtns';
import ProgressBarCustom from '../../../../shared/Components/ProgressBar/ProgressBarCustom';
import {PostGeneral} from '../../../../shared/Requests/PostGeneral';
import {styleElements} from '../../../../Styles/styleElements';
import {ScreenContainer} from '../../../Home/components/ScreenContainer';
import FullScreenLoading from '../../../Navigation/components/FullScreenLoading';
import OnkoCertificate from './elements/templates/onkodietetyka/OnkoCertificate';
import {IOnkodietetyka} from '../../../../shared/Models/Onkodietetyka.models';
import OnkoTemplate from './elements/templates/onkodietetyka/OnkoTemplate';
import OnkoNewNutritionHelp from './elements/templates/onkodietetyka/OnkoNewNutritionHelp';
import OnkoHealthState from './elements/templates/onkodietetyka/OnkoHealthState';
import OnkoPhysicalActivity from './elements/templates/onkodietetyka/OnkoPhysicalActivity';
import OnkoMealDiary from './elements/templates/onkodietetyka/OnkoMealDiary';
import OnkoDrugsDiary from './elements/templates/onkodietetyka/OnkoDrugsDiary';
import OnkoAllergies from './elements/templates/onkodietetyka/OnkoAllergies';
import {RFValue} from 'react-native-responsive-fontsize';

export default ({navigation}: any) => {
  const [questionnaire, setQuestionnaire] = useState<IOnkodietetyka>({
    user: 2, // TODO TESTOWO !!!
    body_mass: '',
    body_mass_3m: '',
    body_mass_6m: '',

    new_tastes_problem: 0,
    new_nutrition_way_problem: 0,
    new_supplememnts_problem: 0,
    new_nutrition_way_help: '',

    is_used_diet: false,
    is_base_disease: false,
    is_coexisting_diseases: false,
    is_specialist_clinic_care: false,
    is_allergy_intolerance: false,

    used_diet_data: [],
    base_disease: null,
    coexisting_diseases: [],
    specialist_clinic_care: [],
    allergy_intolerance: [],

    drugs_diary: [],
    meal_diary: [],

    meal_completion: 0,
    physical_activity: 0,
  });
  const [loadingComponent, setLoadingComponent] = useState(true);
  const [progress, setProgress] = useState<number>(0);

  const handleSendResults = async (data: IOnkodietetyka) => {
    console.log('data', data);
    const result = await PostGeneral.onkodietetyka(data);
    if (result.error) {
      Alert.alert('Błąd', 'Ankieta nie została wysłana. Spróbuj ponownie.', [
        {text: 'Zakończ', onPress: () => navigation.goBack()},
        {text: 'Anuluj', onPress: undefined},
        {
          text: 'Spróbuj ponownie',
          onPress: () => handleSendResults(questionnaire),
        },
      ]);
      return;
    }
    Alert.alert('Powiadomienie', 'Pomyślnie wysłano ankietę.', [
      {text: 'OK', onPress: () => navigation.goBack()},
    ]);
  };

  useEffect(() => {
    setLoadingComponent(false);
  }, []);

  const data: any[] = [
    {
      id: 1,
      title: 'Metryczka',
    },
    {
      id: 2,
      title: 'Trudnosci w wprowadzaniu zmian',
      name: 'new_tastes_problem',
      question:
        'Czy wprowadzanie nowych smaków produktów do diety sprawia Ci czasem problem?',
    },
    {
      id: 3,
      title: 'Trudnosci w wprowadzaniu zmian',
      name: 'new_nutrition_way_problem',
      question:
        'Czy jesteś gotowy całkowicie zmienić dotychczasowy sposób żywienia?',
    },
    {
      id: 4,
      title: 'Trudnosci w wprowadzaniu zmian',
      name: 'new_supplememnts_problem',
      question:
        'Czy wprowadzanie koniecznych suplementów diety sprawi Ci problem?',
    },
    {
      id: 5,
      title: 'Trudnosci w wprowadzaniu zmian',
      question:
        'Jak myślisz co mogłoby Ci pomóc w zmianie dotychczasowych nawyków oraz przejściu na nowy model żywienia?',
    },
    {
      id: 6,
      title: 'Stan zdrowia',
    },
    {
      id: 7,
      title: 'Spożycie posiłków',
      question: 'Spożycie pokarmów wciągu ostatniego tygodnia:',
      name: 'meal_completion',

      radioBtns: [
        {
          value: 25,
          text: '0-25%',
        },
        {
          value: 50,
          text: '26-50%',
        },
        {
          value: 75,
          text: '51-75%',
        },
        {
          value: 100,
          text: '76-100%',
        },
      ],
    },
    {
      id: 8,
      title: 'Aktywność fizyczna',
      question: 'Wskaz rodzaj średniej aktywności w ciągu ostatniego miesiąca.',
      name: 'physical_activity',
    },
    {
      id: 9,
      title: 'Przyjmowane leki i suplementy',
    },
    {
      id: 10,
      title: '3-dniowy dzienniczek żywieniowy',
    },
    {
      id: 11,
      title: 'Alergie i nietolerncje pokarmowe',
    },
  ];

  const screens = (item: any): JSX.Element => {
    return (
      <>
        <Text style={styles.elTitle}>{item.title}</Text>
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
        </ScrollView>
      </>
    );
  };

  const dataLength = data.length - 1;

  return (
    <ScreenContainer>
      <View style={[styleElements.tile, styles.sLContainer]}>
        {loadingComponent ? (
          <FullScreenLoading />
        ) : (
          <>
            <ProgressBarCustom progress={progress} />
            <AppIntroSlider
              renderItem={({item}) => screens(item)}
              renderDoneButton={DoneButton}
              renderNextButton={NextButton}
              showPrevButton
              onSlideChange={a => setProgress(a / dataLength)}
              dotStyle={styles.dotStyle}
              activeDotStyle={styles.dotStyle}
              dotClickEnabled={false}
              renderPrevButton={PrevButton}
              data={data}
              onDone={() => {
                Alert.alert('Komunikat', 'Czy na pewno wysłać ankietę?', [
                  {text: 'Anuluj', onPress: undefined},
                  {
                    text: 'Wyślij',
                    onPress: () => handleSendResults(questionnaire),
                  },
                ]);
              }}
            />
          </>
        )}
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  sLContainer: {
    padding: 20,
    height: '100%',
  },
  dotStyle: {
    display: 'none',
  },
  elContainer: {
    height: '80%',
    marginBottom: RFValue(80),
  },
  elTitle: {
    marginVertical: 10,
    fontSize: RFValue(18),
    // textAlign: 'center',
    fontWeight: '700',
  },
});
