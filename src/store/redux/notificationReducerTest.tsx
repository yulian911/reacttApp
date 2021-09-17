import {INotifications} from '../../shared/Models/Notifications.models'

export interface NotificationState {
  notifications: INotifications[]
  isConnected: boolean
  errormsg: null | string
}

const initialState: NotificationState = {
  notifications: [],
  isConnected: false,
  errormsg: null,
}

export enum NotificationActionTypes {
  CONNECT_CHANNEL = 'CONNECT_CHANNEL',
  DISCONNECT_CHANNEL = 'DISCONNECT_CHANNEL',
  LOAD_NOTIFICATIONS = 'LOAD_NOTIFICATIONS',
}

interface connectAction {
  type: NotificationActionTypes.CONNECT_CHANNEL
  isConnected: boolean
  errormsg: string | null
}
interface disconnectAction {
  type: NotificationActionTypes.DISCONNECT_CHANNEL
}
interface loadNotificationAction {
  type: NotificationActionTypes.LOAD_NOTIFICATIONS
  payload: INotifications
}
export type NotificationAction =
  | connectAction
  | disconnectAction
  | loadNotificationAction

export const notificationTestReducer = (
  state = initialState,
  action: NotificationAction,
): NotificationState => {
  switch (action.type) {
    case NotificationActionTypes.CONNECT_CHANNEL:
      return {
        ...state,
        isConnected: action.isConnected,
        errormsg: action.errormsg,
      }
    case NotificationActionTypes.LOAD_NOTIFICATIONS:
      return {...state, notifications: [...state.notifications, action.payload]}
    case NotificationActionTypes.DISCONNECT_CHANNEL:
      return initialState
    default:
      return state
  }
}
