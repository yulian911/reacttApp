import React, {useEffect, useState} from 'react';
import {Alert, Dimensions, StyleSheet, Text, View} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import {
  DoneButton,
  NextButton,
  PrevButton,
} from '../../../../shared/Components/Buttons/NextPrevDoneBtns';
import ProgressBarCustom from '../../../../shared/Components/ProgressBar/ProgressBarCustom';
import {IChangeTasteProblem} from '../../../../shared/Models/changeTasteProblem.models';
import {PostGeneral} from '../../../../shared/Requests/PostGeneral';
import {styleElements} from '../../../../Styles/styleElements';
import {ScreenContainer} from '../../../Home/components/ScreenContainer';
import FullScreenLoading from '../../../Navigation/components/FullScreenLoading';
import {tchQuestions} from './elements/questions/tchQuestions';
import TchTemplate from './elements/templates/TchTemplate';

export default ({navigation}: any) => {
  const [questionnaire, setQuestionnaire] = useState<IChangeTasteProblem[]>([]);
  const [loadingComponent, setLoadingComponent] = useState(true);
  const [progress, setProgress] = useState<number>(0);
  const questionsLenght = tchQuestions.length - 1;

  const handleSendResults = async (data: IChangeTasteProblem[]) => {
    console.log('data', data);
    const result = await PostGeneral.changeTasteProblem(data);
    if (result.error) {
      console.log('Nie wysłano ankiety');
      return;
    }
    console.log('ankieta wysłana pomyślnie', result.data);
    Alert.alert('Powiadomienie', 'Pomyślnie wysłano ankietę.', [
      {text: 'OK', onPress: () => navigation.goBack()},
    ]);
  };

  useEffect(() => {
    setLoadingComponent(false);
  }, []);

  return (
    <ScreenContainer>
      <View style={[styleElements.tile, styles.sLContainer]}>
        {loadingComponent ? (
          <FullScreenLoading />
        ) : (
          <>
            <ProgressBarCustom progress={progress} />
            <AppIntroSlider
              renderItem={({item}) => (
                <TchTemplate
                  question={item}
                  setQuestionnaire={setQuestionnaire}
                />
              )}
              renderDoneButton={DoneButton}
              renderNextButton={NextButton}
              onSlideChange={a => setProgress(a / questionsLenght)}
              showPrevButton
              dotStyle={styles.dotStyle}
              activeDotStyle={styles.dotStyle}
              dotClickEnabled={false}
              renderPrevButton={PrevButton}
              data={tchQuestions}
              onDone={() => handleSendResults(questionnaire)}
            />
          </>
        )}
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  swallowProblem: {},
  buttonCircle: {},
  sLContainer: {
    paddingTop: 20,
    paddingHorizontal: 20,
    height: '100%',
  },
  dotStyle: {
    display: 'none',
  },
});
