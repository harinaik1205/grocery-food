import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  LoginScreen,
  OtpScreen,
  SplashScreen,
} from '../../features/auth/screens';
import VerticalRouter from './VerticalRouter';

const Stack = createNativeStackNavigator();

function RootStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="login" component={LoginScreen} />
      <Stack.Screen name="otp" component={OtpScreen} />
      <Stack.Screen name="vertical" component={VerticalRouter} />
    </Stack.Navigator>
  );
}

export default RootStack;
