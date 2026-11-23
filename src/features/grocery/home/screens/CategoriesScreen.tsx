import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import CategoriesList from '../components/categories/CategoriesList';
import { categories, COLORS, FONTS } from '../../../../shared/utils/constants';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Lucide from '@react-native-vector-icons/lucide';

const CategoriesScreen = () => {
  const insets = useSafeAreaInsets();
  return (
    <View style={{ flex: 1 }}>
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <View style={styles.flexRowBetween}>
          <Text style={styles.headerTitle}>Categories</Text>
          <View style={styles.searchContainer}>
            <Lucide name="search" size={20} color={COLORS.ink} />
          </View>
        </View>
      </View>
      <ScrollView
        style={{
          flex: 1,
        }}
        contentContainerStyle={{
          paddingBottom: 100,
          paddingHorizontal: 16,
        }}
      >
        <CategoriesList categories={categories} />
      </ScrollView>
    </View>
  );
};

export default CategoriesScreen;

const styles = StyleSheet.create({
  header: {
    backgroundColor: COLORS.white,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowColor: COLORS.ink,
    elevation: 2,
  },
  flexRowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: FONTS.bold,
    color: COLORS.ink,
  },
  searchContainer: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: '#F9F9F9',
  },
});
