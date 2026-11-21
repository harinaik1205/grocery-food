import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import React, { FC } from 'react';
import { COLORS, FONTS } from '../../../../../shared/utils/constants';
import ScalePress from '../../../../../shared/components/ScalePress';

interface CategoryItemProps {
  category: {
    id: number;
    name: string;
    image: any;
  };
}

const CategoryItem: FC<CategoryItemProps> = ({ category }) => {
  return (
    <ScalePress style={styles.container}>
      <View style={styles.imgContainer}>
        <Image source={category.image} style={styles.img} />
      </View>
      <Text style={styles.categoryName}>{category.name}</Text>
    </ScalePress>
  );
};

export default CategoryItem;

const styles = StyleSheet.create({
  container: {
    width: '23%',
    alignItems: 'center',
  },
  imgContainer: {
    width: '100%',
    height: 100,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.border,
    borderRadius: 16,
  },
  img: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  categoryName: {
    fontSize: 14,
    fontFamily: FONTS.semiBold,
    color: COLORS.ink,
    textAlign: 'center',
  },
});
