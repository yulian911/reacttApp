import {Image, Text, View} from 'native-base';
import React, {useEffect, useRef} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {RFValue} from 'react-native-responsive-fontsize';
import {IMessages} from '../../../../shared/Models/Messages.models';
import {ChatMessageType} from './Chat';

interface MessageProps {
  message: IMessages;
}

export const Message = ({message}: MessageProps) => {
  let email = message.from_user;
  let lasta = email.lastIndexOf('@');
  let host;
  if (lasta != -1) {
    host = email.substring(lasta + 1);
    /* automatically extends to end of string when 2nd arg omitted */
  } else {
    /* respond to invalid email in some way */
  }

  const ChatMessage =
    host !== 'onkodietetyka.pl' && 'openlabotec.com'
      ? styles.messagePatient
      : styles.message;

  const UserMessage =
    host !== 'onkodietetyka.pl' && 'openlabotec.com'
      ? styles.textPatient
      : styles.textMessage;

  const UserMessageBox =
    host !== 'onkodietetyka.pl' && 'openlabotec.com'
      ? styles.boxPatient
      : styles.boxMessage;

  return (
    <>
      <View style={ChatMessage}>
        <View style={UserMessageBox}>
          <Text style={UserMessage}>{message.time.slice(0, 16)}</Text>
          <Text style={UserMessage}>{message.from_user}</Text>
        </View>
        <View style={{paddingTop: 10}}>
          <Text style={UserMessage}>{message.message}</Text>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  messagePatient: {
    width: '85%',
    alignSelf: 'flex-end',
    marginVertical: '2%',
    backgroundColor: 'white',
    paddingTop: '2%',
    paddingBottom: '6%',
    paddingLeft: '6%',
    paddingRight: '6%',
    borderTopLeftRadius: 60,
    borderRadius: 5,
  },

  message: {
    width: '85%',
    marginVertical: '2%',
    backgroundColor: 'white',
    paddingTop: '2%',
    paddingBottom: '6%',
    paddingLeft: '6%',
    paddingRight: '6%',
    borderTopRightRadius: 50,
  },
  textMessage: {
    fontSize: RFValue(16),
    // fontWeight: '700',
  },
  textPatient: {
    fontSize: RFValue(16),
    // fontWeight: '700',
    textAlign: 'right',
  },
  boxPatient: {
    marginLeft: '2%',
    flexDirection: 'column-reverse',
    borderBottomWidth: 2,
    paddingBottom: RFValue(5),
    borderBottomColor: '#92d776',
  },
  boxMessage: {
    flexDirection: 'column-reverse',
    paddingBottom: RFValue(5),
    borderBottomWidth: 2,
    borderBottomColor: '#92d776',
  },
  data: {
    fontSize: RFValue(14),
    marginTop: RFValue(5),
  },
});
