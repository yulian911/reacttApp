import React, {useEffect} from 'react';
import {
  BackHandler,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {styleElements} from '../../Styles/styleElements';
import {ScreenContainer} from './components/ScreenContainer';
import NavIcon from '../../shared/Components/Icons/NavIcon';
import {RFValue} from 'react-native-responsive-fontsize';
import withChannels from '../../hoc/withChannels';
import {TabActions} from '@react-navigation/native';

import {
  getApplicationName,
  getModel,
  getSystemName,
  getSystemVersion,
  getVersion,
} from 'react-native-device-info';
import {useProfile} from '../../Contex/profileContex';

const Home = ({navigation}: any): JSX.Element => {
  const jumpToDiet = TabActions.jumpTo('Diet');
  const {handleGetPatientProfile, handleGetICE} = useProfile();

  console.log('version', getSystemName(), getSystemVersion(), getModel());

  useEffect(() => {
    console.log('ładuje Home i pobieram profile i ice');
    handleGetPatientProfile();
    handleGetICE();
    return () => {
      console.log('rozłączam Home');
    };
  }, []);

  return (
    <ScreenContainer>
      <View
        style={{
          backgroundColor: 'green',
          justifyContent: 'center',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
        }}>
        <Text style={{textAlign: 'center', fontWeight: '700', color: 'white'}}>
          {getApplicationName()} - wersja {getVersion()}
        </Text>
        {/* <Text style={{textAlign: 'center', fontWeight: '700', color: 'white'}}>
          {getSystemName()} {getSystemVersion()} {getModel()}
        </Text> */}
      </View>
      <View style={[styles.row, {marginTop: 15}]}>
        {/* <Button title="Wyłącz apke" onPress={() => BackHandler.exitApp()} /> */}
        <TouchableOpacity
          style={[styles.tile, styleElements.tile]}
          onPress={() => navigation.navigate('YourProgress')}>
          <>
            <View style={styles.textContanier}>
              <NavIcon icon="yourProgress" size={RFValue(90)} />
              <Text style={styles.title}>{'Twoje\npostępy'}</Text>
            </View>
          </>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tile, styleElements.tile]}
          onPress={() => navigation.navigate('KnowledgeBaseFaq')}>
          <>
            <View style={styles.textContanier}>
              <NavIcon icon="knowledgeBase" size={RFValue(90)} />
              <Text style={styles.title}>{'Baza wiedzy\nFAQ'}</Text>
            </View>
          </>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.tile, styleElements.tile]}
          onPress={() => navigation.dispatch(jumpToDiet)}>
          <>
            <View style={styles.textContanier}>
              <NavIcon icon="dietActivity" size={RFValue(90)} />
              <Text style={styles.title}>
                {'Dieta i aktywność\ndietetyczna'}
              </Text>
            </View>
          </>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tile, styleElements.tile]}
          onPress={() => navigation.navigate('BiaMeasurement')}>
          <>
            <View style={styles.textContanier}>
              <NavIcon icon="biaMeasurement" size={RFValue(90)} />
              <Text style={styles.title}>Pomiary</Text>
            </View>
          </>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.tile, styleElements.tile]}
          onPress={() => navigation.navigate('EmotionalSupport')}>
          <>
            <View style={styles.textContanier}>
              <NavIcon icon="emotionalSupport" size={RFValue(90)} />
              <Text style={styles.title}>{'Wsparcie\nemocjonalne'}</Text>
            </View>
          </>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tile, styleElements.tile]}
          onPress={() => navigation.navigate('Contact')}>
          <View style={styles.textContanier}>
            <NavIcon icon="contact" size={RFValue(90)} />
            <Text style={styles.title}>Kontakt</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScreenContainer>
  );
};

export default withChannels(Home);

const styles = StyleSheet.create({
  row: {
    paddingVertical: '1%',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tile: {
    alignItems: 'center',
    width: '49%',
    // paddingVertical: '10%',
  },
  title: {
    marginTop: 15,
    textAlign: 'center',
    fontWeight: '700',
    fontSize: RFValue(16),
  },
  textContanier: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
