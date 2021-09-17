export interface IMessages {
  id: number;
  message: string;
  channel: number;
  time: string;
  is_read: boolean;
  from_user: string;
  to_user: string;
}
