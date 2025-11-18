import { View } from "@/components/Themed";
import { useColorScheme } from "@/components/useColorScheme";
import { useAuthStore } from "@/store/useAuthStore";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Slot, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  StatusBar,
  TouchableWithoutFeedback,
} from "react-native";

// import { StatusBar } from "expo-status-bar";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import "../global.css";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const { isLoggedIn } = useAuthStore();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  useEffect(() => {
    // redirect based on auth state
    if (isLoggedIn) {
      router.replace("/(auth)/(tabs)/home");
    } else {
      router.replace("/(noauth)/login");
    }
  }, [isLoggedIn, router]);

  return (
    <SafeAreaProvider>
      <ThemeProvider value={colorScheme === "light" ? DefaultTheme : DarkTheme}>
        {/* <SafeAreaView style={{ flex: 1, paddingTop: insets.top, paddingBottom: insets.bottom}} > */}
        <KeyboardAvoidingView
          style={{
            flex: 1,
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
            backgroundColor: colorScheme === "light" ?  "white" : "black",
          }}
        >
          <TouchableWithoutFeedback
            onPress={Keyboard.dismiss}
            accessible={false}
          >
            <View style={{ flex: 1 }}>
              <StatusBar
                barStyle={
                  colorScheme === "light" ? "dark-content" : "light-content"
                }
                backgroundColor="red" // This works with react-native's StatusBar
                translucent
              />
              {/* <StatusBar style="dark" backgroundColor="red" translucent /> */}
              <Slot />
              <Toast />
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
        {/* </SafeAreaView> */}
        {/* <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
      </Stack> */}
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
