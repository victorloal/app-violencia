import { View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AnimatedStyledButton from "../UI/StyledButton";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors } from "../../thema/colors";
import AppNavbar from "./AppNavbar";

export default function MainLayout({ children }) {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        flex: 1,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}
    >
      <View style={styles.container}>
        {/* navbar */}
        <AppNavbar />

        {/* 🔝 Contenido dinámico */}
        <View style={styles.content}>{children}</View>

        {/* 🔽 Barra inferior fija */}
        <View style={styles.bottomBar}>
          <AnimatedStyledButton
            title="Mensaje"
            size="flex"
            icon={
              <Ionicons
                name="mail-open-outline"
                size={30}
                color={colors.lavender[800]}
              />
            }
            iconPosition="top"
            tone="light"
          />

          <AnimatedStyledButton
            title="Llamada"
            size="flex"
            icon={
              <Ionicons
                name="call-outline"
                size={40}
                color={colors.lavender[200]}
              />
            }
            iconPosition="top"
            shape="pill"
            tone="dark"
          />

          <AnimatedStyledButton
            title="Salir"
            size="flex"
            icon={
              <Ionicons
                name="exit-outline"
                size={30}
                color={colors.lavender[800]}
              />
            }
            iconPosition="top"
            tone="light"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },

  content: {
    flex: 1,
  },

  bottomBar: {
    flexDirection: "row",
    width: "100%",
    height: "15%",
    backgroundColor: colors.lavender[200],
  },
});
