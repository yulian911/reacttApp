import React from 'react';
import {Dimensions, StatusBar, StyleSheet} from 'react-native';
import Pdf from 'react-native-pdf';

export default ({pdf}: {pdf: string}) => {
  const source = {
    uri: pdf,
    cache: true,
  };

  return (
    <Pdf
      page={1}
      source={source}
      onLoadComplete={(numberOfPages, filePath) => {
        console.log(`number of pages: ${numberOfPages}`);
      }}
      onPageChanged={(page, numberOfPages) => {
        console.log(`current page: ${page}`);
      }}
      onError={error => {
        console.log(error);
      }}
      onPressLink={uri => {
        console.log(`Link presse: ${uri}`);
      }}
      style={styles.pdf}
    />
  );
};

const styles = StyleSheet.create({
  pdf: {
    backgroundColor: 'white',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
