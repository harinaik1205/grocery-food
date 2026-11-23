import { StyleSheet, Text, View } from 'react-native';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
  addEventListener,
  NetInfoStateType,
} from '@react-native-community/netinfo';
import NoInternet from './NoInternet';

interface AppWrapperPropsType {
  children: React.ReactNode;
}

const AppWrapper: FC<AppWrapperPropsType> = ({ children }) => {
  // const [type, setType] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(true);

  useFocusEffect(
    useCallback(() => {
      const unsubscribe = addEventListener(state => {
        // setType(state.type);
        setIsConnected(state.isConnected ?? false);
      });

      return () => unsubscribe();
    }, []),
  );

  if (!isConnected) return <NoInternet />;

  return <>{children}</>;
};

export default AppWrapper;

const styles = StyleSheet.create({});
