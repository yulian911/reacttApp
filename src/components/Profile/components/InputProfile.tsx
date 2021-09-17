import React, {useContext, useEffect, useRef, useState} from 'react';
import {Modal} from 'react-native';
import {TextInput} from 'react-native-paper';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {SafeAreaView} from 'react-native-safe-area-context';

import {useProfile} from '../../../Contex/profileContex';

import {PatchGeneral} from '../../../shared/Requests/PatchGeneral';
import {BlurView} from '@react-native-community/blur';

interface ProfileProps {
  profileData: any;
  unit: string;
  title: string;
  value: string;
  typeKeyboard: any;
  setValue(value: any): void;
}
interface IHeight {
  height: string;
}
interface IWeight {
  body_weight: string;
}

export default ({
  profileData,
  unit,
  title,
  value,
  setValue,
  typeKeyboard,
}: ProfileProps) => {
  const {handleGetPatientProfile, ice, handleGetICE} = useProfile();

  const [name, setName] = useState<IHeight | IWeight>();
  const [isRender, setIsRender] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const onPressItem = () => {
    setIsModalVisible(true);
  };

  const handleEditHeight = (height: string) => {
    const newHeight = {
      height: height,
    };
    setName(newHeight);
    setIsRender(!isRender);
  };
  const handleEditWeight = (body_weight: string) => {
    const newWeight = {
      body_weight: body_weight,
    };
    setName(newWeight);
    setIsRender(!isRender);
  };

  const onPressSaveEdit = async () => {
    if (title === 'Wzrost') {
      handleEditHeight(value); //save
      const result = await PatchGeneral.profile({height: +value});
      if (result.error) {
        console.log('błąd patchowania', result);
        return;
      }
      console.log(result.data);
    }
    if (title === 'Masa ciała') {
      handleEditWeight(value); //save
      const result = await PatchGeneral.profile({body_weight: +value});
      if (result.error) {
        console.log('błąd patchowania', result);
        return;
      }
      console.log(result.data);
    }

    console.log(value);

    setIsModalVisible(false); // close modal
    handleGetPatientProfile();
  };

  // const NumberBox =
  //   title === 'Numer telefonu' ? styles.numberInput : styles.textContent;

  const Title =
    title === 'Wzrost' ? title + ' (centymetry)' : title + ' (kilogramy)';

  const DisableButton = value.length <= 1 ? 'grey' : '#00cc00';
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>

        <View style={styles.box}>
          <TouchableOpacity style={styles.textContent} onPress={onPressItem}>
            <Text style={styles.titleBox}>{profileData} </Text>
          </TouchableOpacity>
          {title === 'Numer telefonu' ? null : (
            <View style={styles.boxUnit}>
              <Text style={styles.textUnit}>{unit}</Text>
            </View>
          )}

          <TouchableOpacity style={styles.item} onPress={onPressItem}>
            <Text style={styles.text}>Zmień</Text>
          </TouchableOpacity>
        </View>

        <Modal
          animationType="fade"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={() => setIsModalVisible(false)}>
          <View style={styles.modalView}>
            <BlurView
              style={styles.absolute}
              blurType="light"
              blurAmount={32}
              reducedTransparencyFallbackColor="white"
            />
            <TextInput
              style={styles.textInput}
              keyboardType={typeKeyboard}
              mode="outlined"
              value={value}
              label={`Zmień ${Title}`}
              placeholder={unit}
              onChangeText={setValue}
              editable={true}
              multiline={false}
              maxLength={50}
            />
            <TouchableOpacity
              onPress={onPressSaveEdit}
              disabled={value.length <= 1 ? true : false}
              style={[styles.touchableSave, {backgroundColor: DisableButton}]}>
              <Text style={styles.text}>Zapisz edycje</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    </>
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
  container: {
    paddingTop: 20,
    flex: 1,
    // borderWidth: 1,
    // height: RFValue(90),
  },
  title: {
    marginLeft: RFValue(5),
    letterSpacing: 1,
    fontSize: RFValue(18),
    marginBottom: RFValue(5),
  },
  text: {
    fontSize: RFValue(15),
    fontWeight: 'bold',
    color: 'white',
  },
  input: {
    marginLeft: RFValue(5),
    fontSize: RFValue(17),
    width: '40%',
    marginBottom: 15,
    padding: RFValue(5),
  },
  textInput: {
    backgroundColor: 'white',
    width: '90%',
    height: RFValue(70),
    fontSize: RFValue(18),
  },
  modalView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  touchableSave: {
    // backgroundColor: '#00cc00',
    borderRadius: RFValue(13),
    paddingHorizontal: RFValue(100),
    alignItems: 'center',
    marginTop: RFValue(20),
    height: RFValue(60),
    justifyContent: 'center',
  },
  item: {
    height: RFValue(45),
    alignItems: 'center',
    borderWidth: 1,
    marginHorizontal: RFValue(5),
    backgroundColor: '#00cc00',
    justifyContent: 'center',
    borderColor: '#00cc00',
    padding: RFValue(10),
    width: '40%',
    borderRadius: RFValue(10),
  },
  box: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textContent: {
    width: '40%',
    alignItems: 'center',
    fontSize: RFValue(15),
    justifyContent: 'center',
    height: RFValue(45),
    borderWidth: RFValue(1),
    borderRadius: RFValue(15),
    borderColor: '#92d776',
  },
  boxUnit: {
    width: '20%',
    paddingLeft: RFValue(10),
    justifyContent: 'center',
    height: RFValue(50),
  },
  textUnit: {
    fontSize: RFValue(15),
    fontWeight: 'bold',
    color: 'black',
  },
  textTitle: {
    fontSize: RFValue(15),
    fontWeight: 'bold',
    color: 'black',
  },
  numberInput: {
    width: '45%',
    alignItems: 'center',
    fontSize: RFValue(15),
    justifyContent: 'center',
    // height: RFValue(45),
    borderWidth: RFValue(1),
    borderRadius: RFValue(15),
    borderColor: '#92d776',
  },
  titleBox: {
    fontSize: RFValue(15),
  },
});
