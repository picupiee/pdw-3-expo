import { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
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
}
