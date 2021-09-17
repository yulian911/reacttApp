import React, {useEffect, useState} from 'react';
import {
  Button,
  NativeEventEmitter,
  NativeModules,
  PermissionsAndroid,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import BleManager from 'react-native-ble-manager';
import {RFValue} from 'react-native-responsive-fontsize';
import {PostGeneral} from '../../../../shared/Requests/PostGeneral';

interface IProps {
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  weightId: string;
}

export default (props: IProps) => {
  const BleManagerModule = NativeModules.BleManager;
  const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);
  const [info, setInfo] = useState<string>('Proszę stanąć na wadze.');
  const [weightResult, setWeightResult] = useState<number | null>(null);

  const [getWeightResult, setGetWeightResult] = useState<boolean>(true);

  // const mac = '5C:CA:D3:D5:7A:D7'
  // const mac = '5C:CA:D3:75:00:7E'
  const service = '0000181b-0000-1000-8000-00805f9b34fb';
  const characteristic = '00002a9c-0000-1000-8000-00805f9b34fb';

  const connectAndPrepare = async (
    peripheral: string,
    service: string,
    characteristic: string,
  ) => {
    try {
      // Connect to device
      await BleManager.connect(peripheral);
      // Before startNotification you need to call retrieveServices
      await BleManager.retrieveServices(peripheral);
      // To enable BleManagerDidUpdateValueForCharacteristic listener
      await BleManager.startNotification(peripheral, service, characteristic);
    } catch (err) {
      console.log('err', err);
    }
  };

  const handleGetWeightData = ({
    value,
    peripheral,
    characteristic,
    service,
  }: any) => {
    const convertDecimalToBinary = (value: number) => {
      if (!isNaN(value)) {
        let binary = (value >>> 0).toString(2);
        if (binary.length < 8) {
          return '00000000'.substr(binary.length) + binary;
        }
        return binary;
      }
      return 'Nie liczba';
    };

    setWeightResult(
      parseInt(
        convertDecimalToBinary(value[12]) + convertDecimalToBinary(value[11]),
        2,
      ) / 200,
    );

    const control =
      convertDecimalToBinary(value[0]) + convertDecimalToBinary(value[1]);

    if (control[10] === '1' && control[14] === '1' && control[8] === '0') {
      const data = {
        weight:
          parseInt(
            convertDecimalToBinary(value[12]) +
              convertDecimalToBinary(value[11]),
            2,
          ) / 200,
        impedance: parseInt(
          convertDecimalToBinary(value[10]) + convertDecimalToBinary(value[9]),
          2,
        ),
      };
      handleSendWeightData(data);
    }
  };

  const handleSendWeightData = async (data: {
    weight: number;
    impedance: number;
  }) => {
    const result = await PostGeneral.weightData(data);
    setWeightResult(null);
    if (result.error) {
      setInfo('Coś poszło nie tak.');
      console.log('coś poszło nie tak', result);
      return;
    }
    console.log(result);

    setInfo('Pomiar zakończony.\nMożna zejść z wagi.');
    setTimeout(() => {
      props.setModalVisible(false);
    }, 3000);
  };

  useEffect(() => {
    BleManager.start({showAlert: false});

    bleManagerEmitter.addListener(
      'BleManagerDidUpdateValueForCharacteristic',
      handleGetWeightData,
    );
    connectAndPrepare(props.weightId, service, characteristic);

    if (Platform.OS === 'android' && Platform.Version >= 23) {
      PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      ).then(result => {
        if (result) {
          console.log('Permission is OK');
        } else {
          PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          ).then(result => {
            if (result) {
              console.log('User accept');
            } else {
              console.log('User refuse');
            }
          });
        }
      });
    }

    return () => {
      console.log('unmount');
      bleManagerEmitter.removeAllListeners(
        'BleManagerDidUpdateValueForCharacteristic',
      );
    };
  }, []);

  return (
    <View style={styles.weight}>
      <View style={styles.info}></View>
      {weightResult ? (
        <Text style={styles.weightResult}>{weightResult} kg</Text>
      ) : (
        <Text style={styles.text}>{info}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  weight: {
    // marginTop: StatusBar.currentHeight,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
    height: '100%',
  },
  info: {
    width: '80%',
    // height: '80%',
  },
  text: {
    fontSize: RFValue(30),
    color: '#fff',
  },
  weightResult: {
    fontSize: RFValue(50),
    color: '#fff',
  },
});
