import {IMessages} from '../../shared/Models/Messages.models';
import {INotifications} from '../../shared/Models/Notification.models';
import {ChatActionTypes} from '../redux/chatReducer';

// Send message
// export const sendMsg = (data: string) => {
//   return (dispatch: Dispatch<ChatAction>) => {
//     console.log('actions send message')
//     dispatch(sentMsg(data))
//     wsChanel.send(data)
//   }
// }

// export const recieveMsg = (data: IMessages) => {
//   return (dispatch: Dispatch<ChatAction>) => {
//     console.log('actions receive message')
//     dispatch(receivedMsg(data))
//   }
// }

// const sentMsg = (data: string) => {
//   return {
//     type: ChatActionTypes.SENT_MESSAGE,
//     payload: data,
//   }
// }

export const receivedMsg = (data: IMessages) => {
  return {
    type: ChatActionTypes.MESSAGE_RECEIVED,
    payload: data,
  };
};

export const readNotification = (data: INotifications) => {
  return {
    type: ChatActionTypes.NOTIFICATIONI_IS_READ,
    payload: data,
  };
};
