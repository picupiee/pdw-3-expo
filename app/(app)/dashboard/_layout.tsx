import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Tabs } from "expo-router";
import { TabList, TabSlot, TabTrigger } from "expo-router/ui";
import { Text, View } from "react-native";

export default function Layout() {
  return (
    <Tabs screenOptions={{ tabBarAllowFontScaling: true, headerShown: false }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="home" size={28} color="black" />
          ),
        }}
      />
      <Tabs.Screen
        name="inbox"
        options={{
          title: "Inbox",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="mail" size={28} color="black" />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="settings" size={28} color="black" />
          ),
        }}
      />
      {/* <TabSlot />
      <TabList className="flex items-center justify-center gap-4 p-8">
        <TabTrigger name="index" href="/(app)/dashboard" className="font-bold">
          <Text>Home</Text>
        </TabTrigger>
        <TabTrigger name="inbox" href="/(app)/dashboard/inbox">
          <Text>Inbox</Text>
        </TabTrigger>
        <TabTrigger name="settings" href="/(app)/dashboard/settings">
          <Text>Settings</Text>
        </TabTrigger>
      </TabList> */}
    </Tabs>
  );
}
