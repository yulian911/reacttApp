import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityBase,
  View,
} from 'react-native';
import {styleElements} from '../../../Styles/styleElements';
import {ScreenContainer} from '../../Home/components/ScreenContainer';
import GlassIcon from '../../../../resources/icons/glass.svg';
import {styleVariables} from '../../../Styles/styleVariables';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/Entypo';
import {CommonActions} from '@react-navigation/native';
import {GetGeneral} from '../../../shared/Requests/GetGeneral';
import {IWaterAmount} from '../../../shared/Models/WaterAmount.models';
import {PatchGeneral} from '../../../shared/Requests/PatchGeneral';
import {PostGeneral} from '../../../shared/Requests/PostGeneral';
import {RFValue} from 'react-native-responsive-fontsize';

export default ({navigation, route}: any) => {
  const [waterAmount, setWaterAmount] = useState<IWaterAmount | null>(null);
  const params = route.params;

  const glasses = [
    {
      id: 1,
      ml: 250,
    },
    {
      id: 2,
      ml: 500,
    },
    {
      id: 3,
      ml: 750,
    },
    {
      id: 4,
      ml: 1000,
    },
    {
      id: 5,
      ml: 1250,
    },
    {
      id: 6,
      ml: 1500,
    },
  ];

  const handleGetWaterAmount = async (date: string) => {
    const result = await GetGeneral.waterAmountByDate(date);
    if (result.error) {
      if (result.response.status === 404) {
        console.log('Brak water amount');
        return;
      }
      console.log('Błąd w pobraniu water amount');
      return;
    }
    setWaterAmount(result.data);
    console.log('water amount', result.data);
  };

  useEffect(() => {
    params.date && handleGetWaterAmount(params.date);
  }, [params.date]);

  const handleSendWaterAmount = async (ml: number) => {
    if (waterAmount) {
      const result = await PatchGeneral.waterAmount(waterAmount.id, {
        amount_ml: ml,
      });
      if (result.error) {
        console.log('Błąd patchowania wody.');
        return;
      }
      console.log(result.data);
      setWaterAmount(result.data);
    } else {
      const result = await PostGeneral.waterAmount({
        date: params.date,
        amount_ml: ml,
      });
      if (result.error) {
        console.log('Błąd wysyłania wody.');
        return;
      }
      console.log(result.data);
      setWaterAmount(result.data);
    }
  };

  const showGlasses = (glasses: any, waterAmount: IWaterAmount | null) => {
    const half = Math.ceil(glasses.length / 2);

    let waLength = 0;
    if (waterAmount) {
      waLength = Math.floor(waterAmount.amount_ml / 250 + 1);
    }

    const plusIcon = (id: number) => {
      console.log('waLength', waLength);
      if (waLength === 0) {
        if (id === 1) {
          return false;
        }
      }
      if (waterAmount) {
        if (id === Math.floor(waterAmount.amount_ml / 250) + 1) {
          return false;
        }
      }
      return true;
    };

    const pattern = (el: any, index: number) => {
      if (waterAmount) {
        waLength--;
      }

      return waLength > 0 ? (
        <TouchableOpacity
          style={styles.glassOfWater}
          key={el.id}
          onPress={() => {
            waterAmount && handleSendWaterAmount(waterAmount.amount_ml - 250);
          }}>
          <Icon
            style={styles.checkmark}
            name="checkmark-circle-outline"
            size={45}
            color="lightblue"
          />
          <GlassIcon
            style={styles.glass}
            width="100"
            height="100"
            fill={styleVariables.colors.gray}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() => handleSendWaterAmount(el.ml)}
          style={styles.glassOfWater}
          disabled={plusIcon(el.id)}
          key={el.id}>
          {/* {plusIcon(el.id)} */}
          {!plusIcon(el.id) && (
            <Icon2
              style={styles.checkmark}
              name="plus"
              size={45}
              color={styleVariables.colors.gray}
            />
          )}
          <GlassIcon
            style={styles.glass}
            width="100"
            height="100"
            fill={styleVariables.colors.gray}
          />
        </TouchableOpacity>
      );
    };

    const firstHalf = glasses
      .slice(0, half)
      .map((el: any, index: number) => pattern(el, index));
    const secondHalf = glasses
      .slice(-half)
      .map((el: any, index: number) => pattern(el, index));

    return (
      <>
        <View style={styleElements.row}>{firstHalf}</View>
        <View style={styleElements.row}>{secondHalf}</View>
      </>
    );
  };

  return (
    <ScreenContainer>
      <View style={[styleElements.tile, styles.wa]}>
        <View style={styleElements.row}>
          <Text style={styles.text}>1 szklanka = 250 ml</Text>
        </View>
        {showGlasses(glasses, waterAmount)}
        {/* <View style={styleElements.row}>
          <Text style={styles.text}>
            Sprawdź barwę moczu, jeśli jest ciemna, wypij dodatkowe płyny.
          </Text>
        </View> */}
        {/* <View style={styleElements.row}>
          <View style={styleElements.row}>
            <View style={styles.colorTile}></View>
          </View>
        </View> */}
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  wa: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    // width: '100%',
  },
  waContent: {
    flexDirection: 'column',
    paddingHorizontal: 20,
  },
  glassOfWater: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
  },
  glass: {},
  checkmark: {
    position: 'absolute',
  },
  text: {
    fontWeight: '700',
    fontSize: RFValue(18),
    textAlign: 'center',
    margin: 20,
  },
  // water: {
  //   border-bottom: 50px solid red,
  //   border-left: 25px solid transparent,
  //   border-right: 25px solid transparent,
  //   height: 0,
  //   width: 100,
  // }
  colorTile: {
    height: 65,
    width: 40,
    backgroundColor: 'red',
    borderRadius: 10,
  },
});
