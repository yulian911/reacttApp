import React from 'react';
import {Dimensions, ScrollView, StyleSheet, Text, View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {styleElements} from '../../../../Styles/styleElements';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';
import {styleVariables} from '../../../../Styles/styleVariables';

export default () => {
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43, 22],
        color: () => styleVariables.colors.green, // optional
        strokeWidth: 5, // optional
      },
    ],
    legend: ['Woda'], // optional
  };

  const chartConfig = {
    backgroundGradientFromOpacity: 0,
    backgroundGradientToOpacity: 0,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    // strokeWidth: 2, // optional, default 3
    // barPercentage: 0.5,
    // useShadowColorFromDataset: false, // optional
  };

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={styles.progressWeek}>
      {/* <View style={[styles.tile, styleElements.tile]}> */}
      <LineChart
        data={data}
        width={Dimensions.get('window').width - 20}
        height={200}
        chartConfig={chartConfig}
        style={test}
      />
      <LineChart
        data={data}
        width={Dimensions.get('window').width - 20}
        height={200}
        chartConfig={chartConfig}
        style={test}
      />
      <LineChart
        data={data}
        width={Dimensions.get('window').width - 20}
        height={200}
        chartConfig={chartConfig}
        style={test}
      />
      <LineChart
        data={data}
        width={Dimensions.get('window').width - 20}
        height={200}
        chartConfig={chartConfig}
        style={test}
      />
      {/* </View> */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  progressWeek: {
    // marginTop: 10,
  },
  tile: {
    // backgroundColor: 'white',
    // flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'space-between',
    alignSelf: 'center',
    paddingVertical: 15,
    // width: Dimensions.get('window').width - 20,
    marginBottom: 10,
    // borderRadius: 10,
    // // height: 80,
  },
  text: {
    fontSize: RFValue(16),
    width: '80%',
  },
  test2: {
    // paddingVertical: 15,
    // backgroundColor: 'white',
    // borderRadius: 10,
  },
});

const test = StyleSheet.flatten([styleElements.tile, styles.tile]);
