import React from 'react'
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import {styleElements} from '../../Styles/styleElements'
import {ScreenContainer} from '../Home/components/ScreenContainer'

export default () => {
  return (
    <>
      <ScreenContainer>
        <View style={styles.header}>
          <TouchableOpacity
            style={[styles.tile, styles.tileRectangular, styleElements.tile]}>
            <Text style={styles.tileTitle}>
              Ogólny wskaźnik aktywności fizycznej
            </Text>
            <Icon name="progress-check" color="pink" size={40} />
          </TouchableOpacity>
        </View>
        <View style={styles.physicalActivity}>
          <View style={styleElements.row}>
            <TouchableOpacity style={[styles.tile, styleElements.tile]}>
              <Icon name="progress-check" color="pink" size={90} />
              <Text style={styles.tileTitle}>Chodzenie / Spacer</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.tile, styleElements.tile]}>
              <Icon name="progress-check" color="pink" size={90} />
              <Text style={styles.tileTitle}>Jazda na rowerze</Text>
            </TouchableOpacity>
          </View>
          <View style={styleElements.row}>
            <TouchableOpacity style={[styles.tile, styleElements.tile]}>
              <Icon name="progress-check" color="pink" size={90} />
              <Text style={styles.tileTitle}>Basen</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.tile, styleElements.tile]}>
              <Icon name="progress-check" color="pink" size={90} />
              <Text style={styles.tileTitle}>Joga</Text>
            </TouchableOpacity>
          </View>
          <View style={styleElements.row}>
            <TouchableOpacity style={[styles.tile, styleElements.tile]}>
              <Icon name="progress-check" color="pink" size={90} />
              <Text style={styles.tileTitle}>Rowerek stacjonarny</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.tile, styleElements.tile]}>
              <Icon name="progress-check" color="pink" size={90} />
              <Text style={styles.tileTitle}>Gimnastyka</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScreenContainer>
    </>
  )
}

const styles = StyleSheet.create({
  tileTitle: {},
  header: {
    maxHeight: 100,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  physicalActivity: {
    flex: 1,
    justifyContent: 'space-between',
  },
  tile: {
    paddingVertical: 10,
    width: '49%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tileRectangular: {
    width: '100%',
  },
})
