// export const SEND_MESSAGE = 'SEND_MESSAGE'
// export const LOAD_MESSAGE = 'LOAD_MESSAGES'
// export const JOIN_CHATROOM = 'JOIN_CHATROOM'
// export const DELETE_MESSAGE = 'DELETE_MESSAGE'
// export const CHAT_ERROR = 'CHAT_ERRO'

import {IMessages} from '../../shared/Models/Messages.models';
import {INotifications} from '../../shared/Models/Notification.models';

// export const CHAT_DISCONECT = 'CHAT_DISCONECT'
export type ChatMessageType = {
  messages: IMessages[];
  notifications: INotifications[];
};

const initialState: ChatMessageType = {
  messages: [],
  notifications: [],
};

export enum ChatActionTypes {
  NOTIFICATIONS_RECEIVED = 'NOTIFICATIONS_RECEIVED',
  CHAT_CLEAR = 'CHAT_CLEAR',
  NOTIFICATIONI_IS_READ = 'NOTIFICATIONI_IS_READ',
  MESSAGE_RECEIVED = 'LOAD_MESSAGES',
  NOTIFICATIONS_CLEAR = 'NOTIFICATIONS_CLEAR',
}

// interface joinChatRoomAction {
//   type: ChatActionTypes.JOIN_CHATROOM
//   payload: any
// }
interface loadMessageAction {
  type: ChatActionTypes.MESSAGE_RECEIVED;
  payload: IMessages;
}
interface loadNotificationAction {
  type: ChatActionTypes.NOTIFICATIONS_RECEIVED;
  payload: INotifications;
}

interface readNotificationAction {
  type: ChatActionTypes.NOTIFICATIONI_IS_READ;
  payload: INotifications;
}
interface chatCleanAction {
  type: ChatActionTypes.CHAT_CLEAR;
}

interface notificationsCleanAction {
  type: ChatActionTypes.NOTIFICATIONS_CLEAR;
}

// interface chatErrorAction {
//   type: ChatActionTypes.CHAT_ERROR
//   payload: any

export type ChatAction =
  | loadMessageAction
  | loadNotificationAction
  | readNotificationAction
  | chatCleanAction
  | notificationsCleanAction;

//  sendMessageAction

export const chatReducer = (
  state = initialState,
  action: ChatAction,
): ChatMessageType => {
  switch (action.type) {
    case ChatActionTypes.MESSAGE_RECEIVED:
      return {...state, messages: [...state.messages, action.payload]};
    case ChatActionTypes.CHAT_CLEAR:
      return {...state, messages: []};
    case ChatActionTypes.NOTIFICATIONS_RECEIVED:
      return {
        ...state,
        notifications: [...state.notifications, action.payload],
      };
    case ChatActionTypes.NOTIFICATIONS_CLEAR:
      return {
        ...state,
        notifications: [],
      };
    case ChatActionTypes.NOTIFICATIONI_IS_READ:
      state.notifications.map(el => {
        const newState = [...state.notifications];
        newState.map(el => {
          if (el.id === action.payload.id) {
            el.is_read = true;
          }
        });
        return {
          ...state,
          notifications: newState,
        };
      });
    default:
      return state;
  }
};

// actions

export const clear = () => ({
  type: ChatActionTypes.CHAT_CLEAR,
});
