import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import { GROCERY_COLOR_THEM } from '../../../../shared/utils/theme';
import Feather from '@react-native-vector-icons/feather';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { categories, FONTS } from '../../../../shared/utils/constants';
import SideBar from '../components/SideBar';

const ProductCategories = () => {
  return (
    <View style={{ flex: 1 }}>
      <Header />
      <View style={styles.content}>
        <SideBar />
        <View style={{ flex: 1 }}></View>
      </View>
    </View>
  );
};

export default ProductCategories;

const Header = () => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.header, { paddingTop: insets.top }]}>
      <View style={styles.flexRowBetweeen}>
        <Pressable style={styles.iconContainer}>
          <Feather
            name="arrow-left"
            size={20}
            color={GROCERY_COLOR_THEM.white}
          />
        </Pressable>
        <View style={[styles.flexRowBetweeen, { gap: 10 }]}>
          <Pressable style={styles.iconContainer}>
            <Feather name="search" size={20} color={GROCERY_COLOR_THEM.white} />
          </Pressable>
          <Pressable style={styles.iconContainer}>
            <Feather name="share" size={20} color={GROCERY_COLOR_THEM.white} />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  categoryContianer: {
    alignItems: 'center',
    padding: 10,
  },
  categoryImgContainer: {
    height: 80,
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,
    backgroundColor: '#F6F1EC',
  },
  categoryImg: {
    width: 60,
    height: 60,
    // resizeMode: 'contain',
  },
  categoryName: {
    fontSize: 12,
    fontFamily: FONTS.regular,
    color: GROCERY_COLOR_THEM.ink,
    textAlign: 'center',
  },
  aside: {
    width: '30%',
    backgroundColor: 'white',
    shadowOffset: {
      width: 1,
      height: 0,
    },
    shadowColor: GROCERY_COLOR_THEM.ink,
    elevation: 2,
    paddingBottom: 50,
  },
  content: {
    flexDirection: 'row',
  },
  header: {
    backgroundColor: GROCERY_COLOR_THEM.brandDark,
    paddingBottom: 10,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: GROCERY_COLOR_THEM.border,
  },
  flexRowBetweeen: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconContainer: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
    // borderWidth: 1,
    // borderColor: GROCERY_COLOR_THEM.border,
  },
});
