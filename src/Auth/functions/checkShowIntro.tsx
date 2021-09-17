import AsyncStorage from '@react-native-async-storage/async-storage'

export const checkShowIntro = async () => {
  let result = false
  try {
    const showIntro = await AsyncStorage.getItem('@ShowIntro')
    if (!showIntro) {
      console.log('brak showIntro')
      result = true
    } else {
      console.log('showIntro', showIntro)
      result = false
    }
  } catch (error) {
    console.log('Błąd pobrania showIntro z AsyncStorage', error)
  } finally {
    return result
  }
}
