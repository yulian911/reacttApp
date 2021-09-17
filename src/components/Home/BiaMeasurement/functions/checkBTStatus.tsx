import BleManager from 'react-native-ble-manager';

export const checkBTStatus = async () => {
  let status = false;
  await BleManager.enableBluetooth()
    .then(() => {
      // Success code
      console.log('The bluetooth is already enabled or the user confirm');
      status = true;
    })
    .catch(error => {
      // Failure code
      console.log('The user refuse to enable bluetooth');
      status = false;
    });
  return status;
};
