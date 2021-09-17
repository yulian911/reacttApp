import React, {createContext, useState, useContext, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {PostGeneral} from '../shared/Requests/PostGeneral';
import {axiosInstance} from '../shared/AxiosInstance/AxiosInstance';
import {Alert, BackHandler} from 'react-native';
import {checkAuth} from './functions/checkAuth';
import {GetGeneral} from '../shared/Requests/GetGeneral';
import {checkShowIntro} from './functions/checkShowIntro';
import FullScreenLoading from '../components/Navigation/components/FullScreenLoading';
import {userData} from '../store/action/userActions';
import {useDispatch} from 'react-redux';
import {useTypeSelector} from '../components/hook/usetypeSelector';
import {baseURL} from '../shared/Variables/Auth';

type AuthContextData = {
  authData: AuthData | null;
  loading: boolean;
  signIn(data: string): Promise<void>;
  signOut(): void;
  actualDate: Date;
  setShowIntro: React.Dispatch<React.SetStateAction<boolean>>;
  showIntro: boolean;
};

type AuthData = {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  scope: string;
  token_type: string;
};

//Create the Auth Context with the data type specified
//and a empty object
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({children}) => {
  const [authData, setAuthData] = useState<AuthData | null>(null);
  const [showIntro, setShowIntro] = useState<boolean>(false);
  const dispatch = useDispatch();
  // const [timeRemaining, setTimeRemaining] = useState<number>()
  const [actualDate, setActualDate] = useState<Date>(new Date());
  //the AuthContext start with loading equals true
  //and stay like this, until the data be load from Async Storage
  const [loading, setLoading] = useState(true);

  const handleGetActualDate = async () => {
    const result = await GetGeneral.actualDate();
    if (result.error) {
      console.log('Problem z pobraniem aktualnej daty');
      return;
    }
    console.log('result.data', result.data.date);
    setActualDate(new Date(result.data.date));
  };

  useEffect(() => {
    console.log('actualDate', typeof actualDate);
  }, [actualDate]);

  const checkAuthAsync = async (actualDate: Date) => {
    console.log('checkAuthAsync');
    const result = await checkAuth(actualDate);
    loadStorageData(result);
  };

  useEffect(() => {
    //Every time the App is opened, this provider is rendered
    handleGetActualDate();
    checkAuthAsync(actualDate);
  }, []);

  const handleGetUserInfo = async () => {
    console.log('Logowanie ');
    const result = await GetGeneral.userInfo();
    if (result.error) {
      Alert.alert('Komunikat', 'Błąd połączenia z serwerem.', [
        {text: 'wyjdź', onPress: () => BackHandler.exitApp()},
        {text: 'Ponów połączenie', onPress: () => handleGetUserInfo()},
      ]);
      return;
    }
    dispatch(userData(result.data));
    setLoading(false);
    return;
  };

  // useEffect(() => {
  //   const unsubscribe = setTimeout(() => {
  //     handleGetUserInfo()
  //   },3000)
  //   return () => {
  //     unsubscribe
  //   }
  // }, [])

  // const loadStorageData = async (refresh: boolean): Promise<void> => {
  //   try {
  //     //Try get the data from Async Storage
  //     const authDataSerialized = await AsyncStorage.getItem('@AuthData');
  //     if (authDataSerialized) {
  //       const _authData: AuthData = JSON.parse(authDataSerialized);
  //       if (refresh) {
  //         const data = JSON.stringify({
  //           grant_type: 'refresh_token',
  //           client_id: 'zMXyzQra9VXpSRuQlcXGseAgsSa4N3ad6TEdo9xZ',
  //           refresh_token: _authData.refresh_token,
  //         });
  //         await signIn(data, true);
  //         return;
  //       }
  //       //If there are data, it's converted to an Object and the state is updated.
  //       setAuthData(_authData);

  //       // handleSetTimeToRefresh(_authData.expires_in)

  //       // Dodanie nagłówka do axiosInstance zaraz po zalogowaniu
  //       axiosInstance.defaults.headers[
  //         'Authorization'
  //       ] = `${_authData.token_type} ${_authData.access_token}`;

  //       await handleGetUserInfo();
  //     } else {
  //       setShowIntro(await checkShowIntro());
  //       console.log('Brak danych w @AuthData');
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     //loading finished
  //     console.log('Finally loadStorageData');
  //     setLoading(false);
  //   }
  // };

  const loadStorageData = async (refresh: boolean): Promise<void> => {
    //Try get the data from Async Storage
    const authDataSerialized = await AsyncStorage.getItem('@AuthData');
    if (authDataSerialized) {
      const _authData: AuthData = JSON.parse(authDataSerialized);
      if (refresh) {
        const data = JSON.stringify({
          grant_type: 'refresh_token',
          client_id: baseURL,
          refresh_token: _authData.refresh_token,
        });
        await signIn(data, true);
        return;
      }
      //If there are data, it's converted to an Object and the state is updated.
      setAuthData(_authData);

      // handleSetTimeToRefresh(_authData.expires_in)

      // Dodanie nagłówka do axiosInstance zaraz po zalogowaniu
      axiosInstance.defaults.headers[
        'Authorization'
      ] = `${_authData.token_type} ${_authData.access_token}`;

      handleGetUserInfo();
    } else {
      setShowIntro(await checkShowIntro());
      console.log('Brak danych w @AuthData');
      setLoading(false);
    }
    // setLoading(false);
  };

  const signIn = async (data: string, refresh?: true) => {
    //call the service passing credential (email and password).
    //In a real App this data will be provided by the user from some InputText components.
    const _authData = await PostGeneral.signIn(data);
    if (_authData.error) {
      if (refresh) {
        signOut();
        Alert.alert('Błąd sesji, zaloguj się ponownie');
        return;
      }
      Alert.alert('Komunikat', 'Błąd logowania. Spróbuj ponownie.', [
        {text: 'Ok', onPress: undefined},
      ]);
      return;
    }
    //Set the data in the context, so the App can be notified
    //and send the user to the AuthStack
    setAuthData(_authData.data);

    //Persist the data in the Async Storage
    //to be recovered in the next user session.
    AsyncStorage.setItem('@AuthData', JSON.stringify(_authData.data));

    // console.log('Aktualna data w sek', actualDate.getTime() / 1000)
    // console.log('Czas wygaśnięcia w sek', _authData.data.expires_in)
    // console.log(
    //   'Aktualna data w sek + czas wygaśnięcia',
    //   actualDate.getTime() / 1000 + _authData.data.expires_in,
    // )

    AsyncStorage.setItem(
      '@RefreshDate',
      JSON.stringify(actualDate.getTime() / 1000 + _authData.data.expires_in),
    );

    // Dodanie nagłówka do axiosInstance zaraz po zalogowaniu
    axiosInstance.defaults.headers[
      'Authorization'
    ] = `${_authData.data.token_type} ${_authData.data.access_token}`;
    handleGetUserInfo();
  };

  const signOut = async () => {
    try {
      //Try get the data from Async Storage
      const authDataSerialized = await AsyncStorage.getItem('@AuthData');
      if (authDataSerialized) {
        const _authData: AuthData = JSON.parse(authDataSerialized);

        const data = JSON.stringify({
          client_id: baseURL,
          token: _authData.access_token,
        });
        await PostGeneral.signOut(data);

        //Remove data from context, so the App can be notified
        //and send the user to the AuthStack
        setAuthData(null);
        //Remove the data from Async Storage
        //to NOT be recoverede in next session.
        await AsyncStorage.removeItem('@AuthData');
        await AsyncStorage.removeItem('@RefreshDate');

        // Usunięcie nagłówka po wylogowaniu z axiosInstance
        axiosInstance.defaults.headers['Authorization'] = null;
        return;
      }
    } catch (error) {
    } finally {
      //loading finished
      setLoading(false);
    }
  };

  // if (loading) {
  //   return (
  //     <View
  //       style={{
  //         flex: 1,
  //         justifyContent: 'center',
  //       }}>
  //       <ActivityIndicator color={'green'} animating={true} size="large" />
  //     </View>
  //   )
  // }

  const [loadComponent, setLoadComponent] = useState(false);

  useEffect(() => {
    if (loading) {
      console.log('loading True', loading);
      return;
    } else {
      console.log('loading False', loading);
      const timer = setTimeout(() => {
        setLoadComponent(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [loading]);

  return (
    //This component will be used to encapsulate the whole App,
    //so all components will have access to the Context
    <AuthContext.Provider
      value={{
        authData,
        loading,
        signIn,
        signOut,
        actualDate,
        setShowIntro,
        showIntro,
      }}>
      {!loading && loadComponent ? children : <FullScreenLoading />}
    </AuthContext.Provider>
  );
};

//A simple hooks to facilitate the access to the AuthContext
// and permit components to subscribe to AuthContext updates
const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};

export {AuthContext, AuthProvider, useAuth};
