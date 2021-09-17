type NotificationType = 'notification'

export interface INotifications {
  id?: number,
  type: NotificationType
  channel: string,
  message: string,
  time: string,
  is_read: boolean,
  user: number
}
