import {
  FlatList,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { banners } from '../../utils/constants';
import Animated, {
  scrollTo,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';
import CarouselItem from './CarouselItem';
import Pagination from './Pagination';

const CustomCarousel = () => {
  const x = useSharedValue(0);
  const offset = useSharedValue(0);
  const [data, setData] = useState(banners);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [paginationIndex, setPaginationIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const ref = useAnimatedRef<FlatList<any>>();
  const interval = useRef<ReturnType<typeof setInterval> | null>(null);
  const { width } = useWindowDimensions();

  const onViewableItemsChanged = ({
    viewableItems,
  }: {
    viewableItems: any;
  }) => {
    if (
      viewableItems?.[0]?.index !== undefined &&
      viewableItems?.[0]?.index !== null
    ) {
      setCurrentIndex(viewableItems[0]?.index);
      setPaginationIndex(viewableItems[0]?.index % banners.length);
    }
  };

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };

  const viewabilityConfigCallbackPairs = useRef([
    { viewabilityConfig, onViewableItemsChanged },
  ]);

  const onScroll = useAnimatedScrollHandler({
    onScroll: e => {
      x.value = e.contentOffset.x;
    },
    onMomentumEnd: e => {
      offset.value = e.contentOffset.x;
    },
  });

  useDerivedValue(() => {
    scrollTo(ref, offset.value, 0, true);
  });

  useEffect(() => {
    if (isAutoPlay === true) {
      interval.current = setInterval(() => {
        offset.value += width;
      }, 4000);
    } else {
      clearInterval(interval.current);
    }
    return () => {
      clearInterval(interval.current);
    };
  }, [isAutoPlay, offset, width]);

  return (
    <View style={styles.container}>
      <Animated.FlatList
        ref={ref}
        style={{ height: 194, flexGrow: 0 }}
        data={data}
        keyExtractor={(_, index) => `banner-${index + 1}`}
        renderItem={({ item, index }) => (
          <CarouselItem item={item} index={index} x={x} />
        )}
        onScroll={onScroll}
        onScrollBeginDrag={() => {
          setIsAutoPlay(false);
        }}
        onScrollEndDrag={() => {
          setIsAutoPlay(true);
        }}
        scrollEventThrottle={16}
        onEndReached={() => setData([...data, ...banners])}
        onEndReachedThreshold={0.5}
        horizontal
        bounces={false}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
      />
      <Pagination paginationIndex={paginationIndex} />
    </View>
  );
};

export default CustomCarousel;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 14,
  },
});
