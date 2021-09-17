import {BlurView} from '@react-native-community/blur';
import React, {useEffect} from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {styleElements} from '../../../Styles/styleElements';
import Icon from 'react-native-vector-icons/EvilIcons';
import {styleVariables} from '../../../Styles/styleVariables';

interface IInfo {
  text: string;
  title: string;
}

interface IProps {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  info: IInfo;
  action?: () => void;
}

export default (props: IProps) => {
  return (
    <View style={styles.centeredView}>
      <BlurView
        style={styles.absolute}
        blurType="light"
        blurAmount={32}
        reducedTransparencyFallbackColor="white"
      />
      <View style={[styleElements.tile, styles.modalView]}>
        <View style={styles.titleBar}>
          <Text style={styles.titleText}>Powiadomienie</Text>
          <TouchableHighlight onPress={() => props.setOpenModal(false)}>
            <Icon name="close" color="white" size={RFValue(30)} />
          </TouchableHighlight>
        </View>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.modalContent}>
          <Text style={styles.contentText}>{props.info.text}</Text>
        </ScrollView>
        <View style={styles.bottomBorder}></View>
        <View style={styles.bottomButtons}>
          <TouchableOpacity
            onPress={
              props.action ? props.action : () => props.setOpenModal(false)
            }>
            <Text style={styles.bottomBtnsText}>{props.info.title}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  contentText: {
    fontSize: RFValue(16),
    marginVertical: RFValue(10),
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: Dimensions.get('window').width - 40,
    height: '30%',
    // alignItems: 'center',
  },
  titleBar: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: styleVariables.colors.green,
  },
  titleText: {
    color: '#fff',
    fontSize: RFValue(16),
  },
  modalContent: {
    paddingHorizontal: 20,
  },
  bottomBorder: {
    width: '100%',
    borderBottomWidth: 2,
    borderBottomColor: styleVariables.colors.greenOpacity,
  },
  bottomButtons: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: '100%',
  },
  bottomBtnsText: {
    textTransform: 'uppercase',
    color: 'gray',
    fontSize: RFValue(16),
  },
});
