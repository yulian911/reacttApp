import React from 'react'
import {ActivityIndicator, View} from 'react-native'

export default () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
      }}>
      <ActivityIndicator color={'green'} animating={true} size="large" />
    </View>
  )
}
