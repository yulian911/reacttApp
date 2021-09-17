import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon3 from 'react-native-vector-icons/SimpleLineIcons';
import Icon4 from 'react-native-vector-icons/AntDesign';

import DietActivityIcon from 'cudapp/resources/icons/diet.svg';
import NRIcon from 'cudapp/resources/icons/nutritionalRecommends.svg';
import YourProgressIcon from 'cudapp/resources/icons/yourProgress.svg';
import ShoppingListIcon from 'cudapp/resources/icons/shoppingList.svg';
import WaterAmountIcon from 'cudapp/resources/icons/waterAmoumt.svg';
import DietIcon from 'cudapp/resources/icons/dietActivity.svg';
import ActivityIcon from 'cudapp/resources/icons/activity.svg';
import KnowledgeBaseFaqIcon from 'cudapp/resources/icons/knowledgeBaseFaq.svg';
import EmotionalSupportIcon from 'cudapp/resources/icons/emotionalSupport.svg';
import ContactIcon from 'cudapp/resources/icons/contact.svg';
import ArticlesIcon from 'cudapp/resources/icons/articles.svg';
import {useTypeSelector} from '../../../components/hook/usetypeSelector';
import {INotifications} from '../../Models/Notification.models';

interface IProps {
  icon: string;
  size: number;
  color?: string;
}

export default (props: IProps): JSX.Element => {
  const {notifications} = useTypeSelector(state => state.chat);

  const showIsReadLength = (notifications: INotifications[]): JSX.Element => {
    // let xdd = [];

    // xdd.push(notifications.find(el => el.is_read === false));

    // if (xdd.length === 0) {
    return <Icon2 name="bell-outline" color={props.color} size={props.size} />;
    // } else {
    //   console.log('xdd', xdd);
    //   return (
    //     <View
    //       style={{position: 'relative', width: props.size, height: props.size}}>
    //       <Icon2 name="bell-outline" color={props.color} size={props.size} />
    //       <View
    //         style={{
    //           position: 'absolute',
    //           top: 0,
    //           right: 0,
    //           backgroundColor: 'red',
    //           width: '50%',
    //           borderRadius: 10,
    //           justifyContent: 'center',
    //           alignItems: 'center',
    //         }}>
    //         <Text style={{color: 'white', fontWeight: '700', fontSize: 12}}>
    //           {xdd.length}
    //         </Text>
    //       </View>
    //     </View>
    //   );
    // }
  };

  switch (props.icon) {
    case 'nutritionalRecommends':
      return <NRIcon width={props.size} height={props.size} fill="skyblue" />;
    case 'yourProgress':
      return (
        <YourProgressIcon width={props.size} height={props.size} fill="pink" />
      );
    case 'waterAmount':
      return (
        <WaterAmountIcon width={props.size} height={props.size} fill="blue" />
      );
    case 'knowledgeBase':
      return (
        <KnowledgeBaseFaqIcon
          width={props.size}
          height={props.size}
          fill="skyblue"
        />
      );
    case 'youtube':
      return <Icon2 name="youtube" color="red" size={props.size} />;
    case 'Diet':
      return (
        <DietIcon
          width={props.size}
          height={props.size}
          fill={props.color ? props.color : 'lime'}
        />
      );
    case 'dietActivity':
      return (
        <DietActivityIcon
          width={props.size}
          height={props.size}
          fill={props.color ? props.color : 'lime'}
        />
      );
    case 'articles':
      return (
        <ArticlesIcon
          width={props.size}
          height={props.size}
          fill={props.color ? props.color : 'green'}
        />
      );
    case 'activity':
      return (
        <ActivityIcon
          width={props.size}
          height={props.size}
          fill={props.color ? props.color : 'lime'}
        />
      );
    case 'biaMeasurement':
      return <Icon name="cloudscale" color="orange" size={props.size} />;
    case 'Home':
      return <Icon3 name="home" size={props.size} color={props.color} />;
    case 'shoppingList':
      return (
        <ShoppingListIcon
          width={props.size}
          height={props.size}
          fill={props.color ? props.color : 'orange'}
        />
      );
    case 'emotionalSupport':
      return (
        <EmotionalSupportIcon
          width={props.size}
          height={props.size}
          fill="skyblue"
        />
      );
    case 'contact':
      return (
        <ContactIcon width={props.size} height={props.size} fill="black" />
      );
    case 'Profile':
      return <Icon4 name="user" size={props.size} color={props.color} />;
    case 'faq':
      return <Icon3 name="question" color="blue" size={props.size} />;
    case 'Notifications':
      return showIsReadLength(notifications);
    case 'calendar':
      return <Icon3 name="calendar" color="black" size={props.size} />;
    case 'history':
      return <Icon2 name="history" color="black" size={props.size} />;
    default:
      return <Icon4 name="question" color="black" size={props.size} />;
  }
};
