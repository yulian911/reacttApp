import {combineReducers} from 'redux';
import {chatReducer} from './chatReducer';
import {notificationTestReducer} from './notificationReducerTest';
import {userReducer} from './userReducer';

export const rootReducer = combineReducers({
  notificationTest: notificationTestReducer,
  chat: chatReducer,
  user: userReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
