import { Text, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Link } from "expo-router";

export default function Index() {
  return (
    <View className="flex-1 p-2 bg-gradient-to-br from-slate-600 to-gray-800 ">
      <View className="flex flex-row items-center justify-start">
        <Link replace href="/">
          <MaterialIcons
            name="arrow-back"
            size={20}
            color={"black"}
            className="rounded-full bg-slate-400 shadow-sm p-2 mr-2"
          />
        </Link>
        <Text className="font-bold text-2xl bg-gradient-to-r from-red-400 to-purple-500 bg-clip-text text-transparent drop-shadow-md">
          Laman Dashboard
        </Text>
      </View>
    </View>
  );
}
