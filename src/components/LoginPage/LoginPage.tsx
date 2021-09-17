import React, {useState} from 'react';
import {Button, TouchableHighlight, TouchableOpacity} from 'react-native';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import LogoWithTitle, {
  ISlides,
} from '../../shared/Components/LogoWithTitle/LogoWithTitle';
import Icon from 'react-native-vector-icons/Ionicons';
import {useAuth} from '../../Auth/Auth';
import {ScreenContainer} from '../Home/components/ScreenContainer';
import {styleElements} from '../../Styles/styleElements';
import {RFValue} from 'react-native-responsive-fontsize';
import {clientId} from '../../shared/Variables/Auth';
import {PostGeneral} from '../../shared/Requests/PostGeneral';

const LoginPage = () => {
  const appDisplayName: string = require('cudapp/app.json').displayName;
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [login, setLogin] = useState<string | undefined>(undefined);
  const [password, setPassword] = useState<string | undefined>(undefined);
  const [showPassword, setShowPassword] = useState<boolean>(true);

  // const [loading, setLoading] = useState(false)

  const item: ISlides = {
    key: 1,
    title: appDisplayName,
    titleText: 'Zaloguj się, aby uzyskać dostęp do aplikacji.',
  };

  const auth = useAuth();

  const signIn = async (
    login: string | undefined,
    password: string | undefined,
  ) => {
    if (login && password) {
      const data = JSON.stringify({
        username: login,
        password: password,
        grant_type: 'password',
        client_id: clientId,
      });
      // setLoading(true)
      await auth.signIn(data);
    } else {
      console.log('Login lub hasło jest puste.');
      return;
    }
  };

  // const resetPassword = async () => {
  //   const result = await PostGeneral.resetPassword()
  // };

  // const register = () => {};

  return (
    <ScreenContainer>
      <View style={styles.loginPage}>
        {/* <View style={styleElements.row}> */}
        <View style={styles.logoWithTitle}>
          <LogoWithTitle item={item} />
        </View>
        {/* </View> */}
        <View style={styleElements.row}>
          <View style={styles.inputsContainer}>
            <View style={styles.inputView}>
              <TextInput
                style={styles.input}
                onChangeText={setLogin}
                value={login}
                placeholder="Adres E-mail"
              />
            </View>
            <View style={styles.inputView}>
              <View style={{flex: 7}}>
                <TextInput
                  style={styles.input}
                  onChangeText={setPassword}
                  value={password}
                  placeholder="Hasło"
                  secureTextEntry={showPassword}
                />
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                }}>
                {password?.length ? (
                  <TouchableHighlight
                    onPress={() => setShowPassword(showPassword ? false : true)}
                    style={styles.switchShowPassword}
                    activeOpacity={0.9}
                    underlayColor="lightgray">
                    <Icon
                      name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                      size={RFValue(25)}
                    />
                  </TouchableHighlight>
                ) : null}
              </View>
            </View>
            {/* <View style={styles.remindPasswordContainer}>
              <TouchableHighlight
                style={styles.remindPassword}
                onPress={remindPassword}
                activeOpacity={0.9}
                underlayColor="lightgray">
                <Text style={styles.rpText}>Przypomnij hasło</Text>
              </TouchableHighlight>
            </View> */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, {backgroundColor: 'rgb(51, 204, 51)'}]}
                onPress={() => signIn(login, password)}>
                <Text style={styles.rpText}>Zaloguj się</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </ScreenContainer>
  );
};

export default LoginPage;

const styles = StyleSheet.create({
  loginPage: {
    padding: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  logoWithTitle: {
    paddingVertical: RFValue(50),
  },
  inputsContainer: {
    width: '100%',
  },
  input: {
    width: '100%',
    fontSize: RFValue(16),
  },
  inputView: {
    flexDirection: 'row',
    // width: '100%',
    marginVertical: RFValue(10),
    borderBottomWidth: 2,
    borderBottomColor: 'gray',
  },
  remindPasswordContainer: {
    marginVertical: RFValue(15),
    alignSelf: 'flex-end',
  },
  remindPassword: {
    padding: 10,
    opacity: 0.75,
    color: 'lightgray',
  },
  rpText: {
    fontSize: RFValue(16),
  },
  buttonContainer: {
    marginVertical: RFValue(40),
  },
  button: {
    alignItems: 'center',
    paddingVertical: RFValue(5),
    width: '100%',
    fontWeight: '600',
  },
  switchShowPassword: {
    padding: 5,
  },
});
