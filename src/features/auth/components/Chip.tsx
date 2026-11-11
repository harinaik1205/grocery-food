import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { COLORS } from '../../../shared/utils/constants';

interface ChipProps {
  label: string;
  icon?: React.ReactNode;
}

const Chip = ({ label, icon }: ChipProps) => {
  return (
    <View style={styles.container}>
      {icon && <View>{icon}</View>}
      <Text style={styles.label}>{label}</Text>
    </View>
  );
};

export default Chip;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: COLORS.white,
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  label: {
    fontSize: 13,
    fontFamily: 'PlusJakartaSans-Bold',
    color: COLORS.brandDark,
  },
});
