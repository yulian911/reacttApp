import React, {Component, useEffect, useRef} from 'react';
import {
  StyleSheet,
  Animated,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
  View,
  TextInput,
  Dimensions,
} from 'react-native';
import {Container, Input, Button, HStack, Box, Center} from 'native-base';

import Person from 'react-native-vector-icons/Ionicons';
import {useState} from 'react';
import {w3cwebsocket} from 'websocket';
import {ChatActionTypes, clear} from '../../../../store/redux/chatReducer';
import {Message} from './Message';

import Plus from 'react-native-vector-icons/AntDesign';
import {useTypeSelector} from '../../../hook/usetypeSelector';
import {useDispatch} from 'react-redux';
import {receivedMsg} from '../../../../store/action/chatActions';
import ChatBot from './ChatBot';
import {RFValue} from 'react-native-responsive-fontsize';
import {baseURL} from '../../../../shared/Variables/Auth';
import {NOTIFICATION_TYPES} from '../../../../shared/Variables/NotificationTypes';
import {INotifications} from '../../../../shared/Models/Notification.models';
import {GetGeneral} from '../../../../shared/Requests/GetGeneral';
import {useProfile} from '../../../../Contex/profileContex';
// import {recieveMsg, sendMsg} from '../../../../store/action/chatActions'
export type ChatMessageType = {
  id: number;
  channel: 1;
  message: string;
  timestamp: string;
  is_read: boolean;
  user: number;
};
let wsChanel: WebSocket;
function createChanel(id: number) {
  wsChanel = new WebSocket(`ws://${baseURL}/ws/chat/${id}/?${id}`);
}
export const Chat: React.FC = () => {
  // useEffect(() => {
  //   createChanel()
  //   wsChanel.onclose = function () {
  //     console.log(' Closed web socked')
  //   }
  // }, [])
  const [visible, setVisible] = useState(true);
  const [stageView, setStageView] = useState<any>('');
  const [katView, setKatView] = useState<any>('');
  const handleVisableChat = () => {
    setVisible(false);
  };
  const scrollViewRef = useRef<any>();

  const {fromNotification, setFromNotification} = useProfile();

  return (
    <Box flex={1} style={styles.container} safeAreaTop>
      {visible && !fromNotification ? (
        <ChatBot
          changeVisableChat={handleVisableChat}
          setStageView={setStageView}
          setKatView={setKatView}
        />
      ) : (
        <Box flex={1}>
          <Center flex={1}>
            <ScrollView
              style={styles.scrollView}
              ref={scrollViewRef}
              onContentSizeChange={() =>
                scrollViewRef.current.scrollToEnd({animated: false})
              }>
              <View style={styles.container}>
                <Messages />
              </View>
            </ScrollView>
          </Center>

          <HStack
            style={{paddingTop: 10, justifyContent: 'center'}}
            safeAreaBottom>
            <AddForm stageView={stageView} katView={katView} />
          </HStack>
        </Box>
      )}
    </Box>
  );
};

const Messages: React.FC = () => {
  const {messages} = useTypeSelector(state => state.chat);
  const {fromNotification, setFromNotification} = useProfile();

  const dispatch = useDispatch();
  // const [messages, setMessages] = useState<ChatMessageType[]>([])
  const {userData} = useTypeSelector(state => state.user);
  const chat = (id: number) => {
    createChanel(id);
    // wsChanel.onopen = () => {
    //   setTimeout(createChanel, 3000)
    //   console.log(' Closed web socked')
    // }
    wsChanel.onmessage = e => {
      let newMesseges = JSON.parse(e.data);
      console.log('e', e);
      // setMessages(prevMes => [...prevMes, newMesseges])
      console.log(JSON.parse(e.data));
      // const dsds = {
      //   messages: newMesseges
      // }
      // dispatch(receivedMsg(newMesseges))
      dispatch({type: ChatActionTypes.MESSAGE_RECEIVED, payload: newMesseges});
    };
  };

  const closeChat = () => {
    wsChanel.onclose = e => {
      wsChanel.close();
      console.log('Close');
    };
    dispatch(clear());
    setFromNotification(!fromNotification);
  };

  useEffect(() => {
    userData && chat(userData.id);
    return () => closeChat();
  }, []);

  return (
    <>
      {messages.map((m, index) => (
        <View key={index}>
          <Message message={m} />
        </View>
      ))}
    </>
  );
};

const AddForm = ({stageView, katView}: any) => {
  const [message, setMessage] = useState('');
  // const wsChanel = new WebSocket(`ws://${baseURL}/ws/chat/2/?2`);
  const {fromNotification} = useProfile();

  const sendMessage = () => {
    if (!message) {
      return;
    }

    // console.log('message', message);

    wsChanel.send(
      JSON.stringify({
        message: message,
        thread: fromNotification === true ? ' Inne' : stageView,
        treatment_stage: fromNotification === true ? ' Inne' : katView,
        // user: 2,
      }),
    );
    setMessage('');
    // console.log(wsChanel.send(JSON.stringify({message})));
  };

  return (
    <View style={styles.footer}>
      <Input
        style={styles.input}
        w="90%"
        _light={{
          placeholderTextColor: 'blueGray.400',
        }}
        fontSize={RFValue(14)}
        height={RFValue(100)}
        backgroundColor="white"
        placeholder="wpisz text"
        multiline={true}
        textAlignVertical="top"
        placeholderTextColor="#2e2d2c"
        clearButtonMode="always"
        disableFullscreenUI={true}
        value={message}
        onChangeText={setMessage}
        onSubmitEditing={sendMessage}
      />
      <TouchableOpacity
        style={{marginRight: RFValue(10)}}
        onPress={sendMessage}>
        <Plus name="plus" color="black" size={RFValue(30)} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
  },
  scrollView: {
    width: '100%',
    paddingHorizontal: 10,
  },
  chatHeaderIcons: {
    backgroundColor: '#fb1963',
    fontFamily: 'SF-UI',
    fontSize: 30,
    fontWeight: 'bold',
    alignItems: 'center',
  },
  chatList: {
    marginTop: 10,
    marginBottom: 5,
  },
  chatBody: {
    backgroundColor: '#ffffff',
    borderRadius: 6,
    marginLeft: 22,
    paddingLeft: 30,
  },
  chatname: {
    color: '#95989a',
    marginBottom: 3,
    textTransform: 'capitalize',
    fontFamily: 'SF_UI-Display-Regular',
    fontSize: 13,
  },
  chatmsg: {
    fontFamily: 'SF_UI-Display-Regular',
    fontSize: 16,
    color: '#2e2d2c',
  },
  footer: {
    backgroundColor: 'transparent',
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 10,
    // alignItems: 'center',
    justifyContent: 'space-between',
    height: RFValue(100),
    marginRight: RFValue(12),
    marginBottom: RFValue(16),
    paddingLeft: RFValue(22),
    paddingTop: RFValue(1),
    paddingBottom: RFValue(16),
    paddingRight: RFValue(5),
  },
  input: {
    fontFamily: 'SF_UI-Display-Regular',
    fontSize: RFValue(16),
    color: '#2e2d2c',
    // width: '100%',
    backgroundColor: '#fff',
    marginRight: RFValue(7),
    borderRadius: RFValue(10),
    paddingLeft: RFValue(15),
    // alignItems: 'center',
    // height: RFValue(80),
  },
});
