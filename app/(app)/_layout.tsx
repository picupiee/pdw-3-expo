import { Redirect, Stack } from "expo-router";
import { useAuth } from "../context/AuthContext";
import { Text, View, ActivityIndicator } from "react-native";

export default function AppGroupLayout() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" />
        <Text>Loading . . .</Text>
      </View>
    );
  }

  if (!user) {
    return <Redirect href="/sign-in" />;
  }

  if (user) {
    return (
      <Stack>
        <Stack.Screen name="dashboard" options={{ headerShown: false }} />
      </Stack>
    );
  }
}
