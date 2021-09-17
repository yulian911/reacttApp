import React from 'react'
import {StyleSheet, Text, View} from 'react-native'
import {RFValue} from 'react-native-responsive-fontsize'

export default () => {
  return (
    <View style={styles.band}>
      <View style={styles.info}></View>
      <Text style={styles.text}>Pobieranie danych z opaski...</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  band: {
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
  bandResult: {
    fontSize: RFValue(50),
    color: '#fff',
  },
})
