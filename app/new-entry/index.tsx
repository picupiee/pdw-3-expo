import Dropdown from "@/components/ui/Dropdown";
import { router } from "expo-router";
import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function NewData() {
  const [formData, setFormData] = useState({
    gang: null as string | null,
    blockNum: "",
    houseNum: "",
    fullName: "",
    totalPenghuni: "0",
    dewasaL: "",
    dewasaP: "",
    anakL: "",
    anakP: "",
    ktp: null as string | null,
    huni: null as string | null,
  });

  const gangOpt = [
    { label: "Gang Mawar", value: "mawar" },
    { label: "Gang Edelweis", value: "edelweis" },
    { label: "Gang Pinus", value: "pinus" },
  ];

  const ktpOpt = [
    { label: "Domisili Gunung Sari", value: "ktp-gs" },
    { label: "Domisili Luar Daerah", value: "ktp-luar" },
  ];

  const huniOpt = [
    { label: "Dihuni", value: "huni" },
    { label: "Kontrak", value: "rented" },
    { label: "Kosong", value: "empty" },
  ];

  const handleChange = (name: keyof typeof formData, value: string | null) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    const dataToSubmit = {
      ...formData,
      dewasaL: formData.dewasaL === "" ? 0 : Number(formData.dewasaL),
      dewasaP: formData.dewasaP === "" ? 0 : Number(formData.dewasaP),
      anakL: formData.anakL === "" ? 0 : Number(formData.anakL),
      anakP: formData.anakP === "" ? 0 : Number(formData.anakP),
    };
    console.log(dataToSubmit);
  };

  return (
    <SafeAreaProvider>
      <View className="flex-1 bg-slate-200 p-2">
        <View className="mb-4 p-2">
          <Text className="text-center text-black text-lg">
            Mohon isi data diri anda dan keluarga dengan lengkap dan
            sebenar-benarnya.
          </Text>
        </View>
        <View className="mb-4">
          <Text className="mb-2 text-center text-lg font-semibold">
            Nama Jalan / Gang dan Nomor Rumah
          </Text>
          <View className="flex flex-row gap-2 items-center justify-center">
            <Dropdown
              options={gangOpt}
              selectedValue={formData.gang}
              onValueChange={(value) => handleChange("gang", value)}
              className="bg-white rounded border-black border-hairline w-1/2"
            />
            <TextInput
              placeholder="C28"
              className="text-lg text-center rounded bg-white h-12 w-12 placeholder:text-gray-300 uppercase"
              value={formData.blockNum}
              onChangeText={(value) => handleChange("blockNum", value)}
            />
            <TextInput
              placeholder="19"
              className="text-lg text-center rounded bg-white h-12 w-12 placeholder:text-gray-300"
              value={formData.houseNum}
              onChangeText={(value) => handleChange("houseNum", value)}
              keyboardType="numeric"
            />
          </View>
        </View>

        <View className="flex flex-col items-center mb-2">
          <Text className="text-lg font-semibold">Nama Lengkap</Text>
          <TextInput
            placeholder="Isi nama lengkap anda"
            className="text-lg text-center rounded bg-white h-10 px-10 placeholder:text-gray-300"
            value={formData.fullName}
            onChangeText={(value) => handleChange("fullName", value)}
          />
        </View>
        <View className="p-2">
          <View
            className="flex-row items-center justify-center
           gap-2 mb-2"
          >
            <Text className="text-lg">Jumlah Penghuni Rumah :</Text>
            <TextInput
              placeholder="0"
              className="text-lg text-center rounded bg-white h-10 w-10 placeholder:text-gray-300"
              value={formData.totalPenghuni}
              onChangeText={(value) => handleChange("totalPenghuni", value)}
              keyboardType="numeric"
            />
          </View>
          <View className="p-2 m-2 gap-2 border-2 border-gray-600 rounded">
            <Text className="text-lg text-center">Detail Penghuni Rumah</Text>
            <View className="flex flex-row justify-evenly gap-2">
              <View className="flex flex-col items-center gap-1">
                <Text>Pria</Text>
                <TextInput
                  placeholder="0"
                  className="h-10 w-10 bg-white rounded text-md text-center placeholder:text-gray-300"
                  value={formData.dewasaL}
                  onChangeText={(value) => handleChange("dewasaL", value)}
                  keyboardType="numeric"
                />
              </View>
              <View className="flex flex-col items-center gap-1">
                <Text>Wanita</Text>
                <TextInput
                  placeholder="0"
                  className="h-10 w-10 bg-white rounded text-md text-center placeholder:text-gray-300"
                  value={formData.dewasaP}
                  onChangeText={(value) => handleChange("dewasaP", value)}
                  keyboardType="numeric"
                />
              </View>
              <View className="flex flex-col items-center gap-1">
                <Text>Anak (L)</Text>
                <TextInput
                  placeholder="0"
                  className="h-10 w-10 bg-white rounded text-md text-center placeholder:text-gray-300"
                  value={formData.anakL}
                  onChangeText={(value) => handleChange("anakL", value)}
                  keyboardType="numeric"
                />
              </View>
              <View className="flex flex-col items-center gap-1">
                <Text>Anak (P)</Text>
                <TextInput
                  placeholder="0"
                  className="h-10 w-10 bg-white rounded text-md text-center placeholder:text-gray-300"
                  value={formData.anakP}
                  onChangeText={(value) => handleChange("anakP", value)}
                  keyboardType="numeric"
                />
              </View>
            </View>
          </View>
        </View>
        <View>
          <Text className="text-lg text-center">
            Detail dokumen pribadi dan status rumah
          </Text>
          <View className="mb-4">
            <View className="flex flex-row gap-2 items-center justify-evenly">
              <View className="mt-2">
                <Text className="text-center text-lg font-semibold">
                  Domisili KTP
                </Text>
                <Dropdown
                  options={ktpOpt}
                  selectedValue={formData.ktp}
                  onValueChange={(value) => handleChange("ktp", value)}
                  className="bg-white rounded border-black border-hairline"
                />
              </View>
              <View className="mt-2">
                <Text className="text-center text-lg font-semibold">
                  Status Hunian
                </Text>
                <Dropdown
                  options={huniOpt}
                  selectedValue={formData.huni}
                  onValueChange={(value) => handleChange("huni", value)}
                  className="bg-white rounded border-black border-hairline"
                />
              </View>
            </View>
          </View>
        </View>
        <View className="self-center">
          <Pressable
            onPress={handleSubmit}
            className="bg-blue-500 px-4 py-2 rounded mt-2"
          >
            <Text className="text-white text-lg font-semibold text-center">
              Kirim Data
            </Text>
          </Pressable>
        </View>
        <Pressable
          onPress={() => router.dismissTo("/")}
          className="bg-green-600 px-4 py-2 rounded mt-2 self-center"
        >
          <Text className="text-white text-lg font-semibold text-center">
            Kembali ke Laman Utama
          </Text>
        </Pressable>
      </View>
    </SafeAreaProvider>
  );
}
