import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { FONTS } from '../utils/constants';

import LucideIcon from '@react-native-vector-icons/lucide';
import { useColorTheme } from '../hooks/useColorTheme';

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
  const colors = useColorTheme();
  return (
    <View
      style={[styles.tabItemContainer, { backgroundColor: colors.brandDark }]}
    >
      <Pressable
        onPress={onPress}
        style={[
          styles.tabItem,
          isActive && styles.tabItemActive,
          {
            backgroundColor: isActive ? colors.brand : colors.white,
          },
        ]}
      >
        <LucideIcon
          name={iconName}
          size={22}
          color={isActive ? colors.white : colors.brand}
        />
        <Text
          style={[styles.label, { color: isActive ? '#ffff' : colors.brand }]}
        >
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
  },
  tabItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 44,

    borderRadius: 14,
    gap: 8,
  },
  tabItemActive: {
    borderRadius: 0,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    height: 52,
  },
  label: {
    fontSize: 17,
    fontFamily: FONTS.extraBold,
    // color: COLORS.brand,
  },
});
