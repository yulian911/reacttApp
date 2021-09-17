import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Modal,
} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {useAuth} from '../../../Auth/Auth';
import {getDateFormat} from '../../../shared/Formatters/dateHourFormat';
import {IDietPdf} from '../../../shared/Models/DietPdf.models';
import {GetGeneral} from '../../../shared/Requests/GetGeneral';
import {styleElements} from '../../../Styles/styleElements';
import FullScreenLoading from '../../Navigation/components/FullScreenLoading';
import DietPdfPreview from './components/DietPdfPreview';

export default () => {
  const [pdfDietsList, setPdfDietsList] = useState<IDietPdf[] | null>(null);
  const [pdfDiet, setPdfDiet] = useState<string | null>(null);
  const [openPdfDiet, setOpenPdfDiet] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const handleGetPdfDietsList = async () => {
    const result = await GetGeneral.historyListDietPdf();
    setLoading(false);
    if (result.error) {
      return;
    }
    setPdfDietsList(result.data);
  };

  useEffect(() => {
    handleGetPdfDietsList();
    return () => {
      setPdfDietsList(null);
    };
  }, []);

  const pdfListToShow = (pdfDietsList: IDietPdf[]) => {
    const result = pdfDietsList.sort((a, b) => {
      const first = b;
      const second = a;

      const aDate = new Date(first.valid_from).getTime();
      const bDate = new Date(second.valid_from).getTime();
      if (aDate === bDate) {
        return (
          new Date(`${first.valid_from}`).getTime() -
          new Date(`${second.valid_from}`).getTime()
        );
      }
      return aDate - bDate;
    });
    return result;
  };

  const handleSetPdfOpenModal = (el: string) => {
    setPdfDiet(el), setOpenPdfDiet(true);
  };

  return pdfDietsList?.length ? (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={styles.dietDaysList}>
      {pdfListToShow(pdfDietsList).map((el, index) => (
        <TouchableOpacity
          style={[styles.tile, styleElements.tile]}
          key={index}
          onPress={() => handleSetPdfOpenModal(el.scan)}>
          <View style={styles.textRow}>
            <Text style={styles.text}>Data rozpoczęcia:</Text>
            <Text style={styles.text}>{getDateFormat(el.valid_from)}</Text>
          </View>
          <View style={styles.textRow}>
            <Text style={styles.text}>Data zakończenia:</Text>
            <Text style={styles.text}>{getDateFormat(el.valid_until)}</Text>
          </View>
        </TouchableOpacity>
      ))}
      <Modal
        statusBarTranslucent
        animationType="fade"
        transparent={true}
        visible={openPdfDiet}
        onRequestClose={() => {
          setOpenPdfDiet(!openPdfDiet);
        }}>
        {pdfDiet && <DietPdfPreview pdf={pdfDiet} />}
      </Modal>
    </ScrollView>
  ) : loading ? (
    <FullScreenLoading />
  ) : (
    <View style={styles.noDiet}>
      <Text style={styles.text}>Brak historii diet</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  dietDaysList: {
    marginTop: 10,
  },
  tile: {
    flexDirection: 'column',
    // alignItems: 'center',
    // justifyContent: 'space-between',
    alignSelf: 'center',
    paddingHorizontal: 15,
    width: Dimensions.get('window').width - 20,
    marginBottom: 10,
    // height: RFValue(50),
    // height: 50,
  },
  textRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
  },
  text: {
    fontSize: RFValue(16),
    // width: '80%',
  },
  noDiet: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
