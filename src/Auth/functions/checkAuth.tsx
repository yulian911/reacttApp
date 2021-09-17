import AsyncStorage from '@react-native-async-storage/async-storage';

export const checkAuth = async (actualDate: Date) => {
  let result = false;
  try {
    const expirationDateSerialized = await AsyncStorage.getItem('@RefreshDate');
    if (expirationDateSerialized) {
      const expirationDate: number = JSON.parse(expirationDateSerialized);
      if (expirationDate < actualDate.getTime() / 1000) {
        // Alert.alert('Sesja wygasła. odświeżam token')
        result = true;
      } else {
        // Alert.alert('Sesja aktywna')
        result = false;
      }
    }
  } catch (error) {
    console.log('Błąd pobrania daty wygaśnięcia z AsyncStorage', error);
  } finally {
    return result;
  }
};
