import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { FC } from 'react';
import { useNavigation } from '@react-navigation/native';
import UniversalAdd from './UniversalAdd';
import { GROCERY_COLOR_THEM } from '../../../../shared/utils/theme';
import { COLORS, FONTS } from '../../../../shared/utils/constants';

export const screenHeight: number = Dimensions.get('window').height;

interface ProductItemsProps {
  item: any;
  index: number;
  style?: any;
}

const ProductItem: FC<ProductItemsProps> = ({ item, index, style }) => {
  const isSecondColumn = index % 2 != 0;
  const navigation = useNavigation<any>();

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('ProductDetails', {
          productId: item?._id || item?.id,
        })
      }
      style={[styles.container, { marginRight: isSecondColumn ? 10 : 0 }]}
    >
      <View style={[styles.imageContainer, { ...style }]}>
        <Image source={{ uri: item?.image }} style={styles.image} />
      </View>

      <View style={styles.content}>
        <View style={styles.flexRow}>
          <Image
            source={require('../../../../assets/icons/clock.png')}
            style={styles.clockIcon}
          />
          <Text
            style={{
              fontSize: 10,
              fontFamily: FONTS.medium,
            }}
          >
            16 MINS
          </Text>
        </View>
        <Text
          numberOfLines={2}
          style={{ marginVertical: 4, fontSize: 13, fontFamily: FONTS.medium }}
        >
          {item?.name}
        </Text>

        <View style={styles.priceContainer}>
          <View>
            <Text
              style={{
                fontSize: 13,
                fontFamily: FONTS.medium,
              }}
            >
              ₹{item?.price}
            </Text>
            <Text
              style={{
                fontSize: 13,
                fontFamily: FONTS.medium,
                color: COLORS.muted,
                textDecorationLine: 'line-through',
              }}
            >
              ₹{item?.discountPrice}
            </Text>
          </View>
          <UniversalAdd item={item} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProductItem;

const styles = StyleSheet.create({
  container: {
    width: '45%',
    borderRadius: 10,
    backgroundColor: '#fff',
    marginBottom: 10,
    marginLeft: 10,
    overflow: 'hidden',
    borderColor: '#f3f4f7',
    borderWidth: 1,
  },
  imageContainer: {
    height: screenHeight * 0.14,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    // backgroundColor: '#f3f4f7',
  },
  image: {
    height: '100%',
    width: '100%',
    aspectRatio: 1 / 1,
    resizeMode: 'contain',
  },
  content: {
    flex: 1,
    paddingHorizontal: 10,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 2,
    borderRadius: 4,
    gap: 2,
    // backgroundColor: Colors.backgroundSecondary,
    alignSelf: 'flex-start',
  },
  clockIcon: {
    width: 15,
    height: 15,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    marginTop: 'auto',
  },
});
