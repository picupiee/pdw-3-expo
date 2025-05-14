import { Pressable, Text, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Link, router } from "expo-router";

export default function About() {
  return (
    <View className="flex-1 p-2 bg-gradient-to-br from-slate-600 to-gray-800 ">
      <Text className="font-bold text-xl text-white text-center">
        Portal Digital Warga RT 003
      </Text>
      <View className="mt-8 flex items-center gap-2">
        <Text className="text-white font-semibold">Versi 1.0.0</Text>
        <Text className="text-white font-semibold">
          Dibuat oleh Fadli "Picu" Kurniawan
        </Text>
        <Text className="text-white text-justify px-4">
          Tujuan dari aplikasi web ini adalah untuk mengoptimalkan kepengurusan
          RT sekaligus mentransformasikan birokrasi tingkat RT ke era digital.
          Aplikasi ini disediakan oleh Pengurus RT 003 agar warga lebih mudah
          mengakses informasi terbaru seputar kegiatan RT 003. Serta, dalam
          aplikasi ini warga dapat melakukan pendataan secara mandiri, baik
          warga yang baru masuk ataupun yang ingin keluar dari lingkungan RT
          003. Informasi pribadi para warga tidak akan tersedia sebagai bentuk
          upaya perlindungan data pribadi.
        </Text>
        <Text className="text-white text-center text-xs mt-4">
          Bagi anda yang ingin memberi kritik dan saran terkait aplikasi web
          ini, bisa menyampaikan langsung ke ketua lorong masing-masing, kepada
          ketua ataupun pengurus RT 003, serta melalui email ke :
        </Text>
        <Link
          href="mailto:picupiee.id@gmail.com"
          className="text-white underline"
        >
          picupiee.id@gmail.com.
        </Link>
      </View>
      <View className="flex items-center mt-10">
        <Pressable
          onPress={() => router.dismissTo("/")}
          className="bg-green-600 px-4 py-2 rounded mt-2 self-center"
        >
          <Text className="text-white text-lg font-semibold text-center">
            Kembali ke Laman Utama
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
