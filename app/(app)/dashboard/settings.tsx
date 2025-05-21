import { useAuth } from "@/app/context/AuthContext";
import { Pressable, Text, View } from "react-native";

export default function Settings() {
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    signOut();
  };

  return (
    <View className="flex-1 items-center justify-center p-2 bg-gradient-to-br from-slate-600 to-gray-800 ">
      <Pressable onPress={handleSignOut} className="bg-red-600 p-2 rounded-md">
        <Text className="text-white font-semibold text-lg">Sign Out</Text>
      </Pressable>
    </View>
  );
}
