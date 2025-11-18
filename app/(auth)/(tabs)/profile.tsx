// app/(auth)/profile.tsx
import { Text, View } from "@/components/Themed";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "expo-router";
import React from "react";
import { Image, Pressable } from "react-native";


export default function ProfileScreen() {
  const router = useRouter();
  const {user} = useAuthStore();
  const {consentGiven} = useAuthStore();

  const displayName = user?.name ?? user?.email ?? "Guest";
  const avatarSeed = encodeURIComponent(user?.name ?? user?.email ?? "guest");
  const avatarUrl = `https://avatar.iran.liara.run/username?username=${avatarSeed}`;

  return (
    <View className="flex-1 bg-gray-50 px-6 pt-8">
      {/* Profile card */}
      <View className="bg-white rounded-2xl p-5 flex-row items-center shadow-sm">
        <Image
          source={{ uri: avatarUrl }}
          className="w-20 h-20 rounded-full bg-gray-200"
          accessibilityLabel="profile avatar"
        />
        <View className="ml-4 flex-1">
          <Text className="text-lg font-semibold text-gray-900">{displayName}</Text>
          <Text className="text-sm text-gray-500 mt-1">{user?.email ?? ""}</Text>
        </View>
      </View>

      {/* gap */}
      <View className="h-6" />

      {/* Actions */}
      <View className="bg-white rounded-2xl p-4 shadow-sm">
        <Text className="text-sm font-medium text-gray-700 mb-3">Account</Text>

        <Pressable
          onPress={() => {
            console.log("Edit profile");
          }}
          className="py-3 px-4 rounded-md bg-blue-600 items-center mb-3"
          android_ripple={{ color: "#2563eb" }}
        >
          <Text className="text-white font-semibold">Edit profile</Text>
        </Pressable>

        <Pressable
          onPress={() => router.push("/(auth)/consentScreen")}
          className="py-3 px-4 rounded-md border border-gray-200 items-center mb-3"
          android_ripple={{ color: "#e5e7eb" }}
        >
          <Text className="text-gray-800 font-medium">Set consent</Text>
        </Pressable>

        <View className="pt-2 border-t border-gray-100 mt-1">
          <Text className="text-xs text-gray-500 mt-3">Consent status</Text>
          <Text className={`mt-1 font-medium ${consentGiven ? "text-green-600" : "text-red-500"}`}>
            {consentGiven ? "Given" : "Not given"}
          </Text>
        </View>
      </View>

      {/* spacer */}
      <View className="flex-1" />
    </View>
  );
}
