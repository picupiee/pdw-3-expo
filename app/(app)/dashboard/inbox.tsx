import { Pressable, Text, View } from "react-native";
import { router } from "expo-router";

export default function Inbox() {
  return (
    <View className="flex-1 items-center justify-center p-2 bg-gradient-to-br from-slate-600 to-gray-800 ">
      <View>
        <Text className="text-white text-lg font-semibold text-center">
          Segera Hadir
        </Text>
      </View>
    </View>
  );
}
