import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {styleElements} from '../../../Styles/styleElements';
import {ScreenContainer} from '../components/ScreenContainer';
import {TabActions} from '@react-navigation/native';
import NavIcon from '../../../shared/Components/Icons/NavIcon';
import {RFValue} from 'react-native-responsive-fontsize';

const DietActivity = ({navigation}: any) => {
  const jumpToDiet = TabActions.jumpTo('Diet');
  const navigateToWaterAmount = TabActions.jumpTo('Diet', {
    screen: 'WaterAmount',
  });

  // let navigate = navigation.navigate('QuestionnairesList', {
  //   screen: destination,
  // });

  return (
    <ScreenContainer>
      <View style={styles.dietActivity}>
        <View style={styleElements.row}>
          <TouchableOpacity
            onPress={() => navigation.dispatch(jumpToDiet)}
            style={[styles.tile, styles.tileRectangular, styleElements.tile]}>
            <View style={styles.textContanier}>
              <NavIcon icon="Diet" size={RFValue(90)} />
              <Text style={styles.title}>Dieta</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styleElements.row}>
          <TouchableOpacity
            style={[styles.tile, styleElements.tile]}
            onPress={() => navigation.push('NutritionalRecommends')}>
            <View style={styles.textContanier}>
              <NavIcon icon="nutritionalRecommends" size={RFValue(90)} />
              <Text style={styles.title}>{'Zalecenia\nżywieniowe'}</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tile, styleElements.tile]}
            onPress={() => navigation.push('ShoppingList')}>
            <View style={styles.textContanier}>
              <NavIcon icon="shoppingList" size={RFValue(90)} />
              <Text style={styles.title}>{'Lista\nzakupów'}</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styleElements.row}>
          <TouchableOpacity
            style={[styles.tile, styles.tileRectangular, styleElements.tile]}
            onPress={() => navigation.dispatch(navigateToWaterAmount)}>
            <View style={styles.textContanier}>
              <NavIcon icon="waterAmount" size={RFValue(90)} />
              <Text style={styles.title}>Ilość wypitej wody</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ScreenContainer>
  );
};

export default DietActivity;

const styles = StyleSheet.create({
  dietActivity: {
    // flex: 8,
    height: '100%',
    justifyContent: 'space-between',
  },
  title: {
    marginTop: 15,
    textAlign: 'center',
    fontWeight: '700',
    fontSize: RFValue(16),
  },
  tile: {
    paddingVertical: 10,
    width: '49%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tileRectangular: {
    width: '100%',
  },
  tileTwoIcons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  textContanier: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
