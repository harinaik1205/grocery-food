import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import Reanimated, {
  DerivedValue,
  SharedValue,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import Ionicons from '@react-native-vector-icons/ionicons';
import { COLORS, FONTS } from '../utils/constants';

type SearchBarProps = {
  /** Static hint text shown inside the bar. */
  placeholder?: string;
  prefix?: 'Search';
  words?: string[];
  /** Optional tap handler, e.g. to navigate to the real search screen. */
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  /**
   * Header collapse progress: 0 = expanded, 1 = collapsed (only the search
   * bar visible). Drives the wrapper's background color. Omit it and the
   * wrapper simply stays in its expanded color.
   */
  progress?: SharedValue<number> | DerivedValue<number>;
};

const DEFAULT_WORDS = ['Milk', 'Chips', 'Bread', 'Eggs'];

const WORD_CHANGE_INTERVAL_MS = 3000; // a new word starts to appear every 3s
const TRANSITION_MS = 250; // duration of each phase (exit, then enter)
const SLIDE_DISTANCE = 12;

// Wrapper background: expanded header -> collapsed header.
const WRAP_BG_EXPANDED = '#D93417';
const WRAP_BG_COLLAPSED = '#A82A12'; // white at 50% opacity

const SearchBar = ({
  prefix = 'Search',
  words = DEFAULT_WORDS,
  placeholder = 'Search for “Milk”',
  onPress,
  style,
  progress,
}: SearchBarProps) => {
  const [index, setIndex] = useState(0);

  // Fallback so the hook below is always called with a shared value.
  const idle = useSharedValue(0);
  const collapse = progress ?? idle;

  const wrapStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      collapse.value,
      [0, 1],
      [WRAP_BG_EXPANDED, WRAP_BG_COLLAPSED],
    ),
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  }));

  // 0  = word resting in place (visible)
  // 1  = word moved up and faded out
  // -1 = word waiting below and faded out
  const anim = useRef(new Animated.Value(0)).current;

  const { translateY, opacity } = useMemo(
    () => ({
      translateY: anim.interpolate({
        inputRange: [-1, 0, 1],
        outputRange: [SLIDE_DISTANCE, 0, -SLIDE_DISTANCE],
      }),
      opacity: anim.interpolate({
        inputRange: [-1, 0, 1],
        outputRange: [0, 1, 0],
      }),
    }),
    [anim],
  );

  useEffect(() => {
    if (words.length < 2) {
      return;
    }

    let running: Animated.CompositeAnimation | null = null;

    const intervalId = setInterval(() => {
      // 1) Current word slides up and fades out.
      running = Animated.timing(anim, {
        toValue: 1,
        duration: TRANSITION_MS,
        easing: Easing.in(Easing.quad),
        useNativeDriver: true,
      });

      running.start(({ finished }) => {
        if (!finished) {
          return;
        }

        // 2) Swap the word while it is invisible and park it below.
        setIndex(prev => (prev + 1) % words.length);
        anim.setValue(-1);

        // 3) New word slides up into place and fades in.
        running = Animated.timing(anim, {
          toValue: 0,
          duration: TRANSITION_MS,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        });
        running.start();
      });
    }, WORD_CHANGE_INTERVAL_MS);

    return () => {
      clearInterval(intervalId);
      running?.stop();
      anim.setValue(0);
    };
  }, [anim, words.length]);

  const word = words[index % words.length];
  return (
    <Reanimated.View style={[styles.searchWrap, wrapStyle]}>
      <Pressable
        accessibilityRole="search"
        accessibilityLabel={placeholder}
        onPress={onPress}
        style={[styles.container, style]}
      >
        <Ionicons name="search" size={22} color={COLORS.ink} />

        {/* <Text style={styles.placeholder} numberOfLines={1}>
          {placeholder}
        </Text> */}

        <View style={styles.textRow}>
          <Text style={styles.placeholder}>{`${prefix} `}</Text>
          <Animated.Text
            numberOfLines={1}
            style={[
              styles.placeholder,
              styles.word,
              { opacity, transform: [{ translateY }] },
            ]}
          >
            {`"${word}"`}
          </Animated.Text>
        </View>

        <View style={styles.divider} />

        <Ionicons name="mic" size={22} color={COLORS.ink} />
      </Pressable>
    </Reanimated.View>
  );
};

const styles = StyleSheet.create({
  // backgroundColor is animated (see wrapStyle).
  searchWrap: {
    width: '100%',
    paddingHorizontal: 16,
    padding: 10,
  },
  container: {
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10, // React Native 0.71+
    paddingHorizontal: 16,
    borderRadius: 26,
    backgroundColor: COLORS.white,
    overflow: 'hidden',
  },
  placeholder: {
    // flex: 1, // takes the "Spacer" space from the design
    fontFamily: FONTS.semiBold,
    fontSize: 15,
    color: COLORS.placeholder,
  },
  textRow: {
    flex: 1, // takes the "Spacer" space from the design
    // height: LINE_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
  },
  //   placeholder: {
  //     fontFamily: FONT_SEMI_BOLD,
  //     fontSize: 15,
  //     lineHeight: LINE_HEIGHT,
  //     color: COLORS.placeholder,
  //   },
  word: {
    flexShrink: 1, // long words truncate instead of pushing the divider/mic
  },
  divider: {
    width: 1.5,
    height: 24,
    backgroundColor: COLORS.divider,
  },
});

export default SearchBar;
