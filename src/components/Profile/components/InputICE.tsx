import React, {useContext, useEffect, useRef, useState} from 'react';
import {Modal} from 'react-native';
import {TextInput} from 'react-native-paper';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {SafeAreaView} from 'react-native-safe-area-context';

import {useProfile} from '../../../Contex/profileContex';

import {PatchGeneral} from '../../../shared/Requests/PatchGeneral';
import {PostGeneral} from '../../../shared/Requests/PostGeneral';

interface ProfileProps {
  profileData?: string;

  title: string;
  value: string;
  typeKeyboard: any;
  setValue(value: string): void;
}
interface ILastName {
  last_name: string;
}
interface IFirstName {
  first_name: string;
}
interface IAdress {
  address: string;
}
interface INumber {
  phone_number: string;
}

export default ({
  profileData,
  title,
  value,
  setValue,
  typeKeyboard,
}: ProfileProps) => {
  const {ice, handleGetICE} = useProfile();

  const [name, setName] = useState<
    ILastName | IFirstName | IAdress | INumber
  >();
  const [isRender, setIsRender] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [block, setBlock] = useState(false);

  const onPressItem = () => {
    setIsModalVisible(true);
  };

  const handleEditLastName = (last_name: string) => {
    const newLastName = {
      last_name: last_name,
    };
    setName(newLastName);
    setIsRender(!isRender);
  };
  const handleEditFirstName = (first_name: string) => {
    const newFirstName = {
      first_name: first_name,
    };
    setName(newFirstName);
    setIsRender(!isRender);
  };
  const handleEditAdress = (address: string) => {
    const newAddress = {
      address: address,
    };
    setName(newAddress);
    setIsRender(!isRender);
  };
  const handleEditNumber = (phone_number: string) => {
    const newPhoneNumber = {
      phone_number: phone_number,
    };
    setName(newPhoneNumber);
    setIsRender(!isRender);
  };
  const onPressSaveEdit = async (id?: number) => {
    if (title === 'Nazwisko') {
      if (id) {
        handleEditLastName(value); //save
        const result = await PatchGeneral.ice(id, {last_name: value});
        if (result.error) {
          console.log('błąd patchowania', result);
          return;
        }
        // console.log(result.data);
      } else {
        const result = await PostGeneral.ice({last_name: value});
        if (result.error) {
          console.log('błąd postowania');
          return;
        }
        // console.log(result.data);
      }
    }
    if (title === 'Imię') {
      if (id) {
        handleEditFirstName(value); //save
        const result = await PatchGeneral.ice(id, {first_name: value});
        if (result.error) {
          console.log('błąd patchowania', result);
          return;
        }
        // console.log(result.data);
      } else {
        const result = await PostGeneral.ice({first_name: value});
        if (result.error) {
          console.log('błąd postowania');
          return;
        }
        // console.log(result.data);
      }
    }
    if (title === 'Adres') {
      if (id) {
        handleEditAdress(value); //save
        const result = await PatchGeneral.ice(id, {address: value});
        if (result.error) {
          console.log('błąd patchowania', result);
          return;
        }
        // console.log(result.data);
      } else {
        const result = await PostGeneral.ice({adress: value});
        if (result.error) {
          console.log('błąd postowania');
          return;
        }
        // console.log(result.data);
      }
    }
    if (title === 'Numer telefonu') {
      if (id) {
        handleEditAdress(value); //save
        const result = await PatchGeneral.ice(id, {phone_number: value});
        if (result.error) {
          console.log('błąd patchowania', result);
          return;
        }
        // console.log(result.data);
      } else {
        const result = await PostGeneral.ice({phone_number: value});
        if (result.error) {
          console.log('błąd postowania');
          return;
        }
        // console.log(result.data);
      }
    }

    // console.log(value);

    setIsModalVisible(false); // close modal
    handleGetICE();
  };

  const DisableButton = value.length === 0 ? 'grey' : '#00cc00';

  return (
    <>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>{title}</Text>

        <View style={styles.box}>
          <TouchableOpacity style={styles.textContent} onPress={onPressItem}>
            <Text style={styles.titleBox}>{profileData} </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.item} onPress={onPressItem}>
            <Text style={styles.text}>Zmień</Text>
          </TouchableOpacity>
        </View>

        <Modal
          animationType="fade"
          visible={isModalVisible}
          onRequestClose={() => setIsModalVisible(false)}>
          <View style={styles.modalView}>
            {/* <Text style={styles.textTitle}>Zmień {title}</Text> */}
            <TextInput
              style={styles.textInput}
              keyboardType={typeKeyboard}
              mode="outlined"
              value={value}
              label={`Zmień ${title}`}
              onChangeText={setValue}
              editable={true}
              multiline={false}
              maxLength={50}
            />

            <TouchableOpacity
              disabled={value.length === 0 ? true : false}
              onPress={() => onPressSaveEdit(ice?.id)}
              style={[styles.touchableSave, {backgroundColor: DisableButton}]}>
              <Text style={styles.text}>Zapisz Edycje</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // borderWidth: 1,
    height: RFValue(90),
  },
  title: {
    marginLeft: RFValue(5),
    letterSpacing: RFValue(1),
    fontSize: RFValue(18),
    marginBottom: RFValue(5),
    // paddingLeft: RFValue(25),
  },
  text: {
    fontSize: RFValue(15),
    fontWeight: 'bold',
    color: 'white',
  },
  input: {
    marginLeft: RFValue(5),
    fontSize: RFValue(17),
    width: '60%',
    marginBottom: RFValue(15),
    padding: RFValue(5),
  },
  textInput: {
    width: '90%',
    // height: RFValue(70),
    fontSize: RFValue(17),
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
    borderWidth: RFValue(1),
    marginHorizontal: RFValue(5),
    backgroundColor: '#00cc00',
    justifyContent: 'center',
    borderColor: '#00cc00',
    padding: RFValue(10),
    // width: RFValue(125),
    width: '45%',
    borderRadius: RFValue(10),
  },
  box: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textContent: {
    width: '45%',
    alignItems: 'center',
    fontSize: RFValue(15),
    justifyContent: 'center',
    height: RFValue(45),
    borderWidth: RFValue(1),
    borderRadius: RFValue(5),
    borderColor: '#92d776',
  },
  textTitle: {
    fontSize: RFValue(15),
    fontWeight: 'bold',
    color: 'black',
  },
  titleBox: {
    fontSize: RFValue(15),
  },
});
