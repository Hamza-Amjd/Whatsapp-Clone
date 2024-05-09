import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Stack, useRouter, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { Text, View } from "react-native";
import Colors from "@/constants/Colors";
import { onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "@/firebaseConfig";
import ContextWrapper from "@/context/ContextWrapper";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const InitialLayout = () => {
  const [currUser, setCurrUser] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user: any) => {
      setLoading(false);
      if (user) {

        setCurrUser(user);
      }
    });
    return () => unsubscribe();
  }, []);
  if (loading) {
    return <Text>Loading...</Text>;
  }
  if (!loaded) {
    return <View/>;
  }

  return (
    <Stack>
      
          <Stack.Screen name="index" options={{ headerShown: false,statusBarColor:"white" }} />
         <Stack.Screen name="SetProfile"  options={{ headerShown: false }} />
         <Stack.Screen  name="(tabs)" options={{ headerShown: false,statusBarColor:Colors.background }} />
         <Stack.Screen
        name="otp"
        options={{
          headerTitle: "Enter your phone number",
          headerBackVisible: false,
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="verify/[phone]"
        options={{
          headerTitle: "Verify your phone number",
          headerBackVisible: true,
          headerTitleAlign: "center",
          statusBarColor:Colors.background
        }}
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
          statusBarColor:Colors.background
        }}
      />
    </Stack>
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


