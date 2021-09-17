import React, {useEffect, useState} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {GetGeneral} from '../../../../shared/Requests/GetGeneral';
import {styleElements} from '../../../../Styles/styleElements';
import {ProgressCircle} from '../ProgressCircle';

interface IProgressWater {
  amount_ml: number | null;
}
interface IProgressWeight {
  bmi: number;
}
interface IProgressEat {
  percent__avg: number | null;
}
interface IProgressStress {
  stress: number | null;
}

export default () => {
  const [data, setData] = useState<IProgressWeight>({bmi: 0});

  const [progressWater, setProgressWater] = useState<IProgressWater>({
    amount_ml: null,
  });
  const [progressStress, setProgressStress] = useState<IProgressStress>({
    stress: null,
  });
  const [progressEat, setProgressEat] = useState<IProgressEat>({
    percent__avg: 0,
  });
  const handleProgress = async () => {
    const result = await GetGeneral.lastWeightResults();
    console.log(result.data);
    if (result.error) {
      return;
    }

    setData(result.data);
  };
  const handleProgressWater = async () => {
    const res = await GetGeneral.lastWaterAmount();
    console.log(res.data);
    if (res.error) {
      return;
    }
    setProgressWater(res.data);
  };
  const handleProgressEat = async () => {
    const res = await GetGeneral.lastEatAmount();
    console.log(res.data);
    if (res.error) {
      return;
    }
    setProgressEat(res.data);
  };
  const handleProgressStress = async () => {
    const res = await GetGeneral.emotionalSupportList();
    console.log(res.data);
    if (res.error) {
      return;
    }
    setProgressStress(res.data);
  };

  useEffect(() => {
    handleProgress();
    handleProgressWater();
    handleProgressEat();
    handleProgressStress();
  }, []);

  const noResult = () => <Text style={styles.noResultTitle}>Brak wyniku</Text>;

  return (
    <View style={styles.progressDay}>
      <View style={styleElements.row}>
        <View style={[styles.tile, styleElements.tile]}>
          <View style={styles.progressCircle}>
            {progressStress.stress ? (
              <ProgressCircle
                data={progressStress.stress}
                capacity={Math.round(progressStress.stress * 10)}
              />
            ) : (
              noResult()
            )}
            <Text style={styles.chartTitle}>Poziom stresu</Text>
          </View>
        </View>
        <View style={[styles.tile, styleElements.tile]}>
          <View style={styles.progressCircle}>
            {progressEat.percent__avg ? (
              <ProgressCircle
                data={Math.round(progressEat.percent__avg * 1000) / 1000}
                capacity={Math.round(progressEat.percent__avg * 1000) / 1000}
                unit="%"
              />
            ) : (
              noResult()
            )}
            <Text style={styles.chartTitle}>Realizacja diety</Text>
          </View>
        </View>
      </View>
      <View style={styleElements.row}>
        <View style={[styles.tile, styleElements.tile]}>
          <View style={styles.progressCircle}>
            {progressWater.amount_ml ? (
              <ProgressCircle
                data={Math.round(progressWater.amount_ml * 100) / 100}
                capacity={
                  progressWater &&
                  Math.round(progressWater.amount_ml * 100) / 100
                }
                unit="%"
              />
            ) : (
              noResult()
            )}
            <Text style={styles.chartTitle}>Nawodnienie</Text>
          </View>
        </View>
        <View style={[styles.tile, styleElements.tile]}>
          <View style={styles.progressCircle}>
            <ProgressCircle
              data={Math.round(data.bmi * 1000) / 1000}
              capacity={Math.round(data.bmi * 1000) / 350}
              unit="kg/m²"
            />
            <Text style={styles.chartTitle}>BMI</Text>
          </View>
        </View>
      </View>
      {/* <View style={styleElements.row}>
          <View style={[styles.tile, styleElements.tile]}>
            <ProgressCircle data={'brak'} capacity={0} unit="bpm" />
            <Text style={styles.chartTitle}>Tętno</Text>
          </View>

          <View style={[styles.tile, styleElements.tile]}>
            <ProgressCircle data={'brak'} capacity={0} unit="kroki" />
            <Text style={styles.chartTitle}>Aktywność fizyczna</Text>
          </View>
        </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  tile: {
    paddingVertical: 10,
    width: '49%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  chartTitle: {
    fontSize: RFValue(13),
    textAlign: 'center',
  },
  noResultTitle: {
    fontSize: RFValue(13),
    textAlign: 'center',
    height: RFValue(110),
  },
  progressDay: {
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: 5,
    // alignItems: 'center',
    // width: Dimensions.get('window').width - 20,
    paddingHorizontal: 10,
  },
  progressCircle: {
    // height: '100%',
    height: '70%',
    // flex: 1,
    justifyContent: 'space-around',
  },
});
