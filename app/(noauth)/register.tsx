// app/(noauth)/register.tsx
import AuthInput from "@/components/AuthInput";
import PlaceholderLogo from "@/components/PlaceholderLogo";
import { Text, View } from "@/components/Themed";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Pressable } from "react-native";
import Toast from "react-native-toast-message";

export default function RegisterScreen() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuthStore();
  const router = useRouter();

  const submit = () => {
    if (!email.trim()) {
      Toast.show({ type: "error", text1: "Email required" });
      return;
    }
    setLoading(true);
    const user = {
        id: Date.now().toString(),
        name: name || "New User",
        email,
      };
      login(user);
      Toast.show({
        type: "success",
        text1: "Registered",
        text2: `Welcome ${user.name}`,
      });
      setLoading(false);
      router.replace("/(auth)/consentScreen");
  };

  return (
    <View className="flex-1 px-6 pt-12">
      <View className="items-center mb-8">
        <PlaceholderLogo />
        <Text className="text-xl font-semibold mt-4">Create account</Text>
        <Text className="text-sm text-gray-500 mt-1">Quick sign up</Text>
      </View>

      <View className="bg-white rounded-2xl px-5 py-6 shadow-sm">
        <AuthInput
          label="Name"
          value={name}
          onChangeText={setName}
          placeholder="Your name"
        />
        <AuthInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          placeholder="email"
          keyboardType="email-address"
        />

        <Pressable
          onPress={submit}
          className={`rounded-md py-3 items-center ${loading ? "bg-green-300" : "bg-green-600"}`}
          android_ripple={{ color: "#16a34a" }}
          accessibilityRole="button"
          accessibilityState={{ busy: loading }}
        >
          <Text className="text-white font-semibold">
            {loading ? "Registering..." : "Register"}
          </Text>
        </Pressable>

        <Pressable
          onPress={() => router.push("/(noauth)/login")}
          className="items-center mt-4"
        >
          <Text className="text-sm text-gray-600">
            Already have an account? Login
          </Text>
        </Pressable>
      </View>

      <View className="flex-1" />
      <View className="items-center pb-6">
        <Text className="text-xs text-gray-400">We respect your privacy</Text>
      </View>
    </View>
  );
}
