import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function Soon() {
  return (
    <View className="flex-1 p-2 items-center justify-center bg-gradient-to-br from-slate-600 to-gray-800">
      <Text className="text-center text-white text-xl sm:text-2xl font-semibold drop-shadow-md">
        Segera Hadir !
      </Text>
      <View className="mt-4">
        <Pressable
          onPress={() => router.replace("/")}
          className="text-black bg-lime-400 p-2 rounded-md"
        >
          Kembali ke Laman Utama
        </Pressable>
      </View>
    </View>
  );
}

// PLEASE REMOVE THIS FILE IF THE FEATURE IS COMING AND WORKING
