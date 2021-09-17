import React, {useEffect, useState} from 'react';
import {
  ImageBackground,
  Keyboard,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {styleElements} from '../../../../Styles/styleElements';
import {stackScreenOptions} from '../../../Navigation/Functions/stackScreenOptions';
import {ScreenContainer} from '../../components/ScreenContainer';
import {Slider, VStack, FormControl, Box} from 'native-base';
import {SaveButton} from '../../../../shared/Components/Buttons/NextPrevDoneBtns';
import {ScrollView} from 'react-native-gesture-handler';
import Exercise from './Exercise';
import {PostGeneral} from '../../../../shared/Requests/PostGeneral';
import {PatchGeneral} from '../../../../shared/Requests/PatchGeneral';
import {RFValue} from 'react-native-responsive-fontsize';
import {styleVariables} from '../../../../Styles/styleVariables';

export default ({navigation, route}: any) => {
  const params = route.params;
  const [scaleNumber, setScaleNumber] = useState<string>(params.eSResult);
  const [sliderNumber, setSliderNumber] = useState<number>(+params.eSResult);
  const [openExercise, setOpenExercise] = useState<boolean>(false);

  useEffect(() => {
    if (params) {
      navigation.setOptions(
        stackScreenOptions(navigation, params.eSList.name, route.name),
      );
    }
  }, [params]);

  useEffect(() => {
    if (Number(scaleNumber) >= 7) {
      setOpenExercise(true);
    }
  }, [scaleNumber]);

  const handleChangeNumberInput = (value: string) => {
    const regex = /^([0-9]|10)$/;
    let valueForState = '';

    if (regex.test(value)) {
      console.log('value', value);
      valueForState = value;
    } else {
      console.log('jestem tu');
      valueForState = scaleNumber;
    }

    Keyboard.dismiss();
    setSliderNumber(+value);
    setScaleNumber(valueForState);
  };

  const handleSendScale = async (id: number | null) => {
    if (scaleNumber.length === 0) {
      console.log('scaleNumber jest pusty');
      return;
    }
    const data = {
      [params.eSList.key]: +scaleNumber,
    };
    console.log('+scaleNumber', +scaleNumber);
    if (id) {
      const result = await PatchGeneral.emotionalSupportScale(id, data);
      if (result.error) {
        console.log('błąd patchowania');
        return;
      }
      console.log(result.data);
    } else {
      const result = await PostGeneral.emotionalSupportScale(data);

      if (result.error) {
        console.log('błąd postowania');
        return;
      }
      console.log(result.data);
    }
    navigation.goBack();
  };

  return (
    <ScreenContainer>
      <View style={styleElements.row}>
        <View style={[styles.tile, styleElements.tile]}>
          <View style={styles.tileRow}>
            <Text style={styles.title}>Określ w skali lub wpisz </Text>
            <TextInput
              keyboardType="numeric"
              style={[styles.input, styleElements.tile]}
              value={scaleNumber}
              onChangeText={(value: string) => handleChangeNumberInput(value)}
              onFocus={() => setScaleNumber('')}
            />
          </View>
          <View style={styles.tileRow}>
            <View style={styles.scaleContainer}>
              <FormControl isRequired isInvalid isDisabled>
                <VStack
                  space={0}
                  width="100%"
                  style={{
                    height: RFValue(45),
                  }}>
                  <View style={styles.scaleNumbers}>
                    <Text style={styles.scaleNumber}>0</Text>
                    <Text style={styles.scaleNumber}>1</Text>
                    <Text style={styles.scaleNumber}>2</Text>
                    <Text style={styles.scaleNumber}>3</Text>
                    <Text style={styles.scaleNumber}>4</Text>
                    <Text style={styles.scaleNumber}>5</Text>
                    <Text style={styles.scaleNumber}>6</Text>
                    <Text style={styles.scaleNumber}>7</Text>
                    <Text style={styles.scaleNumber}>8</Text>
                    <Text style={styles.scaleNumber}>9</Text>
                    <Text style={styles.scaleNumber}>10</Text>
                  </View>
                  <ImageBackground
                    style={{
                      width: '100%',
                      height: '85%',
                    }}
                    source={require('cudapp/resources/img/psychBar.png')}
                    resizeMode="cover">
                    <>
                      {console.log('jest wartość')}
                      <Slider
                        colorScheme="green"
                        size="lg"
                        step={1}
                        minValue={0}
                        maxValue={10}
                        onChange={setSliderNumber}
                        onChangeEnd={v => {
                          v && setScaleNumber(`${v}`);
                        }}
                        value={sliderNumber}
                        defaultValue={+scaleNumber}
                        style={styles.scaleSlider}>
                        <Slider.Track>
                          <Slider.FilledTrack />
                        </Slider.Track>
                        <Slider.Thumb />
                      </Slider>
                    </>
                  </ImageBackground>
                  <View style={styles.scaleTitles}>
                    <Text style={styles.scaleNumber}>{params.eSList.from}</Text>
                    <Text style={styles.scaleNumber}>{params.eSList.to}</Text>
                  </View>
                </VStack>
              </FormControl>
            </View>
          </View>
          <View style={styles.buttons}>
            <TouchableOpacity onPress={() => handleSendScale(params.id)}>
              <SaveButton
                bgColor={styleVariables.colors.blue}
                textColor="white"
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styleElements.row}>
        <View style={[styles.tile, styleElements.tile]}>
          <ScrollView contentInsetAdjustmentBehavior="automatic">
            <Text style={styles.text}>{params.eSList.description}</Text>
          </ScrollView>
        </View>
      </View>
      <Modal
        statusBarTranslucent
        animationType="fade"
        transparent={true}
        visible={openExercise}
        onRequestClose={() => {
          setOpenExercise(!openExercise);
        }}>
        <Exercise setOpenExercise={setOpenExercise} eSList={params.eSList} />
      </Modal>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: RFValue(18),
  },
  text: {
    fontSize: RFValue(16),
    textAlign: 'justify',
    paddingHorizontal: 25,
  },
  tile: {
    paddingVertical: 25,
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tileRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttons: {
    width: '90%',
    alignItems: 'flex-end',
  },
  scaleContainer: {
    width: '90%',
  },
  scaleSlider: {
    width: '83%',
    position: 'absolute',
    top: '20%',
    left: '9%',
    right: '8%',
  },
  scaleNumbers: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: '8%',
    marginRight: '5.5%',
    marginBottom: 5,
  },
  scaleNumber: {
    fontSize: RFValue(16),
  },
  scaleTitles: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    marginLeft: 5,
    textAlign: 'center',
    fontSize: RFValue(18),
    width: '20%',
    padding: 5,
  },
});
