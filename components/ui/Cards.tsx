import React from "react";
import { Text, View, Image, Pressable } from "react-native";
import "@/global.css";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

interface CardsProps {
  title: string;
  description?: string;
  imageUrl?: string;
  onPress?: () => void;
  icons?: string;
}

const Cards: React.FC<CardsProps> = ({
  title,
  description,
  imageUrl,
  onPress,
  icons,
}) => {
  return (
    <Pressable
      onPress={onPress}
      className="bg-slate-300 rounded-br-md rounded-bl-md shadow-md m-2 w-40 sm:w-80 h-32 sm:h-60"
    >
      {imageUrl && (
        <Image
          source={{ uri: imageUrl }}
          className="fixed top-0 left-0"
          resizeMode="cover"
        />
      )}
      {icons && (
        <MaterialIcons
          name={icons}
          size={85}
          color={"transparent"}
          className="absolute -bottom-0 right-1 opacity-100 bg-gradient-to-l from-slate-400 to-transparent to-95% bg-clip-text"
        />
      )}
      <Text className="text-lg sm:text-2xl font-semibold mb-2 pb-2 text-center bg-blue-400 rounded-b-full drop-shadow-lg">
        {title}
      </Text>
      {description && (
        <Text className="text-sm sm:text-lg text-gray-600 p-2 text-center font-semibold">
          {description}
        </Text>
      )}
    </Pressable>
  );
};

export default Cards;
