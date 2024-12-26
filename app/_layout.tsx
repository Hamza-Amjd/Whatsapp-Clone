import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { View } from "react-native";
import Colors from "@/constants/Colors";
import ContextWrapper from "@/context/ContextWrapper";
import { usePushNotifications } from "@/hooks/usePushNotification";
import { getMessaging } from "firebase/messaging";
import { GestureHandlerRootView } from "react-native-gesture-handler";


// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const InitialLayout = () => {
  const { expoPushToken, notification } = usePushNotifications();
  // const messaging = getMessaging();
  // getToken(messaging, {vapidKey: "BBgWbQxyss0aDC-kBtNnv2mpxMkRTnDoQzbSZ27_UTGhY55BHW1dSmwo-2Gpj-OKZnksPJC2bBQ482efr12B660"})

  const [loading, setLoading] = useState(true);
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  // if (loading) {
  //   return <Text>Loading...</Text>;
  // }
  if (!loaded) {
    return <View />;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{ headerShown: false, statusBarColor: "white" }}
        />
        <Stack.Screen name="setProfile" options={{ headerShown: false }} />
        <Stack.Screen
          name="(tabs)"
          options={{ headerShown: false, statusBarColor: Colors.background }}
        />
        <Stack.Screen
          name="(modals)/new-chat"
          options={{
            headerShown: true,
            title: "Select Contact",
            headerShadowVisible: false,
            headerStyle: { backgroundColor: Colors.background },
            headerTitleStyle: { fontSize: 16 },
            presentation: "modal",
            headerBackTitleVisible: false,
            statusBarColor: Colors.background,
          }}
        />
      </Stack>
    </GestureHandlerRootView>
  );
};

const RootLayoutNav = () => {
  return (
    <ContextWrapper>
      <InitialLayout />
    </ContextWrapper>
  );
};
export default RootLayoutNav;
