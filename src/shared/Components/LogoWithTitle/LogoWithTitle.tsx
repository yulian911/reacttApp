import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import Logo from 'cudapp/resources/icons/logoOnco.svg';
import {RFValue} from 'react-native-responsive-fontsize';

export interface ISlides {
  key: number;
  title: string;
  text?: string;
  titleText?: string;
}

const LogoWithTitle = ({
  item,
  titleTextAbove,
}: {
  item: ISlides;
  titleTextAbove?: boolean;
}) => {
  return (
    <>
      <Logo
        style={styles.image}
        width={RFValue(300)}
        height={RFValue(60)}
        fill="black"
      />
      {titleTextAbove ? (
        <>
          <Text style={styles.titleText}>{item.titleText}</Text>
          <Text style={styles.title}>{item.title}</Text>
        </>
      ) : (
        <>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.titleText}>{item.titleText}</Text>
        </>
      )}
    </>
  );
};

export default LogoWithTitle;

const styles = StyleSheet.create({
  image: {
    marginVertical: RFValue(25),
    alignSelf: 'center',
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
    fontSize: RFValue(20),
  },
  titleText: {
    textAlign: 'center',
    fontSize: RFValue(13),
  },
});
