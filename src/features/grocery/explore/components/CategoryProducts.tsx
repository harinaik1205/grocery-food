import { FlatList, StyleSheet, Text, View } from 'react-native';
import React, { FC, useEffect } from 'react';

import ProductItem from './ProductItem';

import { GROCERY_COLOR_THEM } from '../../../../shared/utils/theme';
import { getProductsByCategoryId } from '../services/productServices';
import { FONTS } from '../../../../shared/utils/constants';

interface CategoryProductsProps {
  categoryId: string | undefined;
}

const CategoryProducts: FC<CategoryProductsProps> = ({ categoryId }) => {
  const [products, setProducts] = React.useState<any[]>([]);
  const [productsLoading, setProductsLoading] = React.useState<boolean>(false);

  useEffect(() => {
    fetchProducts();
  }, [categoryId]);

  const fetchProducts = async () => {
    try {
      setProductsLoading(true);
      const response = await getProductsByCategoryId(categoryId!);
      // console.log('===========');
      // console.log('prods reponse', response);
      // console.log('===========');
      setProducts(response.products);
    } catch (error) {
      console.log('error while fetching products', error);
    } finally {
      setProductsLoading(false);
    }
  };
  if (productsLoading) return;
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Top products in this category</Text>
      <FlatList
        data={products?.slice(0, 6)}
        renderItem={({ item, index }) => (
          <ProductItem
            index={index}
            item={item}
            style={{ backgroundColor: '#f3f4f7' }}
          />
        )}
        keyExtractor={item => item?._id}
        style={{ flex: 1 }}
        numColumns={2}
        scrollEnabled={false}
      />
    </View>
  );
};

export default CategoryProducts;

const styles = StyleSheet.create({
  flexRowGap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flexWrap: 'wrap',
  },
  container: {
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 5,
    backgroundColor: '#fff',
    margin: 10,
  },
  heading: {
    color: GROCERY_COLOR_THEM.ink,
    fontFamily: FONTS.bold,
    paddingBottom: 10,
    fontSize: 18,
  },
});
