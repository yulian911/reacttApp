import React, {useEffect, useState} from 'react';
import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {IEatAmount} from '../../../shared/Models/EatAmount.models';
import {MealTypes} from '../../../shared/Models/Local/Meals.models';
import {GetGeneral} from '../../../shared/Requests/GetGeneral';
import {meals} from '../../../shared/Variables/Meals';
import {styleElements} from '../../../Styles/styleElements';
import {styleVariables} from '../../../Styles/styleVariables';
import {ScreenContainer} from '../../Home/components/ScreenContainer';
import {stackScreenOptions} from '../../Navigation/Functions/stackScreenOptions';
import EatAmountModal from './elements/EatAmountModal';

interface IMeals {
  id: number;
  title: string;
  type: MealTypes;
}

export default ({navigation, route}: any) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [mealType, setMealType] = useState<MealTypes>();
  const [clickedDataMeals, setClickedDataMeals] = useState<IEatAmount[] | null>(
    null,
  );
  const [testRefresh, setTestRefresh] = useState<boolean>(true);
  const [clickedMeal, setClickedMeal] = useState<IEatAmount>();
  const [reloadList, setReloadList] = useState(true);

  const params = route.params;
  // const meals: IMeals[] = [
  //   {
  //     id: 1,
  //     title: 'Śniadanie',
  //     type: 'breakfast',
  //   },
  //   {
  //     id: 2,
  //     title: 'Drugie\nśniadanie',
  //     type: 'second_breakfast',
  //   },
  //   {
  //     id: 3,
  //     title: 'Obiad',
  //     type: 'lunch',
  //   },
  //   {
  //     id: 5,
  //     title: 'Kolacja',
  //     type: 'dinner',
  //   },
  // ];

  const handleGetTodayMeals = async (date: string) => {
    const result = await GetGeneral.clickedDataMeals(date);
    // TODO zapytanie z klikniętej daty robić
    if (result.error) {
      console.log(result);
      return;
    }
    setClickedDataMeals(result.data);
    console.log(result.data);
  };

  useEffect(() => {
    params.date && handleGetTodayMeals(params.date);
    !reloadList && setReloadList(true);
  }, [reloadList]);

  // useEffect(() => {
  //   params.date && handleGetTodayMeals(params.date);
  // }, [params.date]);

  const handleOpenModal = (type: MealTypes) => {
    setOpenModal(true);
    setMealType(type);
    clickedDataMeals &&
      clickedDataMeals.find(fd => {
        if (fd.type === type) {
          setClickedMeal(fd);
        }
      });
  };

  useEffect(() => {
    console.log(params);
    navigation.setOptions(
      stackScreenOptions(navigation, `${params.name}`, 'calendar'),
    );
  }, [navigation]);

  const showStatusBar = (percent: number | null) => {
    if (percent === 0) {
      return <Text style={[styles.title, {color: 'red'}]}>Nie zjedzono</Text>;
    }
    if (percent === null) {
      return (
        <Text style={styles.title}>Dotknij, aby dodać zjedzoną porcję</Text>
      );
    } else {
      return (
        <>
          <Text style={styles.title}>Zjedzono</Text>
          <View style={styles.eatenBarStatus}>
            <View
              style={{
                borderTopLeftRadius: 5,
                borderBottomLeftRadius: 5,
                backgroundColor: percent && percent >= 25 ? '#0FFF0F' : 'white',
                height: '100%',
                width: '25%',
                borderColor: styleVariables.colors.gray,
                borderRightWidth: 1,
              }}>
              <Text style={styles.fraction}>1/4</Text>
            </View>
            <View
              style={{
                backgroundColor: percent && percent >= 50 ? '#00F800' : 'white',
                height: '100%',
                width: '25%',
                borderColor: styleVariables.colors.gray,
                borderRightWidth: 1,
              }}>
              <Text style={styles.fraction}>2/4</Text>
            </View>
            <View
              style={{
                backgroundColor: percent && percent >= 75 ? '#00E200' : 'white',
                height: '100%',
                width: '25%',
                borderColor: styleVariables.colors.gray,
                borderRightWidth: 1,
              }}>
              <Text style={styles.fraction}>3/4</Text>
            </View>
            <View
              style={{
                borderTopRightRadius: 5,
                borderBottomRightRadius: 5,
                backgroundColor:
                  percent && percent >= 100
                    ? styleVariables.colors.green
                    : 'white',
                height: '100%',
                width: '25%',
              }}>
              <Text style={styles.fraction}>1</Text>
            </View>
          </View>
        </>
      );
    }
  };

  return (
    <ScreenContainer>
      {reloadList &&
        meals.map((el, index) => {
          let percent: number | null = null;
          clickedDataMeals &&
            clickedDataMeals.find(fd => {
              if (fd.type === el.type) {
                percent = fd.percent;
              }
            });
          return (
            <View style={styleElements.row} key={index}>
              <TouchableOpacity
                onPress={() => handleOpenModal(el.type)}
                style={[styles.tile, styleElements.tile]}>
                <View style={{justifyContent: 'flex-start'}}>
                  <Text style={styles.tileTitle}>{el.title}</Text>
                </View>
                <View style={styles.eatenSection}>
                  {showStatusBar(percent)}
                </View>
              </TouchableOpacity>
            </View>
          );
        })}
      <View style={styleElements.row}>
        <TouchableOpacity
          // onPress={() => handleSetDeviceId(el.device_name)}
          onPress={() => navigation.push('WaterAmount', {date: params.date})}
          style={[styles.tile, styleElements.tile]}>
          <View style={{justifyContent: 'flex-start'}}>
            <Text style={styles.tileTitle}>Woda</Text>
          </View>
          {/* <View style={styles.eatenSection}>
            <Text style={styles.title}>Wypito</Text>
          </View> */}
        </TouchableOpacity>
      </View>
      <Modal
        statusBarTranslucent
        animationType="fade"
        transparent={true}
        visible={openModal}
        onRequestClose={() => {
          setOpenModal(!openModal);
        }}>
        {clickedMeal ? (
          <EatAmountModal
            setReloadList={setReloadList}
            setOpenModal={setOpenModal}
            info={{
              text: 'Zaznacz zjedzoną porcję',
              title: 'Zapisz',
              date: params.date,
              clickedMeal: clickedMeal,
            }}
          />
        ) : (
          <EatAmountModal
            setReloadList={setReloadList}
            setOpenModal={setOpenModal}
            info={{
              text: 'Zaznacz zjedzoną porcję',
              title: 'Zapisz',
              date: params.date,
              mealType: mealType,
            }}
          />
        )}
      </Modal>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  tileTitle: {
    marginTop: 15,
    fontSize: RFValue(16),
    fontWeight: '700',
  },
  tile: {
    flexDirection: 'row',
    paddingHorizontal: 25,
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
  },
  addDevice: {
    height: RFValue(50),
  },
  tileTwoIcons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  title: {
    textTransform: 'uppercase',
    letterSpacing: 1,
    // marginRight: 5,
    fontSize: RFValue(14),
  },
  fraction: {
    fontSize: RFValue(10),
    textAlign: 'center',
  },
  eatenSection: {
    alignItems: 'center',
    width: '55%',
  },
  eatenBarStatus: {
    flexDirection: 'row',
    marginTop: 5,
    borderRadius: 5,
    borderColor: styleVariables.colors.gray,
    borderWidth: 1,
    // height: 40,
    width: '100%',
  },
});
