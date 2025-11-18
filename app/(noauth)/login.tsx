// app/(noauth)/login.tsx
import AuthInput from "@/components/AuthInput";
import PlaceholderLogo from "@/components/PlaceholderLogo";
import { Text, View } from "@/components/Themed";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Pressable } from "react-native";
import Toast from "react-native-toast-message";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuthStore();
  const router = useRouter();

  const submit = async () => {
    if (!email.trim()) {
      Toast.show({ type: "error", text1: "Email required" });
      return;
    }
    setLoading(true);
    // fake delay to show loader feel
    setTimeout(() => {
      const user = { id: Date.now().toString(), name: name || "User", email };
      login(user);
      Toast.show({
        type: "success",
        text1: "Logged in",
        text2: `Welcome ${user.name}`,
      });
      setLoading(false);
      router.replace("/(auth)/(tabs)/home");
    }, 600);
  };

  return (
    <View className="flex-1 px-6 pt-12">
      <View className="items-center mb-8">
        <PlaceholderLogo />
        <Text className="text-xl font-semibold mt-4">Welcome back</Text>
        <Text className="text-sm text-gray-500 mt-1">Sign in to continue</Text>
      </View>

      <View className="bg-white rounded-2xl px-5 py-6 shadow-sm">
        <AuthInput
          label="Name (optional)"
          value={name}
          onChangeText={setName}
          placeholder="John Doe"
        />
        <AuthInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          placeholder="you@email.com"
          keyboardType="email-address"
        />

        <Pressable
          onPress={submit}
          className={`rounded-md py-3 items-center ${loading ? "bg-blue-300" : "bg-blue-600"}`}
          android_ripple={{ color: "#2563eb" }}
          accessibilityRole="button"
          accessibilityState={{ busy: loading }}
        >
          <Text className={`text-white font-semibold ${loading ? "" : ""}`}>
            {loading ? "Logging in..." : "Login"}
          </Text>
        </Pressable>

        <Pressable
          onPress={() => router.push("/(noauth)/register")}
          className="items-center mt-4"
        >
          <Text className="text-sm text-blue-600">
            Don't have an account? Register
          </Text>
        </Pressable>
      </View>

      <View className="flex-1" />
      <View className="items-center pb-6">
        <Text className="text-xs text-gray-400">
          By continuing you agree to terms
        </Text>
      </View>
    </View>
  );
}
