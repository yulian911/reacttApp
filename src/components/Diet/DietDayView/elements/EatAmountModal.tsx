import {BlurView} from '@react-native-community/blur';
import React from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import {RadioButton, TouchableRipple} from 'react-native-paper';
import {RFValue} from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/EvilIcons';
import {IEatAmount} from '../../../../shared/Models/EatAmount.models';
import {PatchGeneral} from '../../../../shared/Requests/PatchGeneral';
import {PostGeneral} from '../../../../shared/Requests/PostGeneral';
import {styleElements} from '../../../../Styles/styleElements';
import {styleVariables} from '../../../../Styles/styleVariables';

interface IInfo {
  text: string;
  title: string;
  date: string;
  mealType?: string;
  clickedMeal?: IEatAmount;
}

interface IProps {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  setReloadList: React.Dispatch<React.SetStateAction<boolean>>;
  info: IInfo;
  action?: () => void;
}

export default (props: IProps) => {
  const [checked, setChecked] = React.useState<string>('');

  const options = [
    {
      id: 1,
      title: '0',
      value: '0',
    },
    {
      id: 2,
      title: '1/4',
      value: '25',
    },
    {
      id: 3,
      title: '2/4',
      value: '50',
    },
    {
      id: 4,
      title: '3/4',
      value: '75',
    },
    {
      id: 5,
      title: '1',
      value: '100',
    },
  ];

  const handleSendEatAmount = async () => {
    if (props.info.clickedMeal) {
      const result = await PatchGeneral.eatAmount(props.info.clickedMeal.id, {
        percent: +checked,
      });
      if (result.error) {
        console.log('Błąd patchowania posiłku', result);
        return;
      }
    } else {
      const data = {
        date: props.info.date,
        percent: +checked,
        type: props.info.mealType,
      };
      const result = await PostGeneral.eatAmount(data);
      if (result.error) {
        console.log('Błąd wysyłania posiłku', result);
        return;
      }
    }
    props.setReloadList(false);
    props.setOpenModal(false);
  };

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
          <TouchableRipple onPress={() => props.setOpenModal(false)}>
            <Icon name="close" color="white" size={RFValue(30)} />
          </TouchableRipple>
        </View>
        <View style={styles.modalContent}>
          <Text style={styles.contentText}>{props.info.text}</Text>
          {options.map(el => {
            return (
              <TouchableRipple
                key={el.id}
                style={styles.radioRow}
                onPress={() => setChecked(el.value)}>
                <>
                  <RadioButton
                    color={styleVariables.colors.green}
                    value={el.value}
                    status={checked === el.value ? 'checked' : 'unchecked'}
                    onPress={() => setChecked(el.value)}
                  />
                  <Text style={{fontSize: RFValue(16), marginVertical: 5}}>
                    {el.title}
                  </Text>
                </>
              </TouchableRipple>
            );
          })}
        </View>
        <View style={styles.bottomBorder}></View>
        <View style={styles.bottomButtons}>
          <TouchableOpacity onPress={handleSendEatAmount}>
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
    // height: '30%',
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
    paddingVertical: 10,
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
  radioRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
