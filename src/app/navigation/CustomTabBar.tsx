import { Pressable, StyleSheet, Text, View } from 'react-native';
import { COLORS, FONTS } from '../../shared/utils/constants';
import Feather from '@react-native-vector-icons/feather';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useAppSelector } from '../../store/hooks';
import { useColorTheme } from '../../shared/hooks/useColorTheme';

const ICONS_NAME: {
  Home: 'home';
  Categories: 'grid';
  'Buy Again': 'refresh-cw';
  Offers: 'tag';
  Reorder: 'refresh-cw';
  Dining: 'sunset';
  EatRight: 'heart';
} = {
  Home: 'home',
  Categories: 'grid',
  'Buy Again': 'refresh-cw',
  Offers: 'tag',
  Reorder: 'refresh-cw',
  Dining: 'sunset',
  EatRight: 'heart',
};

export const CustomTabBar = (props: BottomTabBarProps) => {
  const { state, navigation } = props;
  const COLORS = useColorTheme();
  const { currentVertical } = useAppSelector(state => state.app);

  const handlePress = (route: string) => {
    // navigation.navigate(route);
    navigation.navigate(
      currentVertical === 'grocery' ? 'GroceryTabs' : 'FoodTabs',
      { screen: route },
    );
  };

  return (
    <View style={styles.tabBarContainer}>
      <View style={styles.customTabBar}>
        <View style={styles.tabContainer}>
          {state.routes.map((route, index) => {
            const isFocused = state.index === index;
            return (
              <Pressable
                key={index}
                onPress={() => handlePress(route.name)}
                style={[
                  styles.tabItem,
                  isFocused && {
                    backgroundColor: COLORS.brandLight,
                  },
                ]}
              >
                <Feather
                  name={ICONS_NAME[route.name as keyof typeof ICONS_NAME]}
                  size={22}
                  color={isFocused ? COLORS.brandDark : COLORS.muted}
                />
                <Text
                  style={[
                    styles.tabLabel,
                    isFocused && { color: COLORS.brandDark },
                  ]}
                >
                  {route.name}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 20,
    width: '100%',
  },
  customTabBar: {
    width: '95%',
    height: 68,
    borderRadius: 34,
    borderWidth: 0.5,

    borderColor: COLORS.border,
    backgroundColor: '#FFFFFF80',
    // shadowOffset: {
    //   width: 0,
    //   height: 8,
    // },
    // shadowColor: '#330D05',
    // elevation: 8,
    paddingHorizontal: 5,
  },
  tabContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
  tabItem: {
    height: 56,
    width: '22%',
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabLabel: {
    fontSize: 11,
    fontFamily: FONTS.bold,
    color: COLORS.muted,
  },
});
