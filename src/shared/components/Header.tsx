import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { COLORS, FONTS } from '../utils/constants';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import VerticalTabs from './VerticalTabs';

import Lucide from '@react-native-vector-icons/lucide';

const Header = () => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.header, { paddingTop: insets.top }]}>
      <VerticalTabs />
      <View style={styles.headerBody}>
        <View style={[styles.flexRow, styles.deliveryRow]}>
          <View>
            <Text style={styles.deliveryInText}>Delivery in</Text>
            <Text style={styles.deliveryMinsText}>12 min</Text>
            <View style={styles.flexRow}>
              <Text style={styles.location}>Home Madhapur, Hyderabd</Text>
            </View>
          </View>
          <View style={[styles.flexRow, { gap: 16 }]}>
            <Pressable style={styles.walletContainer}>
              <Lucide name="wallet" size={20} color={COLORS.brand} />
              <Text style={styles.walletBalance}>₹0</Text>
            </Pressable>
            <Pressable style={styles.profileIcon}>
              <Lucide name="user-round" size={22} color={COLORS.brand} />
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#A82A12',
  },
  headerBody: {
    paddingBottom: 10,
    backgroundColor: COLORS.brand,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deliveryRow: {
    padding: 16,
    justifyContent: 'space-between',
  },
  deliveryInText: {
    fontSize: 13,
    fontFamily: FONTS.semiBold,
    color: COLORS.white,
  },
  deliveryMinsText: {
    fontSize: 30,
    fontFamily: FONTS.extraBold,
    color: COLORS.white,
  },
  location: {
    color: COLORS.white,
    fontSize: 13,
    fontFamily: FONTS.semiBold,
  },
  profileIcon: {
    width: 44,
    height: 44,
    backgroundColor: COLORS.white,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  walletContainer: {
    width: 70,
    height: 44,
    backgroundColor: COLORS.white,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  walletBalance: {
    fontSize: 14,
    fontFamily: FONTS.extraBold,
    color: COLORS.ink,
  },
});
