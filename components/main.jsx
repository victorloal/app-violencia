import { View } from "react-native";
import MainLayout from "./Layout/MainLayout";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AppText from "./UI/AppText";
export default function Main() {
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
      <MainLayout>
        <AppText variant="title">Bienvenido</AppText>
        <AppText variant="body" tone="muted">
          Este es un texto secundario
        </AppText>
        <AppText variant="caption" align="center">
          Versión 1.0.0
        </AppText>
      </MainLayout>
    </View>
  );
}
