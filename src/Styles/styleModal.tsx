import {Dimensions, StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {styleVariables} from './styleVariables';

export const styleModal = StyleSheet.create({
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  contentText: {
    fontSize: RFValue(16),
    marginVertical: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: Dimensions.get('window').width - 40,
    height: '60%',
    alignItems: 'center',
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
    // backgroundColor: 'lightblue',
    backgroundColor: styleVariables.colors.blue,
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
    borderBottomColor: 'lightblue',
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
