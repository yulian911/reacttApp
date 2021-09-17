import {INotifications} from '../../shared/Models/Notifications.models'

export const SEND_MESSAGE = 'SEND_MESSAGE'
export const LOAD_MESSAGE = 'LOAD_MESSAGES'
export const JOIN_CHATROOM = 'JOIN_CHATROOM'
export const DELETE_MESSAGE = 'DELETE_MESSAGE'
export const CHAT_ERROR = 'CHAT_ERRO'
export const CHAT_DISCONECT = 'CHAT_DISCONECT'
export const SET_NOTIFICATION = 'SET_NOTIFICATION '

export interface iNotification {
  message: string
  type: 'success' | 'denger' | 'warning'
}

interface SetNotificationAction {
  type: typeof SET_NOTIFICATION
  payload: INotifications
}
export type NotificationAction = SetNotificationAction
