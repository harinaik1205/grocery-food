import { StyleSheet, Text, View } from 'react-native';
import React, { FC } from 'react';
import { COLORS, FONTS } from '../../../../../shared/utils/constants';
import CarouselItem from '../../../../../shared/components/carousel/CarouselItem';
import CategoryItem from './CategoryItem';

interface CategoriesListProps {
  categories: {
    id: number;
    name: string;
    image: any;
  }[];
  label?: string;
}

const CategoriesList: FC<CategoriesListProps> = ({ categories, label }) => {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}

      <View style={styles.flexRowGap}>
        {categories.slice(0, 4).map(category => (
          <CategoryItem key={category.id} category={category} />
        ))}
      </View>
      <View style={styles.flexRowGap}>
        {categories.slice(4).map(category => (
          <CategoryItem key={category.id} category={category} />
        ))}
      </View>
    </View>
  );
};

export default CategoriesList;

const styles = StyleSheet.create({
  container: {
    paddingTop: 16,
    gap: 10,
  },
  label: {
    fontSize: 18,
    fontFamily: FONTS.extraBold,
    color: COLORS.ink,
    // paddingBottom: 10,
  },
  flexRowGap: {
    flexDirection: 'row',
    gap: 10,
  },
});
