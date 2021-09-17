import {BlurView} from '@react-native-community/blur';
import React from 'react';
import {Dimensions, ScrollView, TouchableHighlight} from 'react-native';
import {Text, TouchableOpacity, View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {styleElements} from '../../../../../Styles/styleElements';
import {styleModal} from '../../../../../Styles/styleModal';
import Icon from 'react-native-vector-icons/EvilIcons';

interface IProps {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  answer: string;
}

export default (props: IProps) => {
  return (
    <View style={styleModal.centeredView}>
      <BlurView
        style={styleModal.absolute}
        blurType="light"
        blurAmount={32}
        reducedTransparencyFallbackColor="white"
      />
      <View style={[styleElements.tile, styleModal.modalView]}>
        <View style={styleModal.titleBar}>
          <Text style={styleModal.titleText}>Odpowiedź</Text>
          <TouchableHighlight onPress={() => props.setOpenModal(false)}>
            <Icon name="close" color="white" size={RFValue(30)} />
          </TouchableHighlight>
        </View>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styleModal.modalContent}>
          <Text style={styleModal.contentText}>{props.answer}</Text>
        </ScrollView>
        <View style={styleModal.bottomBorder}></View>
        <View style={styleModal.bottomButtons}>
          <TouchableOpacity onPress={() => props.setOpenModal(false)}>
            <Text style={styleModal.bottomBtnsText}>Ok</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity onPress={() => props.setOpenModal(false)}>
            <Text style={styleModal.bottomBtnsText}>Wstecz</Text>
          </TouchableOpacity> */}
        </View>
      </View>
    </View>
  );
};
