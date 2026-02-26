// components/UI/ViolenceCarousel.jsx
import { useState, useRef, useEffect } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { colors } from "../../thema/colors";
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
    <View style={styles.container}>
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
            <View style={[styles.cardWrapper, { width: CARD_WIDTH }]}>
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
      <View style={styles.indicatorsContainer}>
        <TouchableOpacity style={styles.controlButton} onPress={handlePrev}>
          <Ionicons name="chevron-back" size={24} color={colors.lavender[700]} />
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
                  styles.indicator,
                  index === realIndex && styles.activeIndicator,
                ]}
              />
            </TouchableOpacity>
          );
        })}

        <TouchableOpacity style={styles.controlButton} onPress={handleNext}>
          <Ionicons name="chevron-forward" size={24} color={colors.lavender[700]} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    flex: 1,
  },
  cardWrapper: {
    justifyContent: "center",
    alignItems: "center",
  },
  indicatorsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    gap: 8,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.lavender[300],
  },
  activeIndicator: {
    width: 20,
    backgroundColor: colors.lavender[700],
  },
  controlButton: {
    padding: 10,
    borderRadius: 25,
    backgroundColor: colors.lavender[200],
  },
});