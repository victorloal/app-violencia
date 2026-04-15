import React, { useState, useEffect, useRef } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  useWindowDimensions,
  Animated,
} from "react-native";
import AppText from "./AppText";
import { components } from "../../styles/components";
import { spacing } from "../../styles/tokens";
import { colors } from "../../thema/colors";

const AppSlider = ({
  data = [],
  autoplay = true,
  autoplayInterval = 4000,
  cardStyle,
  textStyle,
  dotColor,
  activeDotColor,
  onIndexChange,
  renderItem: customRenderItem,
}) => {
  const [containerWidth, setContainerWidth] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef(null);

  // Autoplay logic
  useEffect(() => {
    if (!autoplay || data.length <= 1 || containerWidth === 0) return;

    const interval = setInterval(() => {
      let nextIndex = (activeIndex + 1) % data.length;
      scrollToIndex(nextIndex);
    }, autoplayInterval);

    return () => clearInterval(interval);
  }, [activeIndex, autoplay, data.length, autoplayInterval, containerWidth]);

  const scrollToIndex = (index) => {
    setActiveIndex(index);
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({
        index,
        animated: true,
      });
    }
    if (onIndexChange) onIndexChange(index);
  };

  const defaultRenderItem = ({ item }) => (
    <View style={[styles.slide, { width: containerWidth }]}>
      <View style={[components.card, styles.cardBase, cardStyle]}>
        <AppText variant="body" style={[styles.cardText, textStyle]}>
          {item}
        </AppText>
      </View>
    </View>
  );

  const renderItem = ({ item, index }) => {
    if (customRenderItem) {
      return (
        <View style={[styles.slide, { width: containerWidth }]}>
          {customRenderItem({ item, index })}
        </View>
      );
    }
    return defaultRenderItem({ item });
  };

  const onLayout = (event) => {
    const { width } = event.nativeEvent.layout;
    setContainerWidth(width);
  };

  const Pagination = () => (
    <View style={styles.paginationContainer}>
      {data.map((_, i) => (
        <View
          key={i}
          style={[
            styles.dot,
            dotColor && { backgroundColor: dotColor },
            activeIndex === i && [
              styles.activeDot,
              activeDotColor && { backgroundColor: activeDotColor },
            ],
          ]}
        />
      ))}
    </View>
  );

  return (
    <View style={styles.container} onLayout={onLayout}>
      {containerWidth > 0 && (
        <>
          <FlatList
            ref={flatListRef}
            data={data}
            renderItem={renderItem}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={(e) => {
              const index = Math.round(
                e.nativeEvent.contentOffset.x / containerWidth,
              );
              setActiveIndex(index);
              if (onIndexChange) onIndexChange(index);
            }}
            keyExtractor={(_, index) => index.toString()}
          />
          <Pagination />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  slide: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: spacing.lg, // Ajustado para evitar cortes y dejar aire
  },
  cardBase: {
    width: "100%",
    minHeight: 70, // Más compacto
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
  },
  cardText: {
    textAlign: "center",
    paddingHorizontal: spacing.md,
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: spacing.xs,
    gap: spacing.xs,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "rgba(255, 255, 255, 0.4)",
  },
  activeDot: {
    backgroundColor: colors.white,
    width: 18,
  },
});

export default AppSlider;
