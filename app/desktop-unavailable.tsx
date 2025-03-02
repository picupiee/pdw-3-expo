import React from "react";
import { View, Text } from "react-native";

export default function DesktopUnavailable() {
  return (
    <View className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-600 to-gray-800">
      <Text className="font-bold text-2xl sm:text-3xl bg-gradient-to-r from-red-400 to-purple-500 bg-clip-text text-transparent drop-shadow-md">
        Portal Digital Warga
      </Text>
      <Text className="font-bold text-md bg-gradient-to-r from-red-400 to-purple-500 bg-clip-text text-transparent drop-shadow-md">
        Puri Harmoni Pasir Mukti RT 003
      </Text>
      <Text className="mt-10 text-white text-xl font-semibold text-center">
        Mohon maaf, untuk saat ini Portal Digital Warga hanya bisa diakses
        melalui smartphone.
      </Text>
    </View>
  );
}
