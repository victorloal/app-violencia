// components/UI/ViolenceCarousel.jsx
import { useState, useRef, useEffect } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import globalStyles from "../../styles";
import ViolenceTypeCard from "./ViolenceTypeCard";
import { Ionicons } from "@expo/vector-icons";
const { width } = Dimensions.get("window");
const CARD_WIDTH = width - 60;

export default function ViolenceCarousel({ data, navigation }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [infiniteData, setInfiniteData] = useState([]);
  const flatListRef = useRef(null);

  useEffect(() => {
    const duplicatedData = [...data, ...data, ...data];
    setInfiniteData(duplicatedData);
    setCurrentIndex(data.length);
  }, [data]);

  const scrollToIndex = (index, animated = true) => {
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({
        index,
        animated,
        viewPosition: 0.5,
      });
    }
  };

  const handleNext = () => {
    const nextIndex = currentIndex + 1;
    scrollToIndex(nextIndex);
    setCurrentIndex(nextIndex);
  };

  const handlePrev = () => {
    const prevIndex = currentIndex - 1;
    scrollToIndex(prevIndex);
    setCurrentIndex(prevIndex);
  };

  const handleScrollEnd = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.floor(scrollPosition / CARD_WIDTH);
    setCurrentIndex(index);
  };

  const handleMomentumScrollEnd = () => {
    if (infiniteData.length > 0) {
      if (currentIndex >= data.length * 2) {
        const newIndex = currentIndex - data.length;
        flatListRef.current?.scrollToIndex({
          index: newIndex,
          animated: false,
          viewPosition: 0.5,
        });
        setCurrentIndex(newIndex);
      } else if (currentIndex < data.length) {
        const newIndex = currentIndex + data.length;
        flatListRef.current?.scrollToIndex({
          index: newIndex,
          animated: false,
          viewPosition: 0.5,
        });
        setCurrentIndex(newIndex);
      }
    }
  };

  const getItemLayout = (_, index) => ({
    length: CARD_WIDTH,
    offset: CARD_WIDTH * index,
    index,
  });

  const getOriginalItem = (index) => {
    const originalIndex = index % data.length;
    return data[originalIndex];
  };

  const navigateToFormAyuda = (item) => {
    navigation.navigate("Services", {
      violenceType: item,
      title: item.title,
      description: item.description,
    });
  };

  if (infiniteData.length === 0) return null;

  return (
    <View style={carouselStyles.container}>
      <FlatList
        ref={flatListRef}
        data={infiniteData}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        snapToInterval={CARD_WIDTH}
        snapToAlignment="center"
        decelerationRate="fast"
        onScrollEndDrag={handleScrollEnd}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        scrollEventThrottle={16}
        getItemLayout={getItemLayout}
        initialScrollIndex={data.length}
        renderItem={({ item, index }) => {
          const originalItem = getOriginalItem(index);
          return (
            <View style={[carouselStyles.cardWrapper, { width: CARD_WIDTH }]}>
              <ViolenceTypeCard
                title={item.title}
                description={item.description}
                // Clonamos el icono con tamaño mayor para la card
                icon={item.icon}
                onPressServices={() => navigateToFormAyuda(originalItem)}
                // onPressInfo está manejado internamente por ViolenceTypeCard (modal)
                onPressInfo={() => {}}
              />
            </View>
          );
        }}
        keyExtractor={(item, index) => `${item.id}-${index}`}
      />

      {/* Indicadores y controles */}
      <View style={carouselStyles.indicatorsContainer}>
        <TouchableOpacity
          style={carouselStyles.controlButton}
          onPress={handlePrev}
        >
          <Ionicons
            name="chevron-back"
            size={24}
            color={globalStyles.semanticColors.text.primary}
          />
        </TouchableOpacity>

        {data.map((_, index) => {
          const realIndex = currentIndex % data.length;
          return (
            <TouchableOpacity
              key={index}
              onPress={() => {
                const targetIndex = data.length + index;
                scrollToIndex(targetIndex);
                setCurrentIndex(targetIndex);
              }}
            >
              <View
                style={[
                  carouselStyles.indicator,
                  index === realIndex && carouselStyles.activeIndicator,
                ]}
              />
            </TouchableOpacity>
          );
        })}

        <TouchableOpacity
          style={carouselStyles.controlButton}
          onPress={handleNext}
        >
          <Ionicons
            name="chevron-forward"
            size={24}
            color={globalStyles.semanticColors.text.primary}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const carouselStyles = StyleSheet.create({
  container: {
    marginVertical: globalStyles.spacing.xl,
    flex: 1,
  },
  cardWrapper: {
    ...globalStyles.utilities.center,
  },
  indicatorsContainer: {
    flexDirection: "row",
    ...globalStyles.utilities.center,
    marginTop: globalStyles.spacing.xl,
    gap: globalStyles.spacing.sm,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: globalStyles.semanticColors.border.dark,
  },
  activeIndicator: {
    width: 20,
    backgroundColor: globalStyles.semanticColors.primary,
  },
  controlButton: {
    padding: globalStyles.spacing.sm,
    borderRadius: globalStyles.borderRadius.circle,
    backgroundColor: globalStyles.semanticColors.primaryLight,
  },
});
