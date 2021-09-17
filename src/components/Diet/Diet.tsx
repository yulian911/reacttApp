import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {useAuth} from '../../Auth/Auth';
import {getDateFormat} from '../../shared/Formatters/dateHourFormat';
import {sortByDate} from '../../shared/Formatters/sortByDate';
import {IDietPdf} from '../../shared/Models/DietPdf.models';
import {GetGeneral} from '../../shared/Requests/GetGeneral';
import {styleElements} from '../../Styles/styleElements';
import {ScreenContainer} from '../Home/components/ScreenContainer';
import FullScreenLoading from '../Navigation/components/FullScreenLoading';
import {tabScreenOptions} from '../Navigation/Functions/tabScreenOptions';
import DietPdfPreview from './DietsPdfList/components/DietPdfPreview';

interface IDateList {
  date: string;
  name: string;
}

export default ({navigation}: any) => {
  const [dietPdf, setDietPdf] = useState<IDietPdf | null>(null);
  const [dateList, setDateList] = useState<IDateList[]>([]);
  const [openPdfDiet, setOpenPdfDiet] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const handleGetDietPDF = async () => {
    const result = await GetGeneral.latestDietPdf();
    setLoading(false);
    if (result.error) {
      if (result.response.status === 404) {
        console.log('Brak diety');
        return;
      }
      console.log('Błąd pobrania diety');
      return;
    }
    setDietPdf(result.data);
  };

  useEffect(() => {
    handleGetDietPDF();
    return () => {
      setDietPdf(null);
    };
  }, []);

  useEffect(() => {
    if (dietPdf) {
      const validFrom = getDateFormat(dietPdf.valid_from);
      const validUntil = getDateFormat(dietPdf.valid_until);
      handleGenerateDaysList(dietPdf);
      navigation.setOptions(
        tabScreenOptions(
          navigation,
          `Dieta od ${validFrom} do ${validUntil}`,
          'Diet',
        ),
      );
    }
  }, [dietPdf]);

  const {actualDate} = useAuth();

  const handleGenerateDaysList = (dietPdf: IDietPdf) => {
    const oneDay = 1000 * 60 * 60 * 24;
    const validFrom = new Date(dietPdf.valid_from);
    // const validUntil = new Date(dietPdf.valid_until);

    const days = [
      'Niedziela',
      'Poniedziałek',
      'Wtorek',
      'Środa',
      'Czwartek',
      'Piątek',
      'Sobota',
    ];

    const changeDayName = (name: string, date: Date) => {
      const actualDate2 = +(actualDate.getTime() / oneDay)
        .toString()
        .split('.')[0];
      if (date.getTime() / oneDay === actualDate2) {
        return 'Dziś';
      }
      return name;
    };

    for (
      let i = validFrom.getTime() / oneDay;
      i <= actualDate.getTime() / oneDay;
      i++
    ) {
      let date = new Date(i * oneDay);
      let dateName = days[date.getDay()];
      const actualDateInDays = +(actualDate.getTime() / oneDay)
        .toString()
        .split('.')[0];

      if (date.getTime() / oneDay > actualDateInDays - 7) {
        setDateList(prev => [
          ...prev,
          {
            date: getDateFormat(date, '-', true),
            name: changeDayName(dateName, date),
          },
        ]);
      }
    }
  };

  return (
    <>
      {dietPdf ? (
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.dietDaysList}>
          {sortByDate(dateList, 'ascending').map((el, index) => (
            <TouchableOpacity
              style={[styleElements.tile, styles.tile]}
              key={index}
              onPress={() => navigation.push('DietDayView', {...el})}>
              <Text style={styles.text}>{el.name}</Text>
              <Text style={styles.text}>{getDateFormat(el.date)}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      ) : loading ? (
        <FullScreenLoading />
      ) : (
        <View style={styles.noDiet}>
          <Text style={styles.text}>Brak aktywnej diety</Text>
        </View>
      )}
      {dietPdf && (
        <View style={styles.dietPDFButtons}>
          <TouchableOpacity
            onPress={() => setOpenPdfDiet(true)}
            style={[styles.tile, styles.btnTile, styleElements.tile]}>
            <Text style={styles.btnTitle}>Otwórz aktywną dietę</Text>
          </TouchableOpacity>
        </View>
      )}
      <View style={styles.dietPDFButtons}>
        <TouchableOpacity
          onPress={() => navigation.push('DietsPdfList')}
          style={[
            styles.tile,
            styles.btnTile,
            styleElements.tile,
            {marginRight: 10},
          ]}>
          <Text style={styles.btnTitle}>Historia diet</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.push('DietsFuturePdfList')}
          style={[styles.tile, styles.btnTile, styleElements.tile]}>
          <Text style={styles.btnTitle}>Zaplanowane diety</Text>
        </TouchableOpacity>
      </View>
      <Modal
        statusBarTranslucent
        animationType="fade"
        transparent={true}
        visible={openPdfDiet}
        onRequestClose={() => {
          setOpenPdfDiet(!openPdfDiet);
        }}>
        {dietPdf && <DietPdfPreview pdf={dietPdf.scan} />}
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  dietDaysList: {
    marginTop: 10,
  },
  tile: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'center',
    paddingHorizontal: 10,
    width: Dimensions.get('window').width - 20,
    marginBottom: 10,
    height: 50,
  },
  btnTile: {
    // width: '49%',
    flex: 1,
    justifyContent: 'center',
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
  number: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    width: '20%',
    height: 40,
    borderRadius: 5,
    // height: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.9,
    shadowRadius: 6.27,

    elevation: 5,
  },
  dietPDFButtons: {
    // paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 10,
    // height: RFValue(50),
  },
  btnTitle: {
    fontSize: RFValue(16),
  },
});
