import React, {useEffect, useState} from 'react';
import {
  Alert,
  Dimensions,
  NativeEventEmitter,
  NativeModules,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Button} from 'react-native-paper';
import {RFValue} from 'react-native-responsive-fontsize';
import BleManager from 'react-native-ble-manager';
import {styleElements} from '../../../../Styles/styleElements';
import {PostGeneral} from '../../../../shared/Requests/PostGeneral';
import {MEASUREMENT_DEVICES} from '../../../../shared/Variables/MeasurementDevices';
import {IUserDevices} from '../../../../shared/Models/UserDevices.models';
import {styleVariables} from '../../../../Styles/styleVariables';

export default ({navigation, route}: any) => {
  const pairedDevices: IUserDevices[] = route.params;
  const BleManagerModule = NativeModules.BleManager;
  const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

  const [startScanning, setStartScanning] = useState<boolean>(false);
  const [isScanning, setIsScanning] = useState(false);
  const [list, setList] = useState<any[]>([]);
  const [device, setDevice] = useState<any | null>(null);
  const peripherals = new Map();

  const startScan = async () => {
    if (!isScanning) {
      await BleManager.scan([], 10);
      console.log('Scanning...');
      setIsScanning(true);

      // .then(results => {
      //   console.log('Scanning...')
      //   setIsScanning(true)
      // })
      // .catch(err => {
      //   console.error(err)
      // })
    }
  };

  useEffect(() => {
    console.log('devices', pairedDevices);
  }, []);

  const handleStopScan = () => {
    console.log('Scan is stopped');
    setIsScanning(false);
  };

  const handleDiscoverPeripheral = (peripheral: any) => {
    // console.log('Got ble peripheral', peripheral);
    if (!peripheral.name) {
      // peripheral.name = 'Nieznane urządzenie'
      return;
    }
    peripherals.set(peripheral.id, peripheral);
    setList(Array.from(peripherals.values()));
  };

  // const handleDisconnectedPeripheral = (data: any) => {
  //   let peripheral = peripherals.get(data.peripheral);
  //   if (peripheral) {
  //     peripheral.connected = false;
  //     peripherals.set(peripheral.id, peripheral);
  //     setList(Array.from(peripherals.values()));
  //   }
  //   console.log('Disconnected from ' + data.peripheral);
  // };

  // const handleUpdateValueForCharacteristic = (data: any) => {
  //   console.log(
  //     'Received data from ' +
  //       data.peripheral +
  //       ' characteristic ' +
  //       data.characteristic,
  //     data.value,
  //   );
  // };

  // const handleCheckBTStatus = async () => {
  //   let perms: boolean = false;
  //   let btEnabled: boolean = false;

  //   if (Platform.OS === 'android' && Platform.Version >= 23) {
  //     const permCheck = await PermissionsAndroid.check(
  //       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  //     );
  //     if (permCheck) {
  //       perms = true;
  //     } else {
  //       const permRequest = await PermissionsAndroid.request(
  //         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  //       );
  //       if (permRequest) {
  //         perms = true;
  //       } else {
  //         perms = false;
  //       }
  //     }
  //   }

  //   if (perms) {
  //     console.log('perms', perms);
  //     try {
  //       await BleManager.enableBluetooth();
  //       btEnabled = true;
  //     } catch (err) {
  //       console.log('enableBt', err);
  //       btEnabled = false;
  //     }
  //   }

  //   if (perms && btEnabled) {
  //     console.log('perms', perms, 'btEnabled', btEnabled);
  //     return true;
  //   } else {
  //     return false;
  //   }
  // };

  const handleStartScanning = async () => {
    console.log('handleStartScanning');

    // if (await checkBTStatus()) {
    //   console.log('bluetooth start ');
    await BleManager.start({showAlert: false});
    setStartScanning(true);
    // } else {
    //   return;
    // }
  };

  useEffect(() => {
    handleStartScanning();
    return () => {
      handleStopScan();
    };
  }, []);

  useEffect(() => {
    startScanning && startScan();

    bleManagerEmitter.addListener(
      'BleManagerDiscoverPeripheral',
      handleDiscoverPeripheral,
    );
    bleManagerEmitter.addListener('BleManagerStopScan', handleStopScan);

    return () => {
      console.log('unmount');
      bleManagerEmitter.removeAllListeners('BleManagerDiscoverPeripheral');
      bleManagerEmitter.removeAllListeners('BleManagerStopScan');
    };
  }, [startScanning]);

  const deviceName = (deviceName: string) => {
    switch (deviceName) {
      case 'mibfs':
        return MEASUREMENT_DEVICES.weight;
      default:
        return 'Nieznane urządzenie';
    }
  };

  const handleSendMAChandleSendMAC = async (device: any) => {
    if (device.name.toLowerCase() !== 'mibfs') {
      Alert.alert('Powiadomienie', `Nieznane urządzenie ${device.name}.`, [
        {
          text: 'Wyjdź',
          onPress: () => {
            navigation.goBack();
          },
        },
        {
          text: 'Skanuj ponownie',
          onPress: () => {
            startScan();
          },
        },
      ]);
      return;
    }
    console.log('device', device.name);
    const data = {
      device_name: deviceName(device.name.toLowerCase()),
      mac_address: device.id,
    };
    const result = await PostGeneral.userDevice(data);
    if (result.error) {
      console.log('Błąd dodania urządzenia.');
      console.log('result', result);
    }
    Alert.alert('Powiadomienie', 'Dodano urządzenie pomyślnie.', [
      {text: 'OK', onPress: () => navigation.goBack()},
    ]);
  };

  const handleStopScanAndSetDevice = async (device: any) => {
    handleStopScan();
    await BleManager.stopScan();
    // Success code
    console.log('handleStopScanAndSetDevice');

    const addDevice = () =>
      Alert.alert('Powiadomienie', `Dodać urządzenie ${device.name}?`, [
        {text: 'Dodaj', onPress: () => handleSendMAChandleSendMAC(device)},
        {
          text: 'Anuluj',
          onPress: () => {
            startScan();
          },
        },
      ]);

    const deviceExist = () =>
      Alert.alert('Powiadomienie', `Urządzenie ${device.name} już istnieje.`, [
        {
          text: 'Wyjdź',
          onPress: () => {
            navigation.goBack();
          },
        },
        {
          text: 'Skanuj ponownie',
          onPress: () => {
            startScan();
          },
        },
      ]);

    if (pairedDevices.length) {
      pairedDevices.map(el => {
        if (device.id === el.mac_address) {
          console.log(device.id, el.mac_address);
          // console.log('Takie urządzenie jest', device.id);
          deviceExist();
          return;
        } else addDevice();
        return;
      });
    } else {
      addDevice();
    }
  };

  return (
    <>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.addDevice}>
        {list.map((el, index) => {
          return (
            <TouchableOpacity
              style={[styles.tile, styleElements.tile]}
              key={index}
              onPress={() => handleStopScanAndSetDevice(el)}>
              <Text style={styles.text}>{el.name}</Text>
            </TouchableOpacity>
          );
        })}
        <View style={{justifyContent: 'center', flex: 1, alignItems: 'center'}}>
          {/* {isScanning ? (
            <>
              <Text style={{fontSize: RFValue(16)}}>Skanowanie...</Text>
              <FullScreenLoading />
            </>
          ) : ( */}
          <Button
            color={styleVariables.colors.green}
            icon="refresh"
            mode="contained"
            loading={isScanning}
            onPress={startScan}>
            <Text style={{fontSize: RFValue(25)}}>
              {isScanning ? 'Skanowanie...' : 'Skanuj ponownie'}
            </Text>
          </Button>
          {/* )} */}
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  addDevice: {
    marginTop: 10,
    flex: 1,
  },
  tile: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'center',
    paddingHorizontal: 25,
    width: Dimensions.get('window').width - 20,
    marginBottom: 10,
    height: 80,
  },
  text: {
    fontSize: RFValue(16),
    width: '80%',
  },
});
