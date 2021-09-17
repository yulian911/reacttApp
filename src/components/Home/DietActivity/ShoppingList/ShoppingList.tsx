import React from 'react'
import {ScrollView, StyleSheet, Text, View} from 'react-native'
import {styleElements} from '../../../../Styles/styleElements'
import {ScreenContainer} from '../../components/ScreenContainer'

export default () => {
  return (
    <ScreenContainer>
      <View style={styles.sL}>
        <View style={[styleElements.tile, styles.sLContainer]}>
          <ScrollView style={styles.sLContent}>
            <Text>Lista zakupów</Text>
          </ScrollView>
        </View>
      </View>
    </ScreenContainer>
  )
}

const styles = StyleSheet.create({
  sL: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  sLContainer: {
    width: '95%',
    // marginVertical: 10,
    // padding: 20,
    height: '95%',
    paddingVertical: 20,
  },
  sLContent: {
    paddingHorizontal: 20,
  },
})
