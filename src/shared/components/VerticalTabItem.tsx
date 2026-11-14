import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { COLORS, FONTS } from '../utils/constants';

import LucideIcon from '@react-native-vector-icons/lucide';

interface VerticalItemProps {
  label: string;
  iconName: React.ComponentProps<typeof LucideIcon>['name'];
  onPress: () => void;
  isActive: boolean;
}

const VerticalTabItem: React.FC<VerticalItemProps> = ({
  label,
  iconName,
  onPress,
  isActive,
}) => {
  return (
    <View style={styles.tabItemContainer}>
      <Pressable
        onPress={onPress}
        style={[styles.tabItem, isActive && styles.tabItemActive]}
      >
        <LucideIcon
          name={iconName}
          size={22}
          color={isActive ? COLORS.white : COLORS.brand}
        />
        <Text style={[styles.label, isActive && { color: '#ffff' }]}>
          {label}
        </Text>
      </Pressable>
    </View>
  );
};

export default VerticalTabItem;

const styles = StyleSheet.create({
  tabItemContainer: {
    flex: 1,
    height: 52,
    backgroundColor: '#A82A12',
  },
  tabItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 44,
    backgroundColor: COLORS.white,
    borderRadius: 14,
    gap: 8,
  },
  tabItemActive: {
    backgroundColor: COLORS.brand,
    borderRadius: 0,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    height: 52,
  },
  label: {
    fontSize: 17,
    fontFamily: FONTS.extraBold,
    color: COLORS.brand,
  },
});
