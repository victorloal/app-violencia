// components/UI/ViolenceCarousel.jsx
import { useState, useRef, useEffect } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ViolenceTypeCard from "./ViolenceTypeCard";
import { spacing, borderRadius, semanticColors } from "../../styles/tokens";
import Button from "./Button";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width - spacing.xxxl * 2;

export default function ViolenceCarousel({ data, navigation }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [realIndex, setRealIndex] = useState(0);
  const [infiniteData, setInfiniteData] = useState([]);
  const flatListRef = useRef(null);
  const currentIndexRef = useRef(0);
  const initialScrollDone = useRef(false);
  const isDragging = useRef(false);
  const pendingIndex = useRef(null); // Para manejar scrolls pendientes

  useEffect(() => {
    const duplicatedData = [...data, ...data, ...data];
    setInfiniteData(duplicatedData);
    updateIndices(data.length);
    initialScrollDone.current = false;
  }, [data]);

  useEffect(() => {
    if (infiniteData.length > 0 && !initialScrollDone.current) {
      setTimeout(() => {
        flatListRef.current?.scrollToIndex({
          index: data.length,
          animated: false,
          viewPosition: 0.5,
        });
        initialScrollDone.current = true;
      }, 100);
    }
  }, [infiniteData]);

  const updateIndices = (newIndex) => {
    currentIndexRef.current = newIndex;
    setCurrentIndex(newIndex);
    setRealIndex(((newIndex % data.length) + data.length) % data.length);
  };

  const scrollToIndex = (index, animated = true) => {
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({ index, animated, viewPosition: 0.5 });
    }
  };

  const handleNext = () => {
    const nextIndex = currentIndexRef.current + 1;
    scrollToIndex(nextIndex);
    updateIndices(nextIndex);
  };

  const handlePrev = () => {
    const prevIndex = currentIndexRef.current - 1;
    scrollToIndex(prevIndex);
    updateIndices(prevIndex);
  };

  // Cuando empieza a arrastrar
  const handleScrollBeginDrag = () => {
    isDragging.current = true;
  };

  // Cuando termina el momentum (después del snap)
  const handleMomentumScrollEnd = (event) => {
    const newIndex = Math.round(event.nativeEvent.contentOffset.x / CARD_WIDTH);

    // Actualizar índices
    updateIndices(newIndex);

    // Verificar loop infinito
    if (infiniteData.length === 0) return;

    if (newIndex >= data.length * 2) {
      const jumpIndex = newIndex - data.length;
      flatListRef.current?.scrollToIndex({
        index: jumpIndex,
        animated: false,
        viewPosition: 0.5,
      });
      currentIndexRef.current = jumpIndex;
      setCurrentIndex(jumpIndex);
    } else if (newIndex < data.length) {
      const jumpIndex = newIndex + data.length;
      flatListRef.current?.scrollToIndex({
        index: jumpIndex,
        animated: false,
        viewPosition: 0.5,
      });
      currentIndexRef.current = jumpIndex;
      setCurrentIndex(jumpIndex);
    }

    isDragging.current = false;
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

  const navigateToServices = (item) => {
    navigation.navigate("Services", {
      violenceType: {
        id:          item.id,
        title:       item.title,
        description: item.description,
      },
      title:       item.title,
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
        snapToInterval={CARD_WIDTH}
        snapToAlignment="center"
        decelerationRate="fast"
        disableIntervalMomentum={true}
        onScrollBeginDrag={handleScrollBeginDrag}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        scrollEventThrottle={16}
        getItemLayout={getItemLayout}
        onScrollToIndexFailed={(info) => {
          setTimeout(() => {
            flatListRef.current?.scrollToIndex({
              index: info.index,
              animated: false,
            });
          }, 100);
        }}
        renderItem={({ item, index }) => {
          const originalItem = getOriginalItem(index);
          return (
            <View style={[carouselStyles.cardWrapper, { width: CARD_WIDTH }]}>
              <ViolenceTypeCard
                title={item.title}
                description={item.description}
                icon={item.icon}
                onPressServices={() => navigateToServices(originalItem)}
                onPressInfo={() => {}}
              />
            </View>
          );
        }}
        keyExtractor={(item, index) => `${item.id}-${index}`}
      />

      {/* Indicadores y controles */}
      <View style={carouselStyles.indicatorsContainer}>
        {/* Botón anterior */}
        <Button
          type="primaryGhost"
          variant="circle"
          size="xxs"
          onPress={handlePrev}
          accessibilityLabel="Anterior"
          accessibilityHint="Regresa al tipo de violencia anterior"
        >
          <Ionicons
            name="chevron-back"
            size={24}
            color={semanticColors.text.primary}
          />
        </Button>

        {/* Indicadores */}
        <View style={carouselStyles.indicators}>
          {data.map((_, index) => {
            const isActive = index === realIndex;
            return (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  const targetIndex = data.length + index;
                  scrollToIndex(targetIndex);
                  updateIndices(targetIndex);
                }}
                accessibilityLabel={`Ir al tipo ${index + 1}`}
                accessibilityHint={`Ver información sobre ${data[index]?.title}`}
              >
                <View
                  style={[
                    carouselStyles.indicator,
                    isActive && carouselStyles.activeIndicator,
                  ]}
                />
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Botón siguiente */}
        <Button
          type="primaryGhost"
          variant="circle"
          size="xxs"
          onPress={handleNext}
          accessibilityLabel="Siguiente"
          accessibilityHint="Avanza al siguiente tipo de violencia"
        >
          <Ionicons
            name="chevron-forward"
            size={24}
            color={semanticColors.text.primary}
          />
        </Button>
      </View>
    </View>
  );
}

const carouselStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardWrapper: {
    padding: spacing.sm,
  },
  indicatorsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.lg,
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  indicators: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: borderRadius.xs,
    backgroundColor: semanticColors.border.dark,
  },
  activeIndicator: {
    width: 20,
    backgroundColor: semanticColors.primary,
  },
  controlButton: {
    padding: spacing.sm,
    borderRadius: borderRadius.circle,
    backgroundColor: semanticColors.primaryLight,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
});
