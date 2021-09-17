import React, {memo, useEffect, useState} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {ScrollView} from 'native-base';
import {styleElements} from '../../Styles/styleElements';

import * as Progress from 'react-native-progress';
import AppIntroSlider from 'react-native-app-intro-slider';
import {
  DoneButton,
  NextButton,
  PrevButton,
} from '../../shared/Components/Buttons/NextPrevDoneBtns';
import PhysicalActivity from './components/PhysicalActivity';
import ContactICE from './components/ContactICE';
import {useProfile} from '../../Contex/profileContex';
import {RFValue} from 'react-native-responsive-fontsize';
import Test from './components/Test';
import {ScreenContainer} from '../Home/components/ScreenContainer';
import Password from './components/Password';
import ProgressBarCustom from '../../shared/Components/ProgressBar/ProgressBarCustom';

const ProfileDetails = ({navigation}: any) => {
  const [progress, setProgress] = useState<number>(0);
  const {profile} = useProfile();

  const slides = [
    {
      key: 1,
      title: `${profile ? profile.first_name : ''} ${
        profile ? profile.last_name : ''
      }`,
    },
    {
      key: 2,
      title: 'Aktywność fizyczna',
    },
    {
      key: 3,
      title: 'Kontakt ICE',
    },
    {
      key: 4,
      title: 'Zmień hasło',
    },
  ];

  const renderItem = ({item}: any): JSX.Element | null => (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={styles.itemContainer}
      _contentContainerStyle={{
        px: '10px',
        w: '100%',
      }}>
      {item.title && <Text style={styles.title}>{item.title}</Text>}
      {item.key === 1 && <Test />}
      {item.key === 2 && <PhysicalActivity />}
      {item.key === 3 && <ContactICE />}
      {item.key === 4 && <Password />}
    </ScrollView>
  );

  const dataLength = slides.length - 1;

  useEffect(() => {
    console.log('ładuje profileDetails');
    return () => {
      console.log('rozłączam profileDetails');
    };
  }, []);

  return (
    <ScreenContainer>
      <View style={[styles.profileContainer, styleElements.tile]}>
        <View style={styles.profileHeader}>
          <ProgressBarCustom progress={progress} />
        </View>
        <View style={styles.profileContent}>
          <AppIntroSlider
            renderItem={renderItem}
            renderDoneButton={DoneButton}
            renderNextButton={NextButton}
            showPrevButton
            onSlideChange={a => setProgress(a / dataLength)}
            renderPrevButton={PrevButton}
            dotClickEnabled={false}
            dotStyle={{backgroundColor: 'transparent'}}
            activeDotStyle={{backgroundColor: 'transparent'}}
            data={slides}
            onDone={() => navigation.goBack()}
          />
        </View>
      </View>
    </ScreenContainer>
  );
};

export default memo(ProfileDetails);

const styles = StyleSheet.create({
  profile: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    height: '100%',
  },
  profileContainer: {
    padding: 20,
    height: '100%',
  },
  profileHeader: {
    justifyContent: 'center',
    marginVertical: 10,
  },
  profileContent: {
    height: '100%',
    paddingBottom: RFValue(40),
  },
  itemContainer: {
    flex: 1,
    marginBottom: RFValue(55),
  },
  title: {
    textAlign: 'center',
    // marginLeft: RFValue(5),
    letterSpacing: 1,
    fontSize: RFValue(18),
    marginBottom: RFValue(10),
    fontWeight: '700',
  },
});
