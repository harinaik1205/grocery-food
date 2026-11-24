import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { COLORS, FONTS } from '../../utils/constants';
import PrimaryButton from '../PrimaryButton';

const NoInternet = () => {
  return (
    <View style={styles.container}>
      <View style={styles.imgContainer}>
        <Image
          source={require('../../../assets/images/no-internet.png')}
          style={styles.img}
          alt="No Internet Image"
        />
      </View>
      <Text style={styles.text}>No internet connection</Text>
      <Text style={styles.description}>
        Please check your Wi-Fi or mobile data and try again.
      </Text>
      <PrimaryButton label="Try again" bgColor={COLORS.brand} />
    </View>
  );
};

export default NoInternet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF8F1',
    padding: 20,
  },
  imgContainer: {
    width: 220,
    height: 220,
  },
  img: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
  },
  text: {
    fontSize: 24,
    fontFamily: FONTS.extraBold,
    color: COLORS.ink,
  },
  description: {
    fontSize: 14,
    fontFamily: FONTS.regular,
    color: COLORS.muted,
    paddingBottom: 50,
  },
});
