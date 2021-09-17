import React, {useState} from 'react';
import {
  Alert,
  Button,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {styleElements} from '../../Styles/styleElements';
import {useTypeSelector} from '../hook/usetypeSelector';
import {RFValue} from 'react-native-responsive-fontsize';
import {
  getDateFormat,
  getHourFormat,
} from '../../shared/Formatters/dateHourFormat';
import {NOTIFICATION_TYPES} from '../../shared/Variables/NotificationTypes';
import {INotifications} from '../../shared/Models/Notification.models';
import {GetGeneral} from '../../shared/Requests/GetGeneral';
import {PatchGeneral} from '../../shared/Requests/PatchGeneral';
import {useDispatch} from 'react-redux';
import {readNotification} from '../../store/action/chatActions';
import {TabActions} from '@react-navigation/native';
import {useProfile} from '../../Contex/profileContex';

export default ({navigation}: any) => {
  const dispatch = useDispatch();
  const {notifications} = useTypeSelector(state => state.chat);
  const [refresh, setRefresh] = useState(1);
  const {fromNotification, setFromNotification} = useProfile();

  const sortById = (arrayWithObjects: any[]) => {
    const result = arrayWithObjects.sort((a, b) => {
      const first = a.id;
      const second = b.id;

      if (first === second) {
        return first - second;
      }

      return second - first;
    });
    return result;
    /**
     * Sortowanie obiektów po id
     */
  };

  const sortByBoolean = (arrayWithObjects: any[]) => {
    const result = arrayWithObjects.sort((a, b) => {
      const first = a.is_read;
      const second = b.is_read;

      if (first === second) {
        return first - second;
      }

      return first - second;
    });
    return result;
    /**
     * Sortowanie obiektów po booleanie
     */
  };

  const title = (type: string) => {
    let title = '';
    switch (type) {
      case NOTIFICATION_TYPES.qn_onkodietetyka:
        title = 'Nowa ankieta';
        break;
      case NOTIFICATION_TYPES.qn_swallowProblem:
        title = 'Nowa ankieta';
        break;
      case NOTIFICATION_TYPES.qn_tasteChange:
        title = 'Nowa ankieta';
        break;
      case NOTIFICATION_TYPES.diet_notification:
        title = 'Nowa dieta';
        break;
      case NOTIFICATION_TYPES.food_recommendation:
        title = 'Zalecenie żywieniowe';
        break;
      case NOTIFICATION_TYPES.chat_notification:
        title = 'Nowa wiadomość';
        break;
      default:
        title = 'Powiadomienie';
    }
    return title;
  };

  const handleSetType = (notification: INotifications) => {
    let destination: string | null = null;
    let title: string = 'Powiadomienie';
    let toHome = 'QuestionnairesList';

    // const jumpToDiet = TabActions.jumpTo('Home');
    // let newMessage = navigation.dispatch(jumpToDiet)
    switch (notification.type) {
      case NOTIFICATION_TYPES.qn_onkodietetyka:
        destination = 'Onkodietetyka';
        title = 'Ankieta';
        break;
      case NOTIFICATION_TYPES.food_recommendation:
        title = 'Zalecenie żywieniowe';
        break;
      case NOTIFICATION_TYPES.diet_notification:
        toHome = 'Diet';
        destination = 'Diet';
        title = 'Nowa dieta';
        break;
      case NOTIFICATION_TYPES.chat_notification:
        toHome = 'Contact';
        destination = 'Chat';
        title = 'Nowa wiadomość';
        setFromNotification(true);
        break;
      case NOTIFICATION_TYPES.qn_tasteChange:
        destination = 'TasteChange';
        title = 'Ankieta';
        break;
      case NOTIFICATION_TYPES.qn_swallowProblem:
        destination = 'SwallowProblem';
        title = 'Ankieta';
        break;
      default:
        destination = null;
    }

    let btns;

    if (destination) {
      btns = [
        {text: 'Zamknij', onPress: undefined},
        {
          text: 'Przejdź',
          onPress: () =>
            navigation.navigate(toHome, {
              screen: destination,
            }),
        },
      ];
    } else {
      btns = [{text: 'Ok', onPress: undefined}];
    }

    Alert.alert(title, notification.message, btns);
  };

  const handleOpenAlert = async (el: INotifications) => {
    if (!el.is_read) {
      const result = await PatchGeneral.readNotification(el.id, {
        is_read: true,
      });
      if (result.error) {
        return;
      }
      dispatch(readNotification(result.data));
      setRefresh(refresh + 1);
    }
    handleSetType(el);
  };

  return (
    <>
      <ScrollView style={styles.scrollView}>
        {/* // TODO Testowo */}
        {/* <Button
          title="Włącz onkodietetyka"
          onPress={() =>
            navigation.navigate('QuestionnairesList', {
              screen: 'Onkodietetyka',
            })
          }
        /> */}
        {refresh && notifications.length ? (
          sortByBoolean(sortById(notifications)).map((el, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.tile,
                styleElements.tile,
                {
                  backgroundColor: el.is_read
                    ? 'rgba(229, 229, 229, 0.9)'
                    : 'white',
                },
              ]}
              onPress={() => handleOpenAlert(el)}>
              <View style={styles.nRow}>
                <Text style={styles.title}>{title(el.type)}</Text>
                <Text>
                  {getDateFormat(el.time.replace(' ', 'T'))}{' '}
                  {getHourFormat(
                    el.time.replace(' ', 'T'),
                    new Date(el.time.replace(' ', 'T')).getTimezoneOffset() /
                      60,
                  )}
                </Text>
              </View>
              <View style={styles.tRow}>
                <Text style={styles.text}>{el.message}</Text>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <View>
            <Text>Brak powiadomień</Text>
          </View>
        )}
      </ScrollView>
      {/* <Button
        title="Ankieta"
        onPress={() => navigation.navigate('QuestionnairesList')}></Button> */}
    </>
  );
};

const styles = StyleSheet.create({
  notifications: {
    marginTop: 10,
  },
  questionnaireContainer: {
    // TODO tu coś było
  },
  tile: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'center',
    padding: 15,
    width: Dimensions.get('window').width - 20,
    marginBottom: 10,
    // height: 50,
  },
  nRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: RFValue(45),
    overflow: 'hidden',
  },
  title: {
    fontWeight: '700',
  },
  text: {
    alignSelf: 'center',
    marginTop: 5,
    fontSize: RFValue(16),
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
  message: {
    width: '100%',
    marginVertical: '2%',
    backgroundColor: 'grey',
    padding: '5%',
    borderRadius: 10,
  },
  scrollView: {
    marginVertical: 10,
  },
});
