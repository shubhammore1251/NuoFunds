// app/(auth)/consent.tsx
import { Text, View } from "@/components/Themed";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import React, { useState } from "react";
import { Pressable } from "react-native";
import Toast from "react-native-toast-message";

export default function ConsentScreen() {
  const router = useRouter();
  const {setConsent} = useAuthStore();
  const [loading, setLoading] = useState(false);

  const TERMS_URL = "https://shubhammoredev.com/"; // <- replace with real URL

  const onSkip = () => {
    setConsent(false);
    Toast.show({ type: "info", text1: "Skipped", text2: "You can review later." });
    // land straight in tabs
    router.replace("/(auth)/(tabs)/home");
  };

  const onGiveConsent = async () => {
    setLoading(true);
    try {
      // open in-app browser
      const res = await WebBrowser.openBrowserAsync(TERMS_URL);
      // WebBrowser returns type: {type: 'opened'|'cancel'|'dismiss'...}
      // mark consent true regardless of how user closed the browser, or inspect res.type
      setConsent(true);
      Toast.show({ type: "success", text1: "Thanks", text2: "Consent recorded" });
      router.replace("/(auth)/(tabs)/home");
    } catch (err) {
      Toast.show({ type: "error", text1: "Failed", text2: "Could not open browser" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-gray-50 px-6 pt-12 ">
      <View className="items-center mb-8">
        <View className="w-20 h-20 rounded-lg bg-gray-200 items-center justify-center">
          <Text className="text-lg font-bold text-gray-500">LOGO</Text>
        </View>
        <Text className="text-xl font-semibold mt-4">A few quick steps</Text>
        <Text className="text-sm text-gray-500 mt-1 text-center">
          We need your consent to continue. You can read details before giving consent.
        </Text>
      </View>

      <View className="bg-white rounded-2xl px-5 py-6 shadow-sm">
        <Text className="text-base font-medium mb-3">Consent</Text>
        <Text className="text-sm text-gray-600 mb-4">
          By giving consent you agree to our terms and privacy policy. Tap Give Consent to read the full document.
        </Text>

        <Pressable
          onPress={onGiveConsent}
          className={`rounded-md py-3 items-center mb-3 ${loading ? "bg-blue-300" : "bg-blue-600"}`}
          android_ripple={{ color: "#2563eb" }}
        >
          <Text className="text-white font-semibold">{loading ? "Opening..." : "Give Consent"}</Text>
        </Pressable>

        <Pressable
          onPress={onSkip}
          className="rounded-md py-3 items-center border border-gray-200"
          android_ripple={{ color: "#e5e7eb" }}
        >
          <Text className="text-gray-700 font-medium">Skip for now</Text>
        </Pressable>
      </View>

      <View className="flex-1" />
      <View className="items-center pb-6">
        <Text className="text-xs text-gray-400">You can change consent in settings later.</Text>
      </View>
    </View>
  );
}
