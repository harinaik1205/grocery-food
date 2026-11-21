import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { FC } from 'react';
import { ProductItemType } from '../../../../../shared/types';
import { COLORS, FONTS } from '../../../../../shared/utils/constants';

interface ProductItemPropsType {
  product: ProductItemType;
}

const ProductItem: FC<ProductItemPropsType> = ({ product }) => {
  return (
    <View style={styles.container}>
      <View style={styles.imgContainer}>
        <Image
          source={{
            uri: product.image,
          }}
          style={styles.img}
        />
      </View>
      <View style={styles.content}>
        <View>
          <Text style={styles.productName} numberOfLines={3}>
            {product.name}
          </Text>
          <Text style={styles.quantity}>{product.quantity}</Text>
        </View>
        <View style={styles.priceRow}>
          <View>
            <Text style={styles.price}>₹{product.price}</Text>
            <Text style={styles.discount}>₹{product.discountPrice}</Text>
          </View>
          <TouchableOpacity style={styles.addBtn}>
            <Text style={styles.addBtnText}>ADD</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ProductItem;

const styles = StyleSheet.create({
  container: {
    width: '32%',
    // height: 260,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 16,
    backgroundColor: COLORS.white,
  },
  imgContainer: {
    width: '100%',
    height: 116,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f9f9f9',
  },
  img: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  content: {
    padding: 10,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderBottomRightRadius: 16,
    borderBottomLeftRadius: 16,
  },

  productName: {
    color: COLORS.ink,
    fontSize: 12,
    fontFamily: FONTS.bold,
  },
  quantity: {
    color: '#6B625C',
    fontSize: 12,
    fontFamily: FONTS.regular,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
  },
  price: {
    color: COLORS.ink,
    fontSize: 15,
    fontFamily: FONTS.extraBold,
  },
  discount: {
    color: '#6B625C',
    fontSize: 11,
    fontFamily: FONTS.regular,
    textDecorationLine: 'line-through',
  },

  addBtn: {
    width: 60,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#15803D',
    borderRadius: 10,
    backgroundColor: COLORS.white,
  },
  addBtnText: {
    color: '#15803D',
    fontSize: 13,
    fontFamily: FONTS.extraBold,
  },
});
