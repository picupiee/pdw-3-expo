// components/Dropdown.tsx
import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  Pressable,
  Modal,
  FlatList,
  StyleSheet,
  Dimensions,
  findNodeHandle,
  UIManager,
} from "react-native";

interface DropdownProps<T> {
  options: { label: string; value: T }[];
  selectedValue: T | null;
  onValueChange: (value: T) => void;
  placeholder?: string;
  label?: string;
  className?: string;
}

const Dropdown = <T,>({
  options,
  selectedValue,
  onValueChange,
  placeholder = "Pilih Salah Satu",
  label,
  className,
}: DropdownProps<T>) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleOptionSelect = (value: T) => {
    onValueChange(value);
    setModalVisible(false);
  };

  const renderItem = ({ item }: { item: { label: string; value: T } }) => (
    <Pressable
      className="p-3 border-b border-gray-200"
      onPress={() => handleOptionSelect(item.value)}
    >
      <Text className="text-lg">{item.label}</Text>
    </Pressable>
  );

  return (
    <View className={`${className}`}>
      {label && <Text className="mb-1">{label}</Text>}
      <Pressable // Change to Pressable
        className="border border-gray-300 rounded p-3"
        onPress={() => setModalVisible(true)}
      >
        <Text className="text-lg">
          {selectedValue
            ? options.find((option) => option.value === selectedValue)?.label
            : placeholder}
        </Text>
      </Pressable>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable // Change to Pressable
          style={styles.modalOverlay}
          onPressOut={() => setModalVisible(false)}
        >
          <View style={styles.modalView}>
            <FlatList
              data={options}
              renderItem={renderItem}
              keyExtractor={(item) => item.label}
            />
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    maxHeight: 300,
    overflow: "hidden",
  },
});

export default Dropdown;
