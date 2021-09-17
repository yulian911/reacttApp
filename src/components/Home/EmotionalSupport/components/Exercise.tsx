import {BlurView} from '@react-native-community/blur';
import React from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import {styleElements} from '../../../../Styles/styleElements';
import {styleModal} from '../../../../Styles/styleModal';
import Icon from 'react-native-vector-icons/EvilIcons';
import {StyleSheet} from 'react-native';
import {IEmotionalSupportDetails} from './emotionalSupportList';
import {RFValue} from 'react-native-responsive-fontsize';
import ProblemSolving from './ProblemSolving';

interface IProps {
  setOpenExercise: React.Dispatch<React.SetStateAction<boolean>>;
  eSList: IEmotionalSupportDetails;
}

export default (props: IProps) => {
  const showModalContent = () => {
    return (
      <>
        {props.eSList.img && (
          <View style={styles.imgContainer}>
            <Image style={styles.img} source={props.eSList.img} />
          </View>
        )}
        <Text style={styles.contentText}>{props.eSList.exercise}</Text>
      </>
    );
  };

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
          <Text style={styleModal.titleText}>Ćwiczenie</Text>
          <TouchableHighlight onPress={() => props.setOpenExercise(false)}>
            <Icon name="close" color="white" size={RFValue(30)} />
          </TouchableHighlight>
        </View>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styleModal.modalContent}>
          {props.eSList.key === 'problem_solving' ? (
            <ProblemSolving />
          ) : (
            showModalContent()
          )}
        </ScrollView>
        <View style={styleModal.bottomBorder}>
          <Text style={styles.specifyNewScale}>
            Po ćwiczeniu określ na nowo skalę.
          </Text>
        </View>
        <View style={styleModal.bottomButtons}>
          <TouchableOpacity onPress={() => props.setOpenExercise(false)}>
            <Text style={styleModal.bottomBtnsText}>Wypełnij skalę</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  specifyNewScale: {
    paddingHorizontal: 20,
    marginTop: 5,
    marginBottom: 10,
    fontSize: RFValue(14),
  },
  contentText: {
    marginVertical: 10,
    fontSize: RFValue(16),
    // textAlign: 'left',
  },
  imgContainer: {
    marginTop: 20,
    width: 300,
    height: 225,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    // flex: 1,
    width: '100%',
    height: '100%',
    marginHorizontal: 'auto',
  },
});
