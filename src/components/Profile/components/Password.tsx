import React, {useContext, useEffect, useRef, useState} from 'react';
import {Alert, Modal, TouchableHighlight} from 'react-native';
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Eyeo from 'react-native-vector-icons/FontAwesome';
import EyeOff from 'react-native-vector-icons/FontAwesome';
import {HelperText, TextInput} from 'react-native-paper';
import {RFValue} from 'react-native-responsive-fontsize';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AuthContext} from '../../../Auth/Auth';
import {useProfile} from '../../../Contex/profileContex';
import {getDateFormat} from '../../../shared/Formatters/dateHourFormat';
import {IPatientProfile} from '../../../shared/Models/PatientProfile.models';
import {GetGeneral} from '../../../shared/Requests/GetGeneral';
import {PatchGeneral} from '../../../shared/Requests/PatchGeneral';
import {PostGeneral} from '../../../shared/Requests/PostGeneral';
import {styleElements} from '../../../Styles/styleElements';
import InputProfile from './InputProfile';
import {Formik, FormikHelpers as FormikActions} from 'formik';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Yup from 'yup';
import {VStack} from 'native-base';
export interface ProfileProps {
  profile: IPatientProfile | null;
}

const changePasswordInit = {
  old_password: '',
  new_password1: '',
  new_password2: '',
};

interface IChangePasswordInit {
  old_password: string;
  new_password1: string;
  new_password2: string;
}

const validationSchema = Yup.object({
  old_password: Yup.string()
    .trim()
    .min(8, 'Za krótkie hasło min 8 znaków!')
    .required('Pole jest wymagane'),
  new_password1: Yup.string()
    .trim()
    .min(8, 'Za krótkie hasło  min 8 znaków!')
    .required('Pole jest wymagane'),
  new_password2: Yup.string().equals(
    [Yup.ref('new_password1'), null],
    'Wprowadzone hasło jest nie poprawne!',
  ),
});

export default () => {
  debugger;
  const {profile} = useProfile();
  const [error, setError] = useState(true);
  const {signOut} = useContext(AuthContext);
  const [show, setShow] = useState(true);
  const [showOne, setShowOne] = useState(true);
  const [showTwo, setShowTwo] = useState(true);
  const [password, setPassword] = useState<string | undefined>(undefined);

  const handleSendNewPassword = async (values: IChangePasswordInit) => {
    const result = await PostGeneral.changePassword(values);
    if (result.error) {
      Alert.alert('Błąd', 'Hasło nie zostało zmienione.');
      return;
    }
    Alert.alert('Komunikat', 'Hasło zmienione');
  };

  const initialValues: IChangePasswordInit = {
    old_password: '',
    new_password1: '',
    new_password2: '',
  };

  return (
    <>
      <VStack style={styles.container}>
        <View style={styles.row}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values, {resetForm}) => {
              handleSendNewPassword(values);
              resetForm({values: changePasswordInit});
            }}>
            {props => (
              <VStack space={6} style={styles.row}>
                <View style={styles.box}>
                  {/* {error ? (
                      <Text style={{color: 'red', fontSize: RFValue(16)}}>
                        {props.touched.old_password &&
                          props.errors.old_password}
                      </Text>
                    ) : null} */}

                  <View style={styles.boxInput}>
                    <TextInput
                      style={styles.textInput}
                      mode="outlined"
                      onBlur={props.handleBlur('old_password')}
                      secureTextEntry={show ? true : false}
                      value={props.values.old_password}
                      label="Wpisz stare hasło"
                      onChangeText={props.handleChange('old_password')}
                      editable={true}
                    />

                    <TouchableHighlight
                      onPress={() => setShow(show ? false : true)}
                      style={styles.showBtn}
                      activeOpacity={0.5}
                      underlayColor="white">
                      <Icon
                        name={show ? 'eye-outline' : 'eye-off-outline'}
                        size={RFValue(25)}
                      />
                    </TouchableHighlight>
                  </View>
                  <HelperText
                    style={{fontSize: RFValue(14)}}
                    type="error"
                    visible={error}>
                    {props.touched.old_password && props.errors.old_password}
                  </HelperText>
                </View>
                <View style={styles.box}>
                  <View style={styles.boxInput}>
                    <TextInput
                      style={styles.textInput}
                      mode="outlined"
                      secureTextEntry={showOne ? true : false}
                      onBlur={props.handleBlur('new_password1')}
                      value={props.values.new_password1}
                      label="Wpisz nowe hasło"
                      onChangeText={props.handleChange('new_password1')}
                      editable={true}
                    />
                    <TouchableHighlight
                      onPress={() => setShowOne(showOne ? false : true)}
                      style={styles.showBtn}
                      activeOpacity={0.5}
                      underlayColor="white">
                      <Icon
                        name={showOne ? 'eye-outline' : 'eye-off-outline'}
                        size={RFValue(25)}
                      />
                    </TouchableHighlight>
                  </View>
                  <HelperText
                    style={{fontSize: RFValue(14)}}
                    type="error"
                    visible={error}>
                    {props.touched.new_password1 && props.errors.new_password1}
                  </HelperText>
                </View>
                <View style={styles.box}>
                  <View style={styles.boxInput}>
                    <TextInput
                      style={styles.textInput}
                      mode="outlined"
                      secureTextEntry={showTwo ? true : false}
                      onBlur={props.handleBlur('new_password2')}
                      value={props.values.new_password2}
                      label="Powtórz nowe hasło"
                      onChangeText={props.handleChange('new_password2')}
                      editable={true}
                    />
                    <TouchableHighlight
                      onPress={() => setShowTwo(showTwo ? false : true)}
                      style={styles.showBtn}
                      activeOpacity={0.5}
                      underlayColor="white">
                      <Icon
                        name={showTwo ? 'eye-outline' : 'eye-off-outline'}
                        size={RFValue(25)}
                      />
                    </TouchableHighlight>
                  </View>
                  <HelperText
                    style={{fontSize: RFValue(14)}}
                    type="error"
                    visible={error}>
                    {props.touched.new_password2 && props.errors.new_password2}
                  </HelperText>
                </View>

                <TouchableOpacity
                  style={styles.button}
                  onPress={props.handleSubmit}>
                  <Text style={styles.titleButton}>Wyslij</Text>
                </TouchableOpacity>
              </VStack>
            )}
          </Formik>
        </View>
        {/* <View>
            <Button title="Wyloguj" onPress={() => signOut()} />
          </View> */}
      </VStack>
    </>
  );
};

const styles = StyleSheet.create({
  row: {
    width: '100%',
    alignItems: 'center',
  },
  input: {
    fontSize: RFValue(15),
  },
  switchShowPassword: {
    padding: 5,
  },
  box: {
    width: '100%',
    height: RFValue(50),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: RFValue(10),
    // marginBottom: RFValue(40),
  },
  boxInput: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowButton: {
    width: '100%',
    alignItems: 'center',
    height: RFValue(60),
    marginTop: RFValue(5),
  },
  showBtn: {
    justifyContent: 'center',
    borderRadius: RFValue(10),
  },
  button: {
    width: '60%',
    alignItems: 'center',
    justifyContent: 'center',
    height: RFValue(50),
    marginTop: RFValue(15),
    backgroundColor: '#00cc00',
    borderRadius: RFValue(10),
  },
  titleButton: {
    fontSize: RFValue(15),
    color: 'white',
  },
  container: {
    flex: 1,
    marginTop: 10,
  },
  title: {
    marginLeft: RFValue(5),
    textAlign: 'center',
    letterSpacing: 1,
    fontSize: RFValue(18),
    marginBottom: RFValue(10),
  },

  textInput: {
    width: '90%',
    fontSize: RFValue(18),
  },

  containerRow: {
    marginLeft: RFValue(9),
    marginRight: RFValue(9),
  },
  inputView: {
    flexDirection: 'row',
    // width: '100%',
    marginVertical: RFValue(10),
    borderBottomWidth: 2,
    borderBottomColor: 'gray',
  },
});
