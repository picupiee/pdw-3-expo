import { useState } from "react";
import { View, Text, TextInput, Button, Pressable } from "react-native";
import { useAuth } from "./context/AuthContext";
import { useRouter } from "expo-router";

export default function SignInScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { signIn } = useAuth();
  const router = useRouter();

  const handleSignin = async () => {
    const fakeUserToken = "dummy-user";
    signIn(fakeUserToken);
  };

  return (
    <View className="flex-1 items-center justify-center">
      <View className="mb-4">
        <Text className="font-semibold text-lg underline underline-offset-4">
          Sign In
        </Text>
      </View>
      <View className="gap-2">
        <TextInput
          placeholder="Username"
          onChangeText={setUsername}
          autoCapitalize="none"
          className="p-2 rounded-md bg-slate-200 outline-none"
        />
        <TextInput
          placeholder="Password"
          onChangeText={setPassword}
          autoCapitalize="none"
          className="p-2 rounded-md bg-slate-200 outline-none"
        />
      </View>
      <Pressable
        onPress={handleSignin}
        className="mt-2 p-2 rounded-md bg-blue-500"
      >
        <Text>Sign In</Text>
      </Pressable>
    </View>
  );
}
