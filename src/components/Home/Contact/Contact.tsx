import React, {useState} from 'react';
import {
  Linking,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import {styleElements} from '../../../Styles/styleElements';

import TelephoneIcon from 'cudapp/resources/icons/telephone.svg';
import WwwIcon from 'cudapp/resources/icons/www.svg';
import MessengerIcon from 'cudapp/resources/icons/messenger.svg';
import {RFValue} from 'react-native-responsive-fontsize';
import {ScreenContainer} from '../components/ScreenContainer';
import {Chat} from './components/Chat';
import NavIcon from '../../../shared/Components/Icons/NavIcon';
import {styleVariables} from '../../../Styles/styleVariables';
import {ProfileProvider} from '../../../Contex/profileContex';

export default ({navigation}: any): JSX.Element => {
  const [openChat, setOpenChat] = useState<boolean>(false);

  // const handleOpenMessenger = () => {};

  return (
    // <ProfileProvider>
    <ScreenContainer>
      <View style={styles.contact}>
        <View style={[styles.tile, styles.tileRectangular, styleElements.tile]}>
          <View style={styles.tileRow}>
            <TelephoneIcon
              width={RFValue(40)}
              height={RFValue(40)}
              fill="green"
              opacity={0.5}
            />
            <TouchableOpacity
              onPress={() => Linking.openURL('tel:52 335 01 70')}>
              <Text style={styles.textInfo}>52 335 01 70</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.tileRow}>
            <WwwIcon
              width={RFValue(40)}
              height={RFValue(40)}
              fill="green"
              opacity={0.5}
            />
            <TouchableOpacity
              onPress={() => Linking.openURL('https://onkodietetyka.pl/')}>
              <Text style={styles.textInfo}>onkodietetyka.pl</Text>
            </TouchableOpacity>

            {/* <Text style={styles.textInfo}>onkodietetyka.pl</Text> */}
          </View>
          {/* <View style={styles.tileRow}>
            <MessengerIcon
              width={RFValue(40)}
              height={RFValue(40)}
              fill="green"
              opacity={0.5}
            />
            <Text style={styles.textInfo}>onkodietetyka</Text>
          </View> */}
        </View>

        <View style={styleElements.row}>
          <View
            style={[styles.tile, styles.tileRectangular, styleElements.tile]}>
            <TouchableOpacity
              style={[styleElements.tile, styles.tileS]}
              onPress={() => navigation.navigate('Chat')}>
              <View style={styles.textContanier}>
                <NavIcon icon="contact" size={RFValue(90)} />
                <Text style={styles.title}>Chat</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScreenContainer>
    // </ProfileProvider>
  );
};

const styles = StyleSheet.create({
  contact: {
    // flex: 8,
    height: '100%',
    justifyContent: 'space-between',
  },
  tile: {
    paddingHorizontal: '5%',
    paddingVertical: '10%',
    justifyContent: 'space-around',
  },
  tileS: {
    backgroundColor: styleVariables.colors.greenOpacity,
    paddingHorizontal: '5%',
    paddingTop: '5%',
    marginHorizontal: '10%',
    height: '70%',
    justifyContent: 'space-around',
  },
  tileRow: {
    marginBottom: '5%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInfo: {
    marginLeft: '5%',
    fontSize: RFValue(18),
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
  title: {
    marginTop: 15,
    textAlign: 'center',
    fontWeight: '700',
    fontSize: RFValue(16),
  },
});
