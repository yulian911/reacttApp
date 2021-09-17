import React, {Component, useEffect} from 'react';
import {BackHandler, Text, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {useTypeSelector} from '../components/hook/usetypeSelector';
import {baseURL} from '../shared/Variables/Auth';
import {ChatActionTypes} from '../store/redux/chatReducer';

export default (WrappedComponent: any) => {
  const Hoc = (props: any) => {
    const {userData} = useTypeSelector(state => state.user);
    const dispatch = useDispatch();
    let wsChannelNotifications: WebSocket;

    const createChanels = (id: number) => {
      const url = `ws://${baseURL}/ws`;
      wsChannelNotifications = new WebSocket(
        `${url}/notifications/${id}/?${id}`,
      );
    };

    const noti = (id: number) => {
      createChanels(id);
      wsChannelNotifications.onmessage = e => {
        let newNotification = JSON.parse(e.data);
        // console.log('powiadomienie', newNotification);
        dispatch({
          type: ChatActionTypes.NOTIFICATIONS_RECEIVED,
          payload: newNotification,
        });
      };
    };

    useEffect(() => {
      userData && noti(userData.id);
    }, [userData]);

    const handleBackButton = () => {
      if (wsChannelNotifications) {
        wsChannelNotifications && wsChannelNotifications.close();
        console.log('Rozłączono z powiadomieniami');
      }
      dispatch({
        type: ChatActionTypes.NOTIFICATIONS_CLEAR,
      });
      return false;
    };

    useEffect(() => {
      BackHandler.addEventListener('hardwareBackPress', handleBackButton);
      return () => {
        BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
      };
    }, []);

    return <WrappedComponent {...props} />;
  };
  return Hoc;
};
