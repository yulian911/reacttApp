import {PermissionsAndroid, Platform} from 'react-native';
import BleManager from 'react-native-ble-manager';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';

export const checkPermsAndBTStatus = async () => {
  let perms: boolean = false;
  let btEnabled: boolean = false;

  if (Platform.OS === 'android' && Platform.Version >= 23) {
    const permCheck = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    if (permCheck) {
      perms = true;
    } else {
      const permRequest = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (permRequest) {
        perms = true;
      } else {
        perms = false;
      }
    }
  }

  if (perms) {
    try {
      await BleManager.enableBluetooth();
      const result =
        await RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
          interval: 10000,
          fastInterval: 5000,
        });
      console.log('RNAndroidLocationEnabler RESULT', result);
      // The user has accepted to enable the location services
      // data can be :
      //  - "already-enabled" if the location services has been already enabled
      //  - "enabled" if user has clicked on OK button in the popup
      btEnabled = true;
    } catch (err) {
      console.log('RNAndroidLocationEnabler ERROR', err);
      // The user has not accepted to enable the location services or something went wrong during the process
      // "err" : { "code" : "ERR00|ERR01|ERR02|ERR03", "message" : "message"}
      // codes :
      //  - ERR00 : The user has clicked on Cancel button in the popup
      //  - ERR01 : If the Settings change are unavailable
      //  - ERR02 : If the popup has failed to open
      //  - ERR03 : Internal error
      console.log('enableBt', err);
      btEnabled = false;
    }
  }

  if (perms && btEnabled) {
    return true;
  } else {
    return false;
  }
};
