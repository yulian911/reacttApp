import React, {useEffect, useState} from 'react';
import {
  Button,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {styleElements} from '../../../Styles/styleElements';
import {ScreenContainer} from '../components/ScreenContainer';
import Weight from './Weight/Weight';
import {GetGeneral} from '../../../shared/Requests/GetGeneral';
import {IWeightResults} from '../../../shared/Models/WeightResults.models';
import {RFValue} from 'react-native-responsive-fontsize';
import NotificationModal from '../../../shared/Components/NotificationModal/NotificationModal';
import {IUserDevices} from '../../../shared/Models/UserDevices.models';
import Band from './Band/Band';
import {MEASUREMENT_DEVICES} from '../../../shared/Variables/MeasurementDevices';
import DevicesIcon from '../../../shared/Components/Icons/DevicesIcon';
import {checkPermsAndBTStatus} from './functions/checkPermsAndBTStatus';
import {checkBTStatus} from './functions/checkBTStatus';

export default ({navigation}: any) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalWeightResults, setModalWeightResults] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [userDevices, setUserDevices] = useState<IUserDevices[]>([]);
  const [selectedDeviceName, setSelectedDeviceName] = useState<string>();
  const [selectedDeviceId, setSelectedDeviceId] = useState<string | null>(null);

  const [weightResults, setWeightResults] = useState<IWeightResults | null>(
    null,
  );

  // const handleGetWeightResults = async () => {
  //   const result = await GetGeneral.lastWeightResults();

  //   if (result.error) {
  //     console.log('Błąd pobrania ostatnich wyników');
  //     return;
  //   }

  //   setModalWeightResults(true);
  //   setWeightResults(result.data);
  // };

  const handleGetDevices = async () => {
    const result = await GetGeneral.userDevices();
    if (result.error) {
      return;
    }
    console.log(result.data);
    setUserDevices(result.data);
  };

  const handleSetDeviceId = async (el: IUserDevices) => {
    setSelectedDeviceName(el.device_name);
    setSelectedDeviceId(el.mac_address);
    setModalVisible(await checkBTStatus());
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      handleGetDevices();
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <ScreenContainer>
      {userDevices.length ? (
        userDevices.map(el => (
          <View style={styleElements.row} key={el.id}>
            <TouchableOpacity
              onPress={() => handleSetDeviceId(el)}
              style={[styles.tile, styleElements.tile]}>
              <DevicesIcon
                icon={el.device_name}
                size={RFValue(240 / userDevices.length)}
              />

              <Text style={styles.tileTitle}>{el.device_name}</Text>
            </TouchableOpacity>
          </View>
        ))
      ) : (
        <View style={styleElements.row}>
          <View style={[styles.tile, styleElements.tile]}>
            <Text style={styles.tileTitle}>Brak urządzeń</Text>
          </View>
        </View>
      )}
      {/* /////////////////// Ma zostać to ///////////////// */}
      {/* <View style={styleElements.row}>
        <TouchableOpacity
          onPress={handleGetWeightResults}
          style={[styles.tile, styleElements.tile]}>
          <Text style={{fontSize: RFValue(18)}}>
            Pokaż ostatnie wyniki z wagi
          </Text>
        </TouchableOpacity>
      </View> */}
      <View style={styles.addDevice}>
        <View style={styleElements.row}>
          <TouchableOpacity
            onPress={async () => {
              setOpenModal(await checkPermsAndBTStatus());
            }}
            style={[styles.tile, styleElements.tile]}>
            <Text style={{fontSize: RFValue(16)}}>Dodaj urządzenie</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Modal
        statusBarTranslucent
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        {selectedDeviceName === MEASUREMENT_DEVICES.weight &&
          selectedDeviceId && (
            <Weight
              setModalVisible={setModalVisible}
              weightId={selectedDeviceId}
            />
          )}
        {selectedDeviceName === MEASUREMENT_DEVICES.band && <Band />}
      </Modal>
      <Modal
        statusBarTranslucent
        animationType="fade"
        transparent={true}
        visible={openModal}
        onRequestClose={() => {
          setOpenModal(!openModal);
        }}>
        <NotificationModal
          setOpenModal={setOpenModal}
          info={{
            text: 'Zanim rozpoczniesz upewnij się, że urządzenie jest włączone.\n\nW przypadku wagi, stań na niej i przyciśnij OK.',
            title: 'OK',
          }}
          action={() => {
            setOpenModal(false);
            navigation.navigate('AddDevice', userDevices);
          }}
        />
      </Modal>
      {/* /////////////////// Ma zostać to ///////////////// */}
      {/* <Modal
        statusBarTranslucent
        animationType="fade"
        transparent={true}
        visible={modalWeightResults}
        onRequestClose={() => {
          setModalWeightResults(false)
        }}>
        <View style={styles.testModalContainer}>
          <View style={styles.testModal}>
            {weightResults && (
              <>
                <Text style={{fontSize: 30, fontWeight: 'bold'}}>
                  Wyniki z wagi (okno testowe)
                </Text>
                <Text style={styles.testModalText}>
                  {weightResults.lbm &&
                    `Masa beztłuszczowa: ${weightResults.lbm}`}
                </Text>
                <Text style={styles.testModalText}>
                  {weightResults.bmr &&
                    `Bazowe zuzycie energii: ${weightResults.bmr}`}
                </Text>
                <Text style={styles.testModalText}>
                  {weightResults.fat_percentage &&
                    `Tłuszcz %: ${weightResults.fat_percentage}`}
                </Text>
                <Text style={styles.testModalText}>
                  {weightResults.water_percentage &&
                    `Woda %: ${weightResults.water_percentage}`}
                </Text>
                <Text style={styles.testModalText}>
                  {weightResults.bone_mass &&
                    `Masa szkieletu: ${weightResults.bone_mass}`}
                </Text>
                <Text style={styles.testModalText}>
                  {weightResults.muscle_mass &&
                    `Masa mięśni: ${weightResults.muscle_mass}`}
                </Text>
                <Text style={styles.testModalText}>
                  {weightResults.visceral_fat &&
                    `Tłuszcz trzewny: ${weightResults.visceral_fat}`}
                </Text>
                <Text style={styles.testModalText}>
                  {weightResults.bmi && `BMI: ${weightResults.bmi}`}
                </Text>
                <Text style={styles.testModalText}>
                  {weightResults.protein_percentage &&
                    `Białko %: ${weightResults.protein_percentage}`}
                </Text>
                <Text style={styles.testModalText}>
                  {weightResults.weight && `Waga: ${weightResults.weight}`}
                </Text>
              </>
            )}
          </View>
        </View>
      </Modal> */}
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  tileTitle: {
    marginTop: 15,
    fontSize: RFValue(16),
    fontWeight: '700',
  },
  tile: {
    paddingVertical: 10,
    justifyContent: 'center',
    width: '100%',
    alignItems: 'center',
  },
  addDevice: {
    height: RFValue(50),
  },
  tileTwoIcons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  ///// TEST /////////
  testModalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
  testModal: {
    borderWidth: 2,
    padding: 10,
    backgroundColor: '#fff',
    width: '80%',
  },
  testModalText: {
    fontSize: 25,
  },
});
