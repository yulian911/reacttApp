import {Alert, Linking} from 'react-native';
import VersionCheck from 'react-native-version-check';

export const appUpdate = async () => {
  // VersionCheck.getPlayStoreUrl().then(latestVersion => {
  //   console.log(latestVersion); // 0.1.2
  // });
  // VersionCheck.getCountry().then(country => console.log(country)); // KR
  // console.log(VersionCheck.getPackageName()); // com.reactnative.app
  // console.log(VersionCheck.getCurrentBuildNumber()); // 10
  // console.log(VersionCheck.getCurrentVersion()); // 0.1.1
  try {
    const result = await VersionCheck.needUpdate({
      forceUpdate: true,
      provider: 'playStore',
    });
    if (result.isNeeded) {
      Alert.alert(
        'Dostępna aktualizacja',
        `Do prawidłowego działania aplikacji zalecana jest najnowsza wersja.\n\nAktualna wersja ${result.currentVersion}\nNowa wersja ${result.latestVersion}\n\nPrzejść do sklepu w celu aktualizacji?`,
        [
          {text: 'Anuluj', onPress: undefined},
          {text: 'Przejdź', onPress: () => Linking.openURL(result.storeUrl)},
        ],
      );
    }
  } catch (err) {
    // console.log('appUpdate Error', err);
    return;
  }
};
