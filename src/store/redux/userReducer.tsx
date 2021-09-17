import {IUser} from '../../shared/Models/User.models';

export type UserType = {
  userData: IUser | null;
};

const initialState: UserType = {
  userData: null,
};

export enum UserActionTypes {
  USER_DATA = 'USER_DATA',
}

interface loadUserDataAction {
  type: UserActionTypes.USER_DATA;
  payload: IUser;
}

export type UserAction = loadUserDataAction;

export const userReducer = (
  state = initialState,
  action: UserAction,
): UserType => {
  switch (action.type) {
    case UserActionTypes.USER_DATA:
      return {...state, userData: action.payload};
    default:
      return state;
  }
};
