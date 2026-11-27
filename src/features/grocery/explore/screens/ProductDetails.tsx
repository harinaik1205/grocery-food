import {
  ActivityIndicator,
  Alert,
  Button,
  Dimensions,
  Image,
  Platform,
  Pressable,
  ScrollView,
  // Share,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { Suspense, useEffect, useState } from 'react';
// import { getProductDetails } from '@services/productServices';
// import { Colors, images } from '@utils/Constants';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import Feather from '@react-native-vector-icons/feather';

import UniversalAdd from '../components/UniversalAdd';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

import { GROCERY_COLOR_THEM } from '../../../../shared/utils/theme';
import { productsList } from '../../../../shared/utils/constants';
import { ProductItemType } from '../../../../shared/types';

// interface ProductType {
//   _id: string;
//   name: string;
//   image: string;
//   price: number;
//   discountPrice: number;
//   quantity: string;
//   category: {
//     _id: string;
//     name: string;
//     image: string;
//   };
// }

const ProductDetails = ({ route }: any) => {
  const productId = route?.params?.productId;
  // console.log({ productId });
  const insets = useSafeAreaInsets();
  const [product, setProduct] = useState<ProductItemType>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState('');

  useEffect(() => {
    fetchProductById();
  }, [productId]);

  const fetchProductById = () => {
    setLoading(true);

    try {
      const product = productsList.find(product => product?.id === productId);
      setProduct(product);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  /**
   * This function share an image passed using the
   * url param
   */

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size={'large'} color={GROCERY_COLOR_THEM.brand} />
      </View>
    );
  }
  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>{error}</Text>
      </View>
    );
  }
  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" />

      {/* content */}
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <View style={styles.imgContainer}>
          <Image source={{ uri: product?.image }} style={styles.img} />
          {/* header */}
          <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
            <View style={styles.iconContainer}>
              <Feather name="chevron-left" size={20} />
            </View>
            <View style={styles.headerRight}>
              <View style={styles.iconContainer}>
                <Feather name="heart" size={20} />
              </View>
              <TouchableOpacity
                //    onPress={onShare}
                style={styles.iconContainer}
              >
                <Feather name="share" size={20} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={{ padding: 10 }}>
          <View style={styles.content}>
            <Text style={styles.productName}>{product?.name}</Text>
            <Text style={styles.quantity}>{product?.quantity}</Text>
            <View style={styles.flexRowGap}>
              <Text style={styles.price}>₹{product?.price}</Text>
              <Text style={styles.discountPrice}>
                MRP{' '}
                <Text style={{ textDecorationLine: 'line-through' }}>
                  ₹{product?.discountPrice}
                </Text>
              </Text>
            </View>
            {/* <View style={styles.category}>
              <View style={styles.flexRowGap}>
                <View style={styles.categoryImgContainer}>
                  <Image
                    source={{ uri: product?.category?.image }}
                    style={styles.categoryImg}
                  />
                </View>
                <View>
                  <CustomText variant="h8" style={styles.categoryName}>
                    {product?.category?.name}
                  </CustomText>
                  <CustomText variant="h8" style={styles.explore}>
                    Explore all products
                  </CustomText>
                </View>
              </View>
              <Feather name="chevron-right" size={20} />
            </View> */}
          </View>
        </View>

        {/* Top products in this category */}
      </ScrollView>

      {/* action button */}
      <View
        style={[
          styles.actionBtnContainer,
          {
            paddingBottom: insets.bottom,
            paddingLeft: insets.left + 10,
            paddingRight: insets.right + 10,
          },
        ]}
      >
        <View>
          <Text style={[styles.quantity, { paddingBottom: 0 }]}>
            {product?.quantity}
          </Text>
          <View style={styles.flexRowGap}>
            <Text style={styles.price}>₹{product?.price}</Text>
            <Text style={styles.discountPrice}>
              MRP{' '}
              <Text style={{ textDecorationLine: 'line-through' }}>
                ₹{product?.discountPrice}
              </Text>
            </Text>
          </View>
          <Text style={styles.quantity}>Inclusive of all taxes</Text>
        </View>
        <UniversalAdd item={product} title="ADD TO CART" variant="primary" />
      </View>
    </View>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  addToCartBtn: {
    width: 150,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#490D83',
  },
  actionBtnText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  actionBtnContainer: {
    // height: 70,
    width: screenWidth,
    // borderTopWidth: 1,
    // borderTopColor: Colors.border,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    shadowOffset: { width: 0, height: 10 },
    shadowColor: GROCERY_COLOR_THEM.ink,
    elevation: 10,
  },
  explore: {
    color: GROCERY_COLOR_THEM.ink,
    opacity: 0.8,
  },
  categoryImgContainer: {
    width: 40,
    height: 40,
    borderRadius: 5,
    padding: 2,
    borderWidth: 1,
    borderColor: GROCERY_COLOR_THEM.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryImg: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  category: {
    borderTopWidth: 1,
    borderTopColor: GROCERY_COLOR_THEM.border,
    marginTop: 10,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryName: {
    color: GROCERY_COLOR_THEM.ink,
    fontWeight: '700',
  },
  about: {
    color: GROCERY_COLOR_THEM.ink,
    fontWeight: 'bold',
  },
  description: {
    // color: Colors.disabled,
    fontWeight: 'semibold',
  },
  content: {
    backgroundColor: '#fff',
    // borderWidth: 1,
    borderRadius: 10,
    borderColor: GROCERY_COLOR_THEM.border,
    padding: 10,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.6,
    shadowRadius: 2,
    shadowColor: GROCERY_COLOR_THEM.border,
    elevation: 10,
  },
  productName: {
    fontWeight: 'bold',
    paddingBottom: 5,
  },
  quantity: {
    fontWeight: 'semibold',
    paddingBottom: 10,
    opacity: 0.8,
  },
  price: {
    color: GROCERY_COLOR_THEM.ink,
    fontWeight: 'bold',
  },
  discountPrice: {
    // color: Colors.disabled,
    // textDecorationLine: 'line-through',
  },

  flexRowGap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  header: {
    // height: 70,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 99,
    // backgroundColor: '#fff',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  iconContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    borderColor: GROCERY_COLOR_THEM.border,
    backgroundColor: '#fff',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.6,
    shadowRadius: 2,
    shadowColor: GROCERY_COLOR_THEM.ink,
    elevation: 2,
  },
  imgContainer: {
    width: screenWidth,
    height: screenHeight * 0.6,
    // alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  img: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});
