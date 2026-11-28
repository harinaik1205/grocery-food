import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { GROCERY_COLOR_THEM } from '../../../../shared/utils/theme';
import Feather from '@react-native-vector-icons/feather';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  categories,
  FONTS,
  productsList,
} from '../../../../shared/utils/constants';
import SideBar from '../components/SideBar';
import ProductList from '../components/ProductsList';
import {
  getAllCategories,
  getProductsByCategoryId,
} from '../services/productServices';

const ProductCategories = () => {
  const [categories, setCategories] = React.useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = React.useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState<boolean>(false);
  const [productsLoading, setProductsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setCategoriesLoading(true);
        const data = await getAllCategories();
        // console.log('cats data', data);
        setCategories(data.categories);
        if (data && data?.categories?.length > 0) {
          setSelectedCategory(data.categories[0]);
        }
      } catch (error) {
        console.log('error while fetching categories', error);
      } finally {
        setCategoriesLoading(false);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    // console.log(selectedCategory);
    fetchProducts();
  }, [selectedCategory]);

  const fetchProducts = async () => {
    try {
      setProductsLoading(true);
      const response = await getProductsByCategoryId(selectedCategory?._id);
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

  // console.log(selectedCategory);
  return (
    <View style={{ flex: 1 }}>
      <Header />
      <View style={styles.content}>
        {categoriesLoading ? (
          <ActivityIndicator size={'small'} color={GROCERY_COLOR_THEM.brand} />
        ) : (
          <SideBar
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryPress={(category: any) => setSelectedCategory(category)}
          />
        )}
        {productsLoading ? (
          <ActivityIndicator
            size={'large'}
            color={GROCERY_COLOR_THEM.brand}
            style={styles.center}
          />
        ) : (
          <ProductList products={products || []} />
        )}
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
    flex: 1,
    flexDirection: 'row',
    // alignItems: 'center',
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
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
