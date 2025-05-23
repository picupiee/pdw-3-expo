import Cards from "@/components/ui/Cards";
import { Link, router } from "expo-router";
import { ScrollView, Text, View } from "react-native";

export default function Home() {
  return (
    <ScrollView className="bg-gradient-to-br from-slate-600 to-gray-800">
      <View className="flex p-2">
        <View className="flex flex-col items-center gap-1">
          <Text className="font-bold text-2xl sm:text-3xl bg-gradient-to-r from-red-400 to-purple-500 bg-clip-text text-transparent drop-shadow-md">
            Portal Digital Warga
          </Text>
          <Text className="font-bold text-md bg-gradient-to-r from-red-400 to-purple-500 bg-clip-text text-transparent drop-shadow-md">
            Puri Harmoni Pasir Mukti RT 003
          </Text>
        </View>
        {/* <View className="mt-10 flex items-center">
        <Link href="/dashboard">
        <Text className="p-2 bg-blue-600 text-xl font-bold rounded">
        Dashboard
        </Text>
        </Link>
        </View> */}
        <View className="flex flex-row flex-wrap mt-4 gap-2 px-0 justify-evenly sm:justify-center sm:self-center">
          <Cards
            title="Rangkuman Data"
            description="Rangkuman data di lingkungan RT 003"
            onPress={() => router.push("/data-summary")}
          />
          <Cards
            title="Dashboard"
            description="Laman khusus untuk pengurus RT 003"
            onPress={() => router.push("/dashboard")}
          />
          <Cards
            title="Daftar Warga"
            description="Formulir untuk pendaftaran baru warga RT 003"
            onPress={() => router.push("/daftar-warga")}
          />
          <Cards
            title="Laporan Warga"
            description="Buat Laporan Secara Mandiri"
            onPress={() => router.push("/laporan-warga")}
          />
          <Cards
            title="Kritik & Saran"
            description="Berikan kritik dan saran untuk kami"
            onPress={() => router.push("/kritik-saran")}
          />
          <Cards
            title="Tentang Aplikasi"
            description="Informasi mengenai aplikasi PDW"
            onPress={() => router.push("/about")}
          />
        </View>
        <View className="fixed bottom-8 sm:bottom-2 sm:flex sm:justify-center sm:w-full drop-shadow-md">
          <Text className="text-white text-lg sm:text-lg font-semibold">
            PDW-03 Project, created by{" "}
            <Link
              href="https://www.x.com/picupiee"
              className="text-blue-400 underline underline-offset-4"
            >
              @PicuPiee
            </Link>
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
