import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import VerticalTabItem from './VerticalTabItem';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setCurrentVertical } from '../../store/slices/appSlice';

const VerticalTabs = () => {
  const vertical = useAppSelector(state => state.app.currentVertical);
  const dispatch = useAppDispatch();

  const handlePressVerticalTab = (vertical: 'grocery' | 'restaurant') => {
    dispatch(setCurrentVertical(vertical));
  };
  return (
    <View style={styles.verticalTabs}>
      <VerticalTabItem
        label="Grocery"
        iconName={'shopping-bag'}
        isActive={vertical === 'grocery'}
        onPress={() => handlePressVerticalTab('grocery')}
      />
      <VerticalTabItem
        label="Food"
        iconName={'utensils'}
        isActive={vertical === 'restaurant'}
        onPress={() => handlePressVerticalTab('restaurant')}
      />
    </View>
  );
};

export default VerticalTabs;

const styles = StyleSheet.create({
  verticalTabs: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    gap: 16,
    width: '100%',
  },
});
