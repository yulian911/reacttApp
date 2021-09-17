import {IUser} from '../../shared/Models/User.models';
import {UserActionTypes} from '../redux/userReducer';

export const userData = (data: IUser) => {
  return {
    type: UserActionTypes.USER_DATA,
    payload: data,
  };
};
