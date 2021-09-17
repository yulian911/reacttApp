import 'react-native-gesture-handler';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {useEffect, useState} from 'react';
import Diet from '../Diet/Diet';
import Home from '../Home/Home';
import YourProgress from '../Home/YourProgress/YourProgress';
import {createStackNavigator} from '@react-navigation/stack';
import KnowledgeBaseFaq from '../Home/KnowledgeBaseFaq/KnowledgeBaseFaq';
import DietActivity from '../Home/DietActivity/DietActivity';
import EmotionalSupport from '../Home/EmotionalSupport/EmotionalSupport';
import Contact from '../Home/Contact/Contact';
import Faq from '../Home/KnowledgeBaseFaq/Faq/Faq';
import {stackScreenOptions} from './Functions/stackScreenOptions';
import BiaMeasurement from '../Home/BiaMeasurement/BiaMeasurement';
import NutritionalRecommends from '../Home/DietActivity/NutritionalRecommends/NutritionalRecommends';
import ShoppingList from '../Home/DietActivity/ShoppingList/ShoppingList';
import WaterAmount from '../Diet/WaterAmount/WaterAmount';
import LoginPage from '../LoginPage/LoginPage';
import {useAuth} from '../../Auth/Auth';
import ESView from '../Home/EmotionalSupport/components/ESView';
import Profile from '../Profile/Profile';
import NavIcon from '../../shared/Components/Icons/NavIcon';
import Intro from '../Intro/Intro';
import AddDevice from '../Home/BiaMeasurement/AddDevice/AddDevice';
import {Chat} from '../Home/Contact/components/Chat';
import {tabScreenOptions} from './Functions/tabScreenOptions';
import DietDayView from '../Diet/DietDayView/DietDayView';
import DietsPdfList from '../Diet/DietsPdfList/DietsPdfList';
import QuestionnairesList from '../Notifications/QuestionnairesList/QuestionnairesList';
import TasteChange from '../Notifications/QuestionnairesList/Questionnaires/TasteChange';
import SwallowProblem from '../Notifications/QuestionnairesList/Questionnaires/SwallowProblem';
import Onkodietetyka from '../Notifications/QuestionnairesList/Questionnaires/Onkodietetyka';
import {styleVariables} from '../../Styles/styleVariables';
import {appUpdate} from './Functions/appUpdate';
import DietsFuturePdfList from '../Diet/DietsPdfList/DietsFuturePdfList';
import Notifications from '../Notifications/Notifications';

const RootStack = createStackNavigator();
const Tabs = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const ContactStack = createStackNavigator();
const KnowledgeBaseFaqStack = createStackNavigator();
const DietActivityStack = createStackNavigator();
const BiaMeasurementStack = createStackNavigator();
const EmotionalSupportStack = createStackNavigator();
const NotificationsStack = createStackNavigator();
const QuestionnairesStack = createStackNavigator();
const DietStack = createStackNavigator();

export default () => {
  const {authData, showIntro} = useAuth();

  const [bgColor, setBgColor] = useState<string>(
    styleVariables.colors.greenOpacity,
  );

  const theme = {
    ...DefaultTheme,
    dark: false,
    colors: {
      ...DefaultTheme.colors,
      background: bgColor,
    },
  };

  useEffect(() => {
    appUpdate();
  }, []);

  const HomeStackScreen = () => (
    <HomeStack.Navigator initialRouteName="HomeMenu">
      {console.log('HomeStackScreen')}
      <HomeStack.Screen
        name="HomeMenu"
        component={Home}
        options={{headerShown: false}}
      />
      <HomeStack.Screen
        name="YourProgress"
        component={YourProgress}
        options={({navigation}) =>
          stackScreenOptions(navigation, 'Twoje postępy', 'yourProgress')
        }
      />
      <HomeStack.Screen
        name="KnowledgeBaseFaq"
        component={KnowledgeBaseFaqStackScreen}
        options={{headerShown: false}}
      />
      {/* <HomeStack.Screen
        name="DietActivity"
        component={DietActivityStackScreen}
        options={{headerShown: false}}
      /> */}
      <HomeStack.Screen
        name="BiaMeasurement"
        component={BiaMeasurementStackScreen}
        options={{headerShown: false}}
      />
      <HomeStack.Screen
        name="EmotionalSupport"
        component={EmotionalSupportStackScreen}
        options={{headerShown: false}}
      />
      <HomeStack.Screen
        name="Contact"
        component={ContactStackScreen}
        options={{headerShown: false}}
      />
    </HomeStack.Navigator>
  );

  const BiaMeasurementStackScreen = () => (
    <HomeStack.Navigator initialRouteName="BiaMeasurementScreen">
      <BiaMeasurementStack.Screen
        name="BiaMeasurementScreen"
        component={BiaMeasurement}
        options={({navigation}) =>
          stackScreenOptions(navigation, 'Pomiary', 'biaMeasurement')
        }
      />
      <BiaMeasurementStack.Screen
        name="AddDevice"
        component={AddDevice}
        options={({navigation}) =>
          stackScreenOptions(navigation, 'Dodaj urządzenie', '')
        }
      />
    </HomeStack.Navigator>
  );

  const KnowledgeBaseFaqStackScreen = () => (
    <KnowledgeBaseFaqStack.Navigator>
      <KnowledgeBaseFaqStack.Screen
        name="KnowledgeBaseFaqScreen"
        component={KnowledgeBaseFaq}
        options={({navigation}) =>
          stackScreenOptions(navigation, 'Baza wiedzy - FAQ', 'knowledgeBase')
        }
      />
      <KnowledgeBaseFaqStack.Screen
        name="Faq"
        component={Faq}
        options={({navigation}) => stackScreenOptions(navigation, 'FAQ', 'faq')}
      />
    </KnowledgeBaseFaqStack.Navigator>
  );

  const DietActivityStackScreen = () => (
    <DietActivityStack.Navigator>
      <DietActivityStack.Screen
        name="DietActivityScreen"
        component={DietActivity}
        options={({navigation}) =>
          stackScreenOptions(
            navigation,
            'Dieta i aktywność dietetyczna',
            'dietActivity',
          )
        }
      />
      <DietActivityStack.Screen
        name="NutritionalRecommends"
        component={NutritionalRecommends}
        options={({navigation}) =>
          stackScreenOptions(
            navigation,
            'Zalecenia żywieniowe',
            'nutritionalRecommends',
          )
        }
      />
      <DietActivityStack.Screen
        name="ShoppingList"
        component={ShoppingList}
        options={({navigation}) =>
          stackScreenOptions(navigation, 'Lista zakupów', 'shoppingList')
        }
      />
    </DietActivityStack.Navigator>
  );

  const EmotionalSupportStackScreen = () => (
    <EmotionalSupportStack.Navigator initialRouteName="EmotionalSupportScreen">
      <EmotionalSupportStack.Screen
        name="EmotionalSupportScreen"
        component={EmotionalSupport}
        options={({navigation}) =>
          stackScreenOptions(
            navigation,
            'Wsparcie emocjonalne',
            'emotionalSupport',
          )
        }
      />
      <EmotionalSupportStack.Screen
        name="ESView"
        component={ESView}
        options={({navigation}) => stackScreenOptions(navigation, 'ESView', '')}
      />
    </EmotionalSupportStack.Navigator>
  );

  const NotificationsStackScreen = () => (
    <NotificationsStack.Navigator initialRouteName="NotificationsStackScreen">
      <NotificationsStack.Screen
        name="NotificationsStackScreen"
        component={Notifications}
        options={({navigation}) =>
          tabScreenOptions(navigation, 'Powiadomienia', 'Notifications')
        }
      />
      <NotificationsStack.Screen
        name="QuestionnairesList"
        component={QuestionnairesStackScreen}
        options={{headerShown: false}}
      />
    </NotificationsStack.Navigator>
  );

  const QuestionnairesStackScreen = () => (
    <QuestionnairesStack.Navigator initialRouteName="QuestionnairesStackScreen">
      <QuestionnairesStack.Screen
        name="QuestionnairesStackScreen"
        component={QuestionnairesList}
        options={({navigation}) =>
          stackScreenOptions(navigation, 'Ankiety', '')
        }
      />
      <QuestionnairesStack.Screen
        name="TasteChange"
        component={TasteChange}
        options={({navigation}) =>
          stackScreenOptions(navigation, 'Zmiana smaku', '')
        }
      />
      <QuestionnairesStack.Screen
        name="SwallowProblem"
        component={SwallowProblem}
        options={({navigation}) =>
          stackScreenOptions(navigation, 'Problemy z połykaniem', '')
        }
      />
      <QuestionnairesStack.Screen
        name="Onkodietetyka"
        component={Onkodietetyka}
        options={({navigation}) =>
          stackScreenOptions(navigation, 'Onkodietetyka', '')
        }
      />
    </QuestionnairesStack.Navigator>
  );

  const DietStackScreen = () => (
    <DietStack.Navigator initialRouteName="DietStack">
      <DietStack.Screen
        name="DietStack"
        component={Diet}
        options={({navigation}) =>
          tabScreenOptions(navigation, 'Dieta', 'Diet')
        }
      />
      <DietStack.Screen
        name="DietDayView"
        component={DietDayView}
        options={({navigation, route}) => {
          return stackScreenOptions(navigation, '', '');
        }}
      />
      <DietStack.Screen
        name="DietsPdfList"
        component={DietsPdfList}
        options={({navigation, route}) => {
          return stackScreenOptions(navigation, 'Historia diet', 'history');
        }}
      />
      <DietStack.Screen
        name="DietsFuturePdfList"
        component={DietsFuturePdfList}
        options={({navigation, route}) => {
          return stackScreenOptions(navigation, 'Zaplanowane diety', 'history');
        }}
      />
      <DietStack.Screen
        name="WaterAmount"
        component={WaterAmount}
        options={({navigation}) =>
          stackScreenOptions(navigation, 'Ilość wypitej wody', 'waterAmount')
        }
      />
    </DietStack.Navigator>
  );

  const ProfileStackScreen = () => (
    <ContactStack.Navigator initialRouteName="HomeMenu">
      <ContactStack.Screen
        name="ProfileStack"
        component={Profile}
        options={({navigation}) =>
          tabScreenOptions(navigation, 'Profil', 'Profile')
        }
      />
    </ContactStack.Navigator>
  );

  const ContactStackScreen = () => (
    <ContactStack.Navigator initialRouteName="HomeMenu">
      <ContactStack.Screen
        name="ContactStack"
        component={Contact}
        options={({navigation}) =>
          stackScreenOptions(navigation, 'Kontakt', 'contact')
        }
      />
      <ContactStack.Screen
        name="Chat"
        component={Chat}
        options={({navigation}) =>
          stackScreenOptions(navigation, 'Chat', 'contact')
        }
      />
    </ContactStack.Navigator>
  );

  // const tabBarListeners = ({navigation, route}: any) => ({
  //   tabPress: () => navigation.navigate(route.name),
  // });

  const TabsScreen = () => (
    <Tabs.Navigator
      initialRouteName="Home"
      screenOptions={({route}) => ({
        tabBarStyle: {
          // backfaceVisibility: 'hidden',
        },
        // tabBarBackground: () => undefined,
        tabBarIcon: ({color, size}) => (
          <NavIcon icon={route.name} size={size} color={color} />
        ),
        headerShown: false,
      })}>
      <Tabs.Screen
        name="Home"
        component={HomeStackScreen}
        options={{title: 'Home'}}
      />
      <Tabs.Screen
        name="Diet"
        component={DietStackScreen}
        options={{title: 'Dieta', unmountOnBlur: true}}
        // listeners={tabBarListeners}
      />
      {/* TODO zrobić to */}
      {/* <Tabs.Screen
        name="Activity"
        component={Activity}
        options={
          ({navigation}) =>
            tabScreenOptions(navigation, 'Aktywność fizyczna', 'activity')
            }
      /> */}
      <Tabs.Screen
        name="Profile"
        component={ProfileStackScreen}
        options={{title: 'Profil', unmountOnBlur: true}}
      />
      <Tabs.Screen
        name="Notifications"
        component={NotificationsStackScreen}
        options={{title: 'Powiadomienia'}}
      />
    </Tabs.Navigator>
  );

  return (
    <NavigationContainer theme={theme}>
      <RootStack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="Tabs">
        {authData ? (
          <RootStack.Screen name="Tabs" component={TabsScreen} />
        ) : (
          <>
            {showIntro ? (
              <RootStack.Screen name="Intro" component={Intro} />
            ) : (
              <RootStack.Screen name="LoginPage" component={LoginPage} />
            )}
          </>
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};
