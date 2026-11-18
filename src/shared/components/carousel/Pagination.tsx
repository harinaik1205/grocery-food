import { StyleSheet, Text, View } from 'react-native';
import React, { FC } from 'react';
import { banners } from '../../utils/constants';
import Dot from './Dot';

interface PaginationProps {
  paginationIndex: number;
}

const Pagination: FC<PaginationProps> = ({ paginationIndex }) => {
  return (
    <View style={styles.container}>
      {banners.map((_, index) => {
        return <Dot index={index} paginationIndex={paginationIndex} />;
      })}
    </View>
  );
};

export default Pagination;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
