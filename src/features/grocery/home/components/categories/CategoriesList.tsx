import { SectionList, StyleSheet, Text, View } from 'react-native';
import React, { FC } from 'react';
import {
  categoriesData,
  COLORS,
  FONTS,
} from '../../../../../shared/utils/constants';
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
      {/* {label && <Text style={styles.label}>{label}</Text>} */}

      {/* <View style={styles.flexRowGap}>
        {categories.slice(0, 4).map(category => (
          <CategoryItem key={category.id} category={category} />
        ))}
      </View>
      <View style={styles.flexRowGap}>
        {categories.slice(4).map(category => (
          <CategoryItem key={category.id} category={category} />
        ))}
      </View> */}

      <SectionList
        sections={categoriesData}
        keyExtractor={item => item?.name}
        renderItem={renderItem}
        renderSectionHeader={({ section }) => (
          <Text style={styles.label}>{section?.title}</Text>
        )}
        scrollEnabled={false}
      />
    </View>
  );
};

function renderItem({ section, index }: { section: any; index: number }) {
  const numColumns = 4;
  if (index % numColumns !== 0) return null;
  console.log('sec', section);
  // "numColumns" row wise ITEMS will be inserted into this Array
  const items = [];

  // Loop for "numColumns" times for each valid "index"
  for (let i = index; i < index + numColumns; i++) {
    if (i >= section.data.length) {
      break;
    }

    items.push(<CategoryItem category={section?.data?.[i]} />);
  }
  console.log('it', items);
  return (
    <View
      key={index}
      style={{ flexDirection: 'row', justifyContent: 'space-between' }}
    >
      {items}
    </View>
  );
}

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
    paddingBottom: 10,
  },
  flexRowGap: {
    flexDirection: 'row',
    gap: 10,
  },
});
