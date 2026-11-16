/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NewAppScreen } from '@react-native/new-app-screen';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { RootStack } from './src/app/navigation';
import {
  navigationRef,
  replace,
  resetAndNavigate,
} from './src/shared/utils/navigation';
import { Provider } from 'react-redux';
import { store } from './src/store';
import { mmkvStorage } from './src/shared/utils/storage';
import { useEffect } from 'react';
import { getAuth, onAuthStateChanged } from '@react-native-firebase/auth';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  useEffect(() => {
    const subscriber = onAuthStateChanged(getAuth(), handleAuthStateChanged);
    return subscriber;
  }, []);

  function handleAuthStateChanged(user: any) {
    if (user) {
      mmkvStorage.setItem('user', JSON.stringify(user));
      replace('vertical');
      console.log('auth state changed');
      // Some Android devices auto-retrieve the SMS code and complete sign-in
      // without the user typing it. Hide the code UI and navigate away when
      // this fires; entering the same code again will fail because it was used.
    } else {
      console.log('auth state changed');
      mmkvStorage.removeItem('user');
      resetAndNavigate('login');
    }
  }

  return (
    <NavigationContainer ref={navigationRef}>
      <SafeAreaProvider>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        {/* <AppContent /> */}
        <Provider store={store}>
          <RootStack />
        </Provider>
      </SafeAreaProvider>
    </NavigationContainer>
  );
}

function AppContent() {
  const safeAreaInsets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <NewAppScreen
        templateFileName="App.tsx"
        safeAreaInsets={safeAreaInsets}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
