import React from 'react';
import {Linking, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {styleElements} from '../../../Styles/styleElements';
import {ScreenContainer} from '../components/ScreenContainer';

import NavIcon from '../../../shared/Components/Icons/NavIcon';
import {RFValue} from 'react-native-responsive-fontsize';

const KnowledgeBaseFaq = ({navigation}: any) => {
  return (
    <ScreenContainer>
      <View style={styleElements.row}>
        <TouchableOpacity
          onPress={() =>
            Linking.openURL('vnd.youtube://channel/UCE8XFvfEKIDDaeI7AJ2-DJg')
          }
          style={[styles.tile, styles.tileRectangular, styleElements.tile]}>
          <View style={styles.textContanier}>
            <NavIcon icon="youtube" size={RFValue(100)} />
            <Text style={styles.title}>Video</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styleElements.row}>
        <TouchableOpacity style={[styles.tile, styleElements.tile]}>
          <View style={styles.textContanier}>
            <NavIcon icon="articles" size={RFValue(90)} />
            <Text style={styles.title}>Artykuły</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tile, styleElements.tile]}
          onPress={() => navigation.push('Faq')}>
          <View style={styles.textContanier}>
            <NavIcon icon="faq" size={RFValue(90)} />
            <Text style={styles.title}>FAQ</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styleElements.row}>
        <TouchableOpacity
          style={[styles.tile, styles.tileRectangular, styleElements.tile]}
          disabled>
          <View style={styles.tileTwoIcons}>
            {/* <NavIcon icon="" size={RFValue(90)} /> */}
            {/* <NavIcon icon="" size={RFValue(90)} /> */}
          </View>
          <Text style={styles.tileTitle}>Wkrótce</Text>
        </TouchableOpacity>
      </View>
    </ScreenContainer>
  );
};

export default KnowledgeBaseFaq;

const styles = StyleSheet.create({
  tileTitle: {},
  tile: {
    paddingVertical: 10,
    width: '49%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    marginTop: 15,
    textAlign: 'center',
    fontWeight: '700',
    fontSize: RFValue(16),
  },
  tileRectangular: {
    width: '100%',
  },
  tileTwoIcons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  textContanier: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
