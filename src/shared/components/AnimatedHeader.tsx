import {
  LayoutChangeEvent,
  Pressable,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import React from 'react';
import Animated, {
  Extrapolation,
  SharedValue,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';
import { COLORS, FONTS } from '../utils/constants';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import VerticalTabs from './VerticalTabs';

import Lucide from '@react-native-vector-icons/lucide';
import SearchBar from './SearchBar';
import { useColorTheme } from '../hooks/useColorTheme';
import { useAppSelector } from '../../store/hooks';

const HEADER_BG = '#A82A12';

type HeaderProps = {
  /** Vertical scroll offset (contentOffset.y) of the screen's list. */
  scrollY: SharedValue<number>;
  /**
   * Reports the header's full (expanded) height. Use it as the list's
   * paddingTop, because the header floats above the list.
   */
  onHeightChange?: (height: number) => void;
  /** Top padding (px) when only the search bar is visible. */
  collapsedPaddingTop?: number;
};

const Header = ({
  scrollY,
  onHeightChange,
  collapsedPaddingTop = 10,
}: HeaderProps) => {
  const insets = useSafeAreaInsets();
  const topInset = insets.top;
  const colors = useColorTheme();
  const { currentVertical } = useAppSelector(state => state.app);

  // Height of the part that slides away: tabs + delivery row.
  const collapseHeight = useSharedValue(0);

  // Total distance the header travels while collapsing:
  //   the tabs + delivery row sliding away
  //   + the top padding going from `topInset` down to `collapsedPaddingTop`.
  // Animating the padding this way (a translation) gives the same result as
  // animating paddingTop itself, but the header's layout never changes, so
  // onLayout stays quiet and nothing is re-laid out while scrolling.
  const distance = useDerivedValue(() => {
    if (collapseHeight.value <= 0) {
      return 0;
    }
    return collapseHeight.value;
  });

  // 0 = fully expanded (paddingTop = insets.top), 1 = only the search bar,
  // with paddingTop = collapsedPaddingTop. Moves 1:1 with the scroll.
  const progress = useDerivedValue(() => {
    if (distance.value <= 0) {
      return 0;
    }
    return interpolate(
      scrollY.value,
      [0, distance.value],
      [0, 1],
      Extrapolation.CLAMP,
    );
  });

  const containerStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: -distance.value * progress.value }],
  }));

  const contentStyle = useAnimatedStyle(() => ({
    opacity: interpolate(progress.value, [0, 0.7], [1, 0], Extrapolation.CLAMP),
  }));

  const onContentLayout = (e: LayoutChangeEvent) => {
    collapseHeight.value = e.nativeEvent.layout.height;
  };

  const onContainerLayout = (e: LayoutChangeEvent) => {
    onHeightChange?.(e.nativeEvent.layout.height);
  };

  return (
    // Full-size, touch-transparent layer that clips anything sliding above
    // the top edge of this screen.
    <View pointerEvents="box-none" style={styles.overlay}>
      <Animated.View
        onLayout={onContainerLayout}
        style={[
          styles.header,
          { paddingTop: insets.top, backgroundColor: colors.brandDark },
          containerStyle,
        ]}
      >
        <Animated.View onLayout={onContentLayout} style={contentStyle}>
          <VerticalTabs />
          <View style={{ backgroundColor: colors.brand }}>
            <View style={[styles.flexRow, styles.deliveryRow]}>
              <View>
                {currentVertical === 'grocery' ? (
                  <>
                    <Text style={styles.deliveryInText}>Delivery in</Text>
                    <Text style={styles.deliveryMinsText}>12 min</Text>
                    <Text style={styles.location}>
                      Home Madhapur, Hyderabad
                    </Text>
                  </>
                ) : (
                  <>
                    <View style={styles.flexRow}>
                      <Text
                        style={[
                          styles.currentLocationText,
                          { color: colors.white },
                        ]}
                      >
                        Current Location
                      </Text>
                      <Lucide
                        name="chevron-down"
                        size={15}
                        color={colors.white}
                      />
                    </View>
                    <Text style={styles.location}>
                      Home Madhapur, Hyderabad
                    </Text>
                  </>
                )}
              </View>
              <View style={[styles.flexRow, { gap: 16 }]}>
                <Pressable style={styles.walletContainer}>
                  <Lucide name="wallet" size={20} color={colors.brand} />
                  <Text style={styles.walletBalance}>₹0</Text>
                </Pressable>
                <Pressable style={styles.profileIcon}>
                  <Lucide name="user-round" size={22} color={colors.brand} />
                </Pressable>
              </View>
            </View>
          </View>
        </Animated.View>

        {/* Always visible */}
        <SearchBar
          progress={progress}
          words={
            currentVertical === 'restaurant'
              ? ['biryani', 'pizza', 'chicken', 'burger']
              : ['Milk', 'Chips', 'Bread', 'Eggs']
          }
        />
      </Animated.View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFill,
    zIndex: 10,
    overflow: 'hidden',
    // backgroundColor: 'green',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  headerBody: {
    backgroundColor: COLORS.brand,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deliveryRow: {
    padding: 16,
    justifyContent: 'space-between',
  },
  deliveryInText: {
    fontSize: 13,
    fontFamily: FONTS.semiBold,
    color: COLORS.white,
  },
  deliveryMinsText: {
    fontSize: 30,
    fontFamily: FONTS.extraBold,
    color: COLORS.white,
  },
  location: {
    color: COLORS.white,
    fontSize: 13,
    fontFamily: FONTS.semiBold,
  },
  currentLocationText: {
    fontSize: 16,
    fontFamily: FONTS.semiBold,
    // paddingRight: 2,
  },
  profileIcon: {
    width: 44,
    height: 44,
    backgroundColor: COLORS.white,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  walletContainer: {
    width: 70,
    height: 44,
    backgroundColor: COLORS.white,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  walletBalance: {
    fontSize: 14,
    fontFamily: FONTS.extraBold,
    color: COLORS.ink,
  },
});
