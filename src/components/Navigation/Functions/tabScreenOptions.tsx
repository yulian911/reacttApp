import {BottomTabNavigationOptions} from '@react-navigation/bottom-tabs';
import {StackNavigationOptions} from '@react-navigation/stack';
import React from 'react';
import {
  Button,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import NavIcon from '../../../shared/Components/Icons/NavIcon';
import {styleElements} from '../../../Styles/styleElements';
import {styleVariables} from '../../../Styles/styleVariables';

export const tabScreenOptions = (
  navigation: any,
  title: string,
  icon: string,
): StackNavigationOptions => {
  return {
    headerStyle: {
      backgroundColor: 'transparent',
      shadowColor: 'transparent',
      height: RFValue(65),
      elevation: 0,
    },
    headerLeft: () => null,
    headerTitleContainerStyle: {
      width: Dimensions.get('window').width - 20,
      justifyContent: 'space-between',
      height: '100%',
    },
    headerTitle: () => (
      <View style={[styles.compHeader, styleElements.tile]}>
        {/* <Button title="<" onPress={() => navigation.goBack()} /> */}
        {/* <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}>
          <Icon
            name="arrow-back-ios"
            color={styleVariables.colors.green}
            size={RFValue(25)}
          />
        </TouchableOpacity> */}
        <Text style={styles.compTitle}>{title}</Text>
        {/* <Icon2 name="progress-check" color="pink" size={30} /> */}
        <NavIcon icon={icon} size={RFValue(40)} />
      </View>
    ),
  };
};

const styles = StyleSheet.create({
  compTitle: {
    fontWeight: '600',
    fontSize: RFValue(15),
    textAlign: 'center',
    color: 'black',
    // width: 250,
  },
  compHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'center',
    paddingHorizontal: 25,
    width: Dimensions.get('window').width - 20,
    marginVertical: 10,
    height: RFValue(55),
    // height: '100%',
    backgroundColor: 'white',
  },
  backBtn: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
