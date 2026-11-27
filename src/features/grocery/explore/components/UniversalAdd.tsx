import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { FC } from 'react';

import Icon from '@react-native-vector-icons/feather';
import { GROCERY_COLOR_THEM } from '../../../../shared/utils/theme';
import { FONTS } from '../../../../shared/utils/constants';
interface Props {
  item: any;
  title?: string;
  variant?: 'default' | 'primary' | 'outline';
}

const UniversalAdd: FC<Props> = ({ item, title, variant = 'default' }) => {
  //   const count = useCartStore(state => state.getItemCount(item?._id));
  //   const { addItem, removeItem } = useCartStore();
  const count = 0;

  return (
    <View
      style={[
        styles.container,
        variant === 'primary' && styles.addToCartBtn,
        {
          backgroundColor:
            variant === 'primary'
              ? GROCERY_COLOR_THEM.leaf
              : count === 0
              ? '#fff'
              : GROCERY_COLOR_THEM.leaf,
        },
      ]}
    >
      {count === 0 ? (
        <Pressable onPress={() => {}} style={styles.add}>
          <Text
            style={[
              styles.addText,
              variant === 'primary' && styles.primaryText,
            ]}
          >
            {title || 'ADD'}
          </Text>
        </Pressable>
      ) : (
        <View style={styles.counterContainer}>
          <Pressable
          //   onPress={() => removeItem(item._id)}
          >
            <Icon name="minus" color={'#fff'} size={13} />
          </Pressable>
          <Text
            // fontFamily={Fonts.SemiBold}
            // variant={'h8'}
            style={styles.text}
          >
            {count}
          </Text>
          <Pressable
          //   onPress={() => addItem(item)}
          >
            <Icon name="plus" color={'#fff'} size={13} />
          </Pressable>
        </View>
      )}
    </View>
  );
};

export default UniversalAdd;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: GROCERY_COLOR_THEM.leaf,
    width: 65,
    borderRadius: 8,
  },
  primaryText: {
    color: '#fff',
  },
  addToCartBtn: {
    width: 150,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: GROCERY_COLOR_THEM.leaf,
  },
  add: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
    paddingVertical: 6,
  },
  addText: {
    color: GROCERY_COLOR_THEM.leaf,
    fontFamily: FONTS.semiBold,
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 4,
    paddingVertical: 6,
    justifyContent: 'space-between',
  },
  text: {
    color: '#fff',
  },
});
