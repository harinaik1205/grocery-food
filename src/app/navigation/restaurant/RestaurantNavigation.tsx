import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Header from '../../../shared/components/Header';
import { useInternetAvailability } from '../../../shared/hooks/useInternetAvailability';
import { COLORS } from '../../../shared/utils/constants';
import PrimaryButton from '../../../shared/components/PrimaryButton';

const RestaurantNavigation = () => {
  const { isLoading, isConnected, recheckConnection } =
    useInternetAvailability();

  return (
    <View>
      <Header />
      <Text>{isConnected ? 'Online' : 'Offline'}</Text>
      <PrimaryButton label="Try again" onPress={recheckConnection} />
    </View>
  );
};

export default RestaurantNavigation;

const styles = StyleSheet.create({});
