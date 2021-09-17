import React from 'react'
import {ScrollView, StyleSheet, Text, View} from 'react-native'
import {styleElements} from '../../../../Styles/styleElements'
import {ScreenContainer} from '../../components/ScreenContainer'

export default () => {
  return (
    <ScreenContainer>
      <View style={styles.nr}>
        <View style={[styleElements.tile, styles.nrContainer]}>
          <ScrollView style={styles.nrContent}>
            <Text>Zalecenia żywieniowe</Text>
          </ScrollView>
        </View>
      </View>
    </ScreenContainer>
  )
}

const styles = StyleSheet.create({
  nr: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  nrContainer: {
    width: '95%',
    // marginVertical: 10,
    // padding: 20,
    height: '95%',
    paddingVertical: 20,
  },
  nrContent: {
    paddingHorizontal: 20,
  },
})
