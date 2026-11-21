import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { FC } from 'react';
import { COLORS, FONTS } from '../utils/constants';

interface PrimaryButtonPropsType {
  label: string;
  bgColor?: string;
  onPress?: () => void;
}

const PrimaryButton: FC<PrimaryButtonPropsType> = ({
  label,
  bgColor = COLORS.brand,
}) => {
  return (
    <TouchableOpacity style={[styles.button, { backgroundColor: bgColor }]}>
      <Text style={styles.btnText}>{label}</Text>
    </TouchableOpacity>
  );
};

export default PrimaryButton;

const styles = StyleSheet.create({
  button: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
    borderRadius: 14,
  },
  btnText: {
    fontSize: 16,
    fontFamily: FONTS.bold,
    color: COLORS.white,
  },
});
