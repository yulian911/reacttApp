import React, {useEffect, useState} from 'react';
import {Alert, Dimensions, StyleSheet, Text, View} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import {RFValue} from 'react-native-responsive-fontsize';

import {
  DoneButton,
  NextButton,
  PrevButton,
} from '../../../../shared/Components/Buttons/NextPrevDoneBtns';
import ProgressBarCustom from '../../../../shared/Components/ProgressBar/ProgressBarCustom';
import {ISwallowProblem} from '../../../../shared/Models/SwallowProblem.models';
import {PostGeneral} from '../../../../shared/Requests/PostGeneral';
import {styleElements} from '../../../../Styles/styleElements';
import {styleVariables} from '../../../../Styles/styleVariables';
import {ScreenContainer} from '../../../Home/components/ScreenContainer';
import FullScreenLoading from '../../../Navigation/components/FullScreenLoading';
import {spQuestions} from './elements/questions/spQuestions';
// import {spQuestions} from './elements/questions/SpQuestions';
import SpTemplate from './elements/templates/SpTemplate';

export default ({navigation}: any) => {
  const [questionnaire, setQuestionnaire] = useState<ISwallowProblem[]>([]);
  const [loadingComponent, setLoadingComponent] = useState(true);
  const [progress, setProgress] = useState<number>(0);
  const questionsLenght = spQuestions.length - 1;

  const handleSendResults = async (data: ISwallowProblem[]) => {
    console.log('data', data);
    const result = await PostGeneral.swallowProblem(data);
    if (result.error) {
      Alert.alert('Błąd', 'Ankieta nie została wysłana. Spróbuj ponownie.', []);
      return;
    }
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
                <SpTemplate
                  question={item}
                  setQuestionnaire={setQuestionnaire}
                />
              )}
              renderDoneButton={DoneButton}
              renderNextButton={NextButton}
              showPrevButton
              onSlideChange={a => setProgress(a / questionsLenght)}
              dotStyle={styles.dotStyle}
              activeDotStyle={styles.dotStyle}
              dotClickEnabled={false}
              renderPrevButton={PrevButton}
              data={spQuestions}
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
