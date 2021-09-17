import {StackNavigationOptions} from '@react-navigation/stack';
import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/MaterialIcons';
import NavIcon from '../../../shared/Components/Icons/NavIcon';
import {styleElements} from '../../../Styles/styleElements';
import {styleVariables} from '../../../Styles/styleVariables';

export const stackScreenOptions = (
  navigation: any,
  title: string,
  icon: string,
): StackNavigationOptions => {
  return {
    headerStyle: {
      backgroundColor: 'transparent',
      shadowColor: 'transparent',
      height: RFValue(55),
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
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}>
          <Icon
            name="arrow-back-ios"
            color={styleVariables.colors.green}
            size={RFValue(30)}
            style={{alignSelf: 'center'}}
          />
        </TouchableOpacity>
        <Text style={styles.compTitle}>{title}</Text>
        <NavIcon icon={icon} size={RFValue(25)} />
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
  },
  compHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'center',
    paddingRight: 25,
    paddingLeft: 15,
    width: Dimensions.get('window').width - 20,
    marginVertical: 10,
    height: RFValue(45),
    // height: '100%',
    backgroundColor: 'white',
  },
  backBtn: {
    width: RFValue(40),
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
