import {Dispatch} from 'react'
import {baseURL} from '../../shared/AxiosInstance/AxiosInstance'
import {INotifications} from '../../shared/Models/Notifications.models'
import {
  NotificationAction,
  NotificationActionTypes,
} from '../redux/notificationReducerTest'

export const setNotification = (
  notification: INotifications,
): NotificationAction => ({
  type: NotificationActionTypes.LOAD_NOTIFICATIONS,
  payload: notification,
})

export const setConnectionStatus = (
  status: boolean,
  errorMsg?: string,
): NotificationAction => {
  return {
    type: NotificationActionTypes.CONNECT_CHANNEL,
    isConnected: status,
    errormsg: errorMsg ? errorMsg : null,
  }
}

export const disconnectChannel = (): NotificationAction => ({
  type: NotificationActionTypes.DISCONNECT_CHANNEL,
})
