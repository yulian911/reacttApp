import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {useAuth} from '../../../Auth/Auth';
import {IEmotionalSupportList} from '../../../shared/Models/EmotionalSupportList';
import {GetGeneral} from '../../../shared/Requests/GetGeneral';
import {styleElements} from '../../../Styles/styleElements';
import {ScreenContainer} from '../components/ScreenContainer';
import {
  emotionalSupportList,
  IESLKeys,
} from './components/emotionalSupportList';

const EmotionalSupport = ({navigation}: any) => {
  const [eSResults, setESResults] = useState<IEmotionalSupportList | null>(
    null,
  );

  const handleGetEmotionalSupportList = async () => {
    const result = await GetGeneral.emotionalSupportList();
    if (result.error) {
      // console.log(result.status)
      if (result.status === 404) {
        // console.log(result.status)
      }
      return;
    }
    setESResults(result.data);
  };

  const emotionList = [
    {
      id: 1,
      name: 'Stres',
    },
    {
      id: 2,
      name: 'Zmęczenie',
    },
  ];

  const emotionResults = [
    {
      // id: 1,
      // date: '2021-10-03',
      // user_id: 23,
      emotionList_id: 1,
      result: 6,
      exercises: 4,
    },
    {
      id: 2,
      date: '2021-07-12',
      user_id: 12,
      emotionList_id: 2,
      result: 3,
      exercises: 2,
    },
  ];

  useEffect(() => {
    handleGetEmotionalSupportList();
    return () => {
      setESResults(null);
    };
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      handleGetEmotionalSupportList();
    });
    return unsubscribe;
  }, [navigation]);

  const checkObject = () => {};

  const showResult = (key: IESLKeys) => {
    if (eSResults && key) {
      if (key in eSResults) {
        if (eSResults[key] === null) {
          return;
        }
        return (
          <View style={styles.number}>
            <Text>{eSResults[key]}</Text>
          </View>
        );
      }
    } else {
      return null;
    }
  };

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={styles.emotionalSupport}>
      {emotionalSupportList?.map(el => (
        <TouchableOpacity
          style={[styles.tile, styleElements.tile]}
          key={el.id}
          onPress={() =>
            navigation.push('ESView', {
              eSList: el,
              eSResult:
                eSResults &&
                el.key in eSResults &&
                `${eSResults[el.key] ? eSResults[el.key] : '0'}`,
              id: eSResults ? eSResults.id : null,
            })
          }>
          <Text style={styles.text}>{el.name}</Text>
          {showResult(el.key)}
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default EmotionalSupport;

const styles = StyleSheet.create({
  emotionalSupport: {
    marginTop: 10,
  },
  tile: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'center',
    paddingHorizontal: 25,
    width: Dimensions.get('window').width - 20,
    marginBottom: 10,
    height: 80,
  },
  text: {
    fontSize: RFValue(16),
    width: '80%',
  },
  number: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    width: '20%',
    height: 40,
    borderRadius: 5,
    // height: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.9,
    shadowRadius: 6.27,

    elevation: 5,
  },
});
