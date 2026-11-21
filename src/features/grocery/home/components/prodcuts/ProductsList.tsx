import { StyleSheet, Text, View } from 'react-native';
import React, { FC } from 'react';
import { ProductItemType } from '../../../../../shared/types';
import ProductItem from './ProductItem';

interface ProductsListPropsType {
  products: ProductItemType[];
}

const ProductsList: FC<ProductsListPropsType> = ({ products }) => {
  return (
    <View style={{ gap: 10 }}>
      <View style={styles.container}>
        {products.slice(0, 3).map(product => (
          <ProductItem key={product.id} product={product} />
        ))}
      </View>
      <View style={styles.container}>
        {products.slice(3, 6).map(product => (
          <ProductItem key={product.id} product={product} />
        ))}
      </View>
    </View>
  );
};

export default ProductsList;

const styles = StyleSheet.create({
  container: {
    // paddingTop: 16,
    flexDirection: 'row',
    // flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 10,
  },
});
