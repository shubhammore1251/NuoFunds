import { useColorScheme } from "@/components/useColorScheme";
import { useAuthStore } from "@/store/useAuthStore";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import * as Linking from 'expo-linking';
import { Slot, useRouter, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { StatusBar } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

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
  const segments = useSegments();

  // useEffect(() => {
  //   // redirect based on auth state
  //   if (isLoggedIn) {
  //     router.replace("/(auth)/(tabs)/home");
  //   } else {
  //     router.replace("/(noauth)/login");
  //   }
  // }, [isLoggedIn, router]);

    useEffect(() => {
    // segments example:
    //  - visiting /(noauth)/login  => ['(noauth)', 'login']
    //  - visiting /(auth)/consentScreen => ['(auth)', 'consentScreen']
    //  - visiting /(auth)/(tabs)/home => ['(auth)', '(tabs)', 'home']

    const inAuthGroup = segments?.[0] === "(auth)";
    const inNoAuthGroup = segments?.[0] === "(noauth)";

    if (isLoggedIn) {
      // if already inside auth area, don't force-navigate (lets consent screen show)
      if (!inAuthGroup) {
        // send to tabs root (not the full path with nested groups)
        router.replace("/home");
      }
    } else {
      // if already in noauth (login/register), don't redirect to login again
      if (!inNoAuthGroup) {
        router.replace("/login");
      }
    }
  }, [isLoggedIn, router, segments]);


  const redirectUrl = Linking.createURL("consentScreen");
  console.log("redirectUrl1 >>", redirectUrl);

  return (
    // <SafeAreaProvider>
    //   <ThemeProvider value={colorScheme === "light" ? DefaultTheme : DarkTheme}>
    //     {/* <SafeAreaView style={{ flex: 1, paddingTop: insets.top, paddingBottom: insets.bottom}} > */}
    //     <KeyboardAvoidingView
    //       style={{
    //         flex: 1,
    //         paddingTop: insets.top,
    //         paddingBottom: insets.bottom,
    //         backgroundColor: colorScheme === "light" ?  "white" : "black",
    //       }}
    //       behavior={Platform.OS === "ios" ? "padding" : "height"}
    //       enabled
    //     >
    //       <TouchableWithoutFeedback
    //         onPress={Keyboard.dismiss}
    //         accessible={false}
    //       >
    //         <View style={{ flex: 1 }}>
    //           <StatusBar
    //             barStyle={
    //               colorScheme === "light" ? "dark-content" : "light-content"
    //             }
    //             backgroundColor="red" // This works with react-native's StatusBar
    //             translucent
    //           />
    //           {/* <StatusBar style="dark" backgroundColor="red" translucent /> */}
    //           <Slot />
    //           <Toast />
    //         </View>
    //       </TouchableWithoutFeedback>
    //     </KeyboardAvoidingView>
    //     {/* </SafeAreaView> */}
    //     {/* <Stack>
    //     <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    //     <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
    //   </Stack> */}
    //   </ThemeProvider>
    // </SafeAreaProvider>

    <GestureHandlerRootView style={{ flex: 1 }}>
      {/* only top edge here — do NOT include bottom */}
      <Slot />
      <Toast />
      <StatusBar
        translucent
        barStyle={colorScheme === "dark" ? "light-content" : "dark-content"}
        backgroundColor={"transparent"}
      />
    </GestureHandlerRootView>
  );
}
